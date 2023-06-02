import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import customFetch from "../../utils/axios";
//import { toast } from "react-toastify";


const initialState = {
  isLoading: true,
  projects: [],
  totalProjects: 0,
};

export const getAllProjects = createAsyncThunk(
  "allProjects/getProjects",
  async (userEmail, thunkAPI) => {
    //const user = getUserFromLocalStorage();
    console.log("userEmail" + userEmail);
    let url = `/projets/${userEmail}`;


    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {

    }
  }
);
/*export const getTasksByProject = createAsyncThunk(
  "allProjects/getProjects/getProjectTasks",
  async (projectId, thunkAPI) => {
    let url = `/projets/${projectId}/tasks`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);*/

export const updateProjectState = createAsyncThunk(
  "allProjects/updateProjectState",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/projets/modifierEtat", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProjectTitle = createAsyncThunk(
    "allProjects/updateProjectTitle",
    async (info, thunkAPI) => {
      try {
        const resp = await customFetch.post("/projets/majTitre", info);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const createProject = createAsyncThunk(
  "allProjects/addNewProject",
  async (newProject, thunkAPI) => {
    let url = "/projets/creerProjet";

    try {
        console.log(" trying to create newProject: ", newProject);
      const resp = await customFetch.post(url, newProject);
      return resp.data;
    } catch (error) {
      //return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const allProjectsSlice = createSlice({
  name: "allProjects",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      //state.page = 1;
      state[name] = value;
    },
    /* clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    }, 
    changePage: (state, { payload }) => {
      state.page = payload;
    },*/
    clearAllProjectsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = payload.projets;
       // state.totalProjects = payload.projets.length;
        console.log("payload: ", state.projects);
      })
      .addCase(getAllProjects.rejected, (state, { payload }) => {
        state.isLoading = false;
        //toast.error(payload);
      })
      .addCase(updateProjectState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProjectState.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = state.projects.map((project) => {
          if (project.id == payload.tache.id)
            return { ...project, etat: payload.tache.etat };
          return project;
        });

        console.log(payload.tache);
      })
      .addCase(updateProjectState.rejected, (state, { payload }) => {
        state.isLoading = false;
        //toast.error(payload);
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = [...state.projects, payload.projet];
        console.log("projet créée avec succés");
        //toast.success("projet créé avec succès!");
      })
      .addCase(createProject.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("projet non créé");
        //toast.error(payload);
      }).addCase(updateProjectTitle.pending, (state) => {
state.isLoading = true;
})
.addCase(updateProjectTitle.fulfilled, (state, { payload }) => {
state.isLoading = false;
state.projects = state.projects.map((project) => {
if (project.id == payload.projet.id)
return { ...project, titre: payload.projet.titre };
return project;
});

}).addCase(updateProjectTitle.rejected, (state, { payload }) => {
state.isLoading = false;
//toast.error(payload);

    });
    /*.addCase(getTasksByProject.pending, (state) => {})
      .addCase(getTasksByProject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const currentProjectId = payload.idProjet;
        state.projects = state.projects.map((p) => {
          if (p.id == currentProjectId) p.tasks = payload.taches;
          return p;
        });

        //toast.success("tasks got from backend");
      })
      .addCase(getTasksByProject.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })*/
  },
});
export default allProjectsSlice.reducer;

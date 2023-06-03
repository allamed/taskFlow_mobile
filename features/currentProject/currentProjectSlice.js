import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";

import { mapData } from "../../utils/taskMaper";


const initialState = {
  isLoading: true,
  members: [],
  tasks: [],
  project: {},
  currentTask: {},
};
export const getProjectMembers = createAsyncThunk(
  "allProjects/getProjects/getProjectMembers",
  async (projectId, thunkAPI) => {
    let url = `/projets/${projectId}/members`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return ;
    }
  }
);
export const getProjectTasks = createAsyncThunk(
  "allProjects/getProjects/getProjectTasks",
  async (projectId, thunkAPI) => {
    let url = `/projets/${projectId}/tasks`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return ;
    }
  }
);

export const getCurrentTask = createAsyncThunk(
  "allTasks/getCurrentTask",
  async (taskId, thunkAPI) => {
    let url = `/taches/tacheCourante/${taskId}`;

    try {
      const resp = await customFetch.get(url);
      return resp.data;
    } catch (error) {
      return ;
    }
  }
);

export const addMemberToProject = createAsyncThunk(
  "allProjects/getProjects/addMember",
  async (data, thunkAPI) => {
    let url = `/projets/ajouterMembre`;

    try {
      const resp = await customFetch.post(url, data);
      // console.log("postrequest sent");
      return resp.data;
    } catch (error) {
      return ;
    }
  }
);

export const removeMemberFromProject = createAsyncThunk(
    "allProjects/getProjects/removeMember",
    async (data, thunkAPI) => {
        let url = `/projets/supprimerMembre`;

        try {
            const resp = await customFetch.post(url, data);
            // console.log("postrequest sent");
            return resp.data;
        } catch (error) {
            return ;
        }

    }
);

export const updateTaskState = createAsyncThunk(
  "allTasks/updateTaskState",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/taches/modifierEtat", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTaskTitle = createAsyncThunk(
  "allTasks/updateTaskTitle",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/taches/modifierTitre", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTaskDesc = createAsyncThunk(
  "allTasks/updateTaskDesc",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/taches/modifierDescription", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTaskProgress = createAsyncThunk(
  "allTasks/updateTaskProgress",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/taches/modifierAvancement", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addCommentToTask = createAsyncThunk(
  "allTasks/addComment",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/taches/commenterTache", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTaskDeadLine = createAsyncThunk(
  "allTasks/updateTaskDeadLine",
  async (info, thunkAPI) => {
    try {
      const resp = await customFetch.post("/taches/modifierDeadLine", info);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const createTask = createAsyncThunk(
  "tasks/addNewTask",
  async (task, thunkAPI) => {
    const tache = {
      titre: task.title,
      deadLine: task.deadline.toISOString(),
      responsableId: task.responsableId,
      projetId: task.projectId,
    };
    //console.log('tacheEnv');
    //console.log(tache.titre);
    let url = `/taches/create`;

    try {
      const resp = await customFetch.post(url, tache);

      return resp.data;
    } catch (error) {
      return ;
    }
  }
);
/* const { allProjects } = useSelector((store) => store.allProjects);
export const getCurrentProject = (projectId) => {
  return allProjects.find((p) => p.id == projectId);
}; */
const currentProjectSlice = createSlice({
  name: "currentProject",
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
    setCurrentProject: (state, payload) => {
      return { ...state, project: payload };
    },
    getCurrentProject: (state) => {
      return state;
      console.log(state);
    },
    /* clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    }, 
    changePage: (state, { payload }) => {
      state.page = payload;
    },*/
    clearCurrentProjectState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectMembers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.members = payload.membres;

        console.log(payload.membres);
      })
      .addCase(getProjectMembers.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(getProjectTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = payload.taches;

        console.log(payload.taches);
      })
      .addCase(getProjectTasks.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(addMemberToProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMemberToProject.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.members = [...state.members, payload.membre];


      })
      .addCase(addMemberToProject.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(updateTaskState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskState.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) => {
          if (task.id == payload.tache.id)
            return { ...task, etat: payload.tache.etat };
          return task;
        });
        state.mapedTasks = mapData(state.tasks);

        //console.log(payload.tache);
      })
      .addCase(updateTaskState.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const task = payload.tache;
        state.tasks = [...state.tasks, task];
        console.log("tache crée" + task);


      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(updateTaskTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskTitle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.tache;

        state.tasks = state.tasks.map((task) => {
          if (task.id === editedTask.id) {
            return editedTask;
          }
          return task;
        });


      })
      .addCase(updateTaskTitle.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(updateTaskDesc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskDesc.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.tache;

        state.tasks = state.tasks.map((task) => {
          if (task.id === editedTask.id) {
            return editedTask;
          }
          return task;
        });


      })
      .addCase(updateTaskDesc.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(updateTaskDeadLine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskDeadLine.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.tache;

        state.tasks = state.tasks.map((task) => {
          if (task.id === editedTask.id) {
            return editedTask;
          }
          return task;
        });


      })
      .addCase(updateTaskDeadLine.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(addCommentToTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentToTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.tache;

        state.tasks = state.tasks.map((task) => {
          if (task.id === editedTask.id) {
            return editedTask;
          }
          return task;
        });


      })
      .addCase(addCommentToTask.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getCurrentTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.currentTask = payload.tache;

        //toast.success('Commentaire enregistré!');
      })
      .addCase(getCurrentTask.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
      .addCase(updateTaskProgress.pending, (state) => {
        //state.isLoading = true;
      })
      .addCase(updateTaskProgress.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const editedTask = payload.tache;

        state.currentTask = editedTask;
        //console.log("currentTask : " + state.currentTask);


      })
      .addCase(updateTaskProgress.rejected, (state, { payload }) => {
        state.isLoading = false;

      })
  .addCase(removeMemberFromProject.pending, (state) => {
        state.isLoading = true;
        console.log("suppression du membre en cours");
      }
    )
        .addCase(removeMemberFromProject.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.members = state.members.filter(
                (member) => member.id !== payload.membre.id
            );
            console.log("membre supprimé");
            }
        )
        .addCase(removeMemberFromProject.rejected, (state, { payload }) => {
            state.isLoading = false;
            console.log("erreur lors de la suppression du membre");
            }
        );
  },
});
export default currentProjectSlice.reducer;
export const {
  handleChange,
  setCurrentProject,
  getCurrentProject,
  clearCurrentProjectState,
} = currentProjectSlice.actions;

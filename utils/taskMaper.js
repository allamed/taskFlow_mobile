export const mapData = (tasks, chef) => {
  const cards = tasks.map(
    ({
      id,
      debut,
      deadLine,
      etat,
      projet,
      responsable,
      titre,
      avancement,
      commentaires,
        description,
    }) => {
      return {
        id: `${id}`,
        name: titre,
        description: description,
        label: `${deadLine.substring(0, 10)}`,
        draggable: true,
        debut,
        projet,
        avancement,
        commentaires,
        etat,
        responsable,
          deadLine,
      };
    }
  );

  const enAttente = cards.filter((card) => card.etat == "En_ATTENTE");
  const enCours = cards.filter((card) => card.etat == "EN_COURS");
  const attenteValidation = cards.filter(
    (card) => card.etat == "ATTENTE_VALIDATION"
  );
  const validee = cards.filter((card) => card.etat == "VALIDEE");

  const taskData =  [
      {
        id: "1",
        name: "En attente",
        rows: enAttente,
      },
      {
        id: "2",
        name: "En cours",
        rows: enCours,
      },
      {
        id: "3",
        name: "attente validation",
        rows: attenteValidation,
      },
      {
        id: "4",
        name: "achevées",
        rows: validee,
      },
    ];
  return taskData;
};

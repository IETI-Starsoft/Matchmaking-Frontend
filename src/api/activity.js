import axiosHeader from "./axiosHeader"

const postIndividual = (state, ownerId, callback) => {
    console.log(state);
    var today = new Date();
    axiosHeader.post("/activities", {
        typ: "IndividualActivity",
        date: state.date.getFullYear() + "-" + state.date.getMonth() + 1 + "-" + state.date.getDate() + "T" + state.time.getHours() + ":" + state.time.getMinutes() + ":" + state.time.getSeconds(),
        publicationDate: today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        bet: state.bet == "" ? null : state.bet, description: state.description,
        type: state.activity, location: state.location,
        credits: 0, idPlayer1: ownerId,
        state: "Available", owner: ownerId
    })
        .then(response => {
            if (callback != null) callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const postGroup = (state, ownerId, callback) => {
    var today = new Date();
    axiosHeader.post("/activities", {
        typ: "GroupActivity",
        date: state.date.getFullYear() + "-" + state.date.getMonth() + 1 + "-" + state.date.getDate() + "T" + state.time.getHours() + ":" + state.time.getMinutes() + ":" + state.time.getSeconds(),
        publicationDate: today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        bet: state.bet == "" ? null : state.bet,description: state.description,
        type: state.activity, location: state.location,
        credits: 0, idTeam1: state.checked[0].teamId,
        state: "Available", owner: ownerId
    })
        .then(response => {
            if (callback != null) callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const updateIndividualActivity = (activity) => {
    return axiosHeader.put("/activities", {
        typ: "IndividualActivity",id: activity.id,date: activity.date,
        publicationDate: activity.publicationDate, bet: activity.bet,
        description: activity.description, type: activity.type,
        location: activity.location, credits: activity.credits, 
        state: activity.state, owner: activity.owner,
        idPlayer1: activity.idPlayer1,
        idPlayer2:  activity.idPlayer2
    }).then(response => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

const updateGroupActivity = (activity) => {
    return axiosHeader.put("/activities", {
        typ: "GroupActivity",id: activity.id,date: activity.date,
        publicationDate: activity.publicationDate, bet: activity.bet,
        description: activity.description, type: activity.type,
        location: activity.location, credits: activity.credits, 
        state: activity.state, owner: activity.owner,
        idTeam1: activity.idTeam1,
        idTeam2:  activity.idTeam2
    }).then(response => {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

const getActivity = (activityId) => {
    return axiosHeader.get("/activities/"+activityId)
        .then(response => {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
          });
}


export{
    postIndividual,
    postGroup,
    updateIndividualActivity,
    getActivity,
    updateGroupActivity
}

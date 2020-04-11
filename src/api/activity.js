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

export{
    postIndividual,
    postGroup
}

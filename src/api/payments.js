import axiosHeader from "./axiosHeader"

const betTeamToActivity = (credits, activityId, teamId) => {
    return axiosHeader.put("/payments/team/" + teamId
        + "/activity/" + activityId + "/amount/" + credits)
        .then(response => {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const betUserToActivity = (credits, activityId, callback) => {
    let user = JSON.parse(localStorage.getItem("user"))
    return axiosHeader.put("/payments/user/" + user.userId
        + "/activity/" + activityId + "/amount/" + credits)
        .then(response => {
            let currentCredits = user.credits;
            user.credits = currentCredits - credits;
            localStorage.setItem("user", JSON.stringify(user));
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export {
    betTeamToActivity,
    betUserToActivity
}
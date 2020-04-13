import axiosHeader from "./axiosHeader"


const getTeamById = async (teamId) => {
    return axiosHeader.get("/team/" + teamId)
        .then(response => {
             return response;
        }).catch(function (error) {
            console.log(error);
        });
}


const updateActivitiesTeam = async (idActivity,team) => {
    var act = team.activities;
    act.push(idActivity);
    return axiosHeader.put("/team", {
        teamId: team.teamId,
        members: team.members,
        captainId: team.captainId,
        credits: team.credits,
        activities: act,
        name: team.name
    }).then(response => {
        return response;
    }).catch(error => {
        console.log(error)
    })
}

const validateCreditsTeam = (bet,teamId,callback) => {
    axiosHeader.get("/team/" + teamId)
        .then(response => {
            let credits = response.data.credits
            if (bet <= credits) {
                if (callback != null) callback(JSON.parse(localStorage.getItem("user")).userId);
            }
            else alert("Su saldo es insuficiente para realizar la apuesta.");
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getTeams = (userId) => {
    return axiosHeader.get("/team/captain/" + userId)
      .then(response => {
        return response.data;
      })
      .catch(function (error) {
        console.log("usuario que esta cagando todo " +userId)  
        console.log(error);
      });
  }


export {
    getTeamById,
    updateActivitiesTeam,
    validateCreditsTeam,
    getTeams
} 
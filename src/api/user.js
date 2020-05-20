import axiosHeader from "./axiosHeader"

const updateActivitiesUser = (idActivity) => {
    let user = JSON.parse(localStorage.getItem("user"));
    var act = user.activities;
    act.push(idActivity);
    return axiosHeader.put("/users", {
        userId: user.userId, firstName: user.firstName,
        lastName: user.lastName, email: user.email,
        password: user.password, imageFileURL: user.imageFileURL,
        rating: user.rating, credits: user.credits,
        friends: user.friends, teams: user.teams,
        nRating:user.nRating,
        activities: act,

    }).then(response => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}

const validateCreditsUser = (bet, userId, callback) => {
    axiosHeader.get("/users/id/" + userId)
        .then(response => {
            let credits = response.data.credits
            if (bet <= credits) { //Se llama el callback si el usuario tiene los creditos suficientes.
                if (callback != null) callback(userId);
            }
            else alert("Su saldo es insuficiente para realizar la apuesta.");
        })
        .catch(function (error) {
            console.log(error);
        });
}
const upDateRatingUser=(idUser,Rating)=>{
    axiosHeader.put(`/users/id/${idUser}/ranking/${Rating}`).then((response) => {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
      });
}
export {
    updateActivitiesUser,
    validateCreditsUser,
    upDateRatingUser
} 
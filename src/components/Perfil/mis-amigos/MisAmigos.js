import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import axiosHeader from "../../../api/axiosHeader";
import { max } from "date-fns";
import { AmigoList } from "../usuario/AmigoList";
import  Navbar from "../../menu/NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function MisAmigos(){


    const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [friends, setFriends] = React.useState(null);
  const [length, setLength] = React.useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {

    console.log("cambio");
    let user = JSON.parse(localStorage.getItem("user"));
    setLength(Math.ceil(user.friends.length/10));
    axiosHeader.get(`/users/id/${user.userId}/friends/page/${page}`)
        .then( response => {
            setFriends(response.data);
        })
        .catch( error => {
            alert(error);
        });
      
  }, [page]);


  return (
      <>
      <Navbar />
    <div className={classes.root}>
      <Pagination count={length} page={page} onChange={handleChange} />
      {friends ? <AmigoList friends={friends}></AmigoList>: "Cargando"}
    </div>
    </>
  );

}
import React, { useEffect } from "react";
import NavBar from "../menu/NavBar";
import Box from "@material-ui/core/Box";
import { Card, CardContent, Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../Perfil/usuario/TabPanel";
import { AmigoList } from "./transfer/AmigoList";
import { EquipoList } from "./transfer/EquipoList";
import { useTheme } from "@material-ui/core";
import axiosHeader from "../../api/axiosHeader";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function TransferCredits() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [friends, setFriends] = React.useState([]);
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setName(user.firstName.toUpperCase() + " " + user.lastName.toUpperCase());
    setRating(user.rating);
    axiosHeader
      .get("/users/id/" + user.userId + "/friends")
      .then(function(response) {
        setFriends(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    axiosHeader
      .get("/users/id/" + user.userId + "/teams")
      .then(function(response) {
        setTeams(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Box p={1}>
          <Card>
            <CardContent>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Amigos" {...a11yProps(0)} />
                  <Tab label="Equipos" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <AmigoList friends={friends} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <EquipoList teams={teams} />
                </TabPanel>
              </SwipeableViews>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

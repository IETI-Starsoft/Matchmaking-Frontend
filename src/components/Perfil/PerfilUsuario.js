import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating';
import { CardActions, CardActionArea, CardMedia, CardContent, Typography, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  

export default function PerfilUsuario(props){
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = index => {
        setValue(index);
      };
    
    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardMedia
                            component="img"
                            alt="user img"
                            image="data:image/png;base64,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   "
                            title="User"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                <b>Descripción:</b> {props.desc}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                NAME
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                LITTLE DESC
                            </Typography>
                            <Typography component="legend">Read only</Typography>
                            <Rating name="read-only" value={props.stars} readOnly />
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Item One" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                Item One
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                Item Two
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                Item Three
                                </TabPanel>
                            </SwipeableViews>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
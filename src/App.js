import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import UserForm from './Components/Form';
import Grid from '@material-ui/core/Grid';

function App() {
    return (
        <React.Fragment>
            <title>Gaze</title>
            <NavBar/>
            
            <Grid container id = "MainPageContent">
                <UserForm/>
                <Grid xs={6} item id = "viz">        
                </Grid>
                <Grid xs={11} item id="divider"></Grid>
                <div id = "analysis"/> 
                <Grid container id = "mapContainer">
                    <Grid item xs = {10} id = "timeSeriesSlider"/>
                    <Grid xs = {10} item id="map"/>
                </Grid>
            </Grid>  
        </React.Fragment>
      
    );
}

export default App;

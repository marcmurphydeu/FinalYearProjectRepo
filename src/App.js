import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar';
import UserForm from './Components/Form';
import Grid from '@material-ui/core/Grid';
import fullscreen from './fullscreenColor.png';


function App() {
    return (
        <React.Fragment>
            <title>Gaze</title>
            <NavBar/>
            
            <Grid container id = "MainPageContent">
                <UserForm/>
                <Grid xs = {6} id="vizContent">
                <img src={fullscreen} onClick={()=>setSize()} alt = "expand" id="expand" /><Grid item id = "viz"></Grid>
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

// Toggles full screen mode.
function setSize(){
    let viz = document.getElementById('viz')
    console.log(viz.offsetHeight)
    if (viz.offsetHeight === 700){
        viz.webkitRequestFullscreen()
    }
    else{
        viz.exitFullScreen()
    }
  }

export default App;

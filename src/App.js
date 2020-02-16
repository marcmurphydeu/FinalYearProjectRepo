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
                <Grid xs={6} item id = "viz"></Grid>
            </Grid>
            
        </React.Fragment>
      
    );
}

export default App;

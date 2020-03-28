import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import theaLogo from '../theaLogoFinal.png';
import fullscreen from '../fullscreenColor.png';
import Analysis from './Analysis';
import ReactDOM from 'react-dom';


// Navbar component displayed at the top of the application
export class NavBar extends Component {
    render() {
        return (
            <Navbar style={{padding: "0"}} id="navbar" sticky="top" bg="light" expand="lg">
                <Navbar.Brand href="#home"><img src={theaLogo} alt = "Logo" id="theaLogo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#home" onClick={()=>scrollHome()}>Home</Nav.Link>
                    <Nav.Link href="#link" onClick={()=>scrollAnalysis()}>Analysis</Nav.Link>
                    <div id = "controlledButton" />
                  </Nav>  
                </Navbar.Collapse>
                <img src={fullscreen} onClick={()=>setSize()} alt = "expand" id="expand" />     
            </Navbar>
        )
    }
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

// Scroll to top of the application page
function scrollHome(){
  window.scrollTo(0, 0)
}

//Scroll to the analysis section of the page
function scrollAnalysis(){
  const analysis = document.getElementById('analysis')
  ReactDOM.render(<Analysis/>, analysis);   
  window.scrollTo(0, analysis.offsetTop)
}

export default NavBar;
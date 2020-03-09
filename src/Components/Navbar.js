import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import theaLogo from '../theaLogoFinal.png';
import fullscreen from '../fullscreenColor.png';
import Analysis from './Analysis';
import ReactDOM from 'react-dom';

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

function scrollHome(){
  window.scrollTo(0, 0)
}

function scrollAnalysis(){
  ReactDOM.render(<Analysis/>, document.getElementById('analysis'));   
}

export default NavBar;
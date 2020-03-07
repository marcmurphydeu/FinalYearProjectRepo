import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import theaLogo from '../theaLogoFinal.png';
import fullscreen from '../fullscreenColor.png';


export class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home"><img src={theaLogo} alt = "Logo" id="theaLogo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Analysis</Nav.Link>
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

export default NavBar;
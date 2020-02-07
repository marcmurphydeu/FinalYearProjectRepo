import React, { Component } from "react";
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink,   MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./Pills.css"; //Import necessary styles for this example
import { BrowserRouter, Link} from 'react-router-dom';


class PillsWithContent extends Component {
state = {
  items: {
  content: "1",
  contentCard: "1",
  }

}

togglePills = (type, tab) => e => {
  e.preventDefault();
  if (this.state.items[type] !== tab) {
    let items = { ...this.state.items };
    items[type] = tab;
    this.setState({
      items
    });
  }
};


render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <MDBNav
              pills
              className="nav-justified pills-rounded pills-purple-gradient"
            >
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.items["content"] === "1"}
                  onClick={this.togglePills("content", "1")}
                >
                  Fashion
                </MDBNavLink>
              </MDBNavItem>
            
            </MDBNav>
          </MDBCol>
          
        </MDBRow>
        </MDBContainer>
    );
  }
}

export default PillsWithContent;
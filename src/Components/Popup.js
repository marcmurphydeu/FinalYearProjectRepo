import React from "react";
import Popup from "reactjs-popup";
import { Info } from 'react-bootstrap-icons';


export default function PopUp (props){
    return (
    <Popup
    trigger={open => <Info size={"20"} color={"white"}  open={open}/>}
    modal
    closeOnDocumentClick
    closeOnEscape
    keepTooltipInside
    >
    <div id = "content">
        <h3>Information</h3>  
        <hr/>
        <span id = "modal"> {props.text} </span>
    </div>
  </Popup>
    )
}

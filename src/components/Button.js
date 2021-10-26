import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   // let buttonClass = "button";
 
   // if (props.confirm) {
   //   buttonClass += " button--confirm";
   // }
 
   // if (props.danger) {
   //   buttonClass += " button--danger";
   // }
   
   return (
     <button
       className={classNames('button', { 'button--danger': true })}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
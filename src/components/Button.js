import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
      // setting buttonClass since there's more than one background-color for button styling
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
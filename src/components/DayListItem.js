import React from "react";

export default function DayListItem(props) {
  const { day, spots, setDate } = props;
  return (
    <li>
      <h2 className="text--regular">{props.day}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
      {props.setDate}
    </li>
  );
}
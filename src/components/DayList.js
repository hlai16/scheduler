import React from "react";
import "components/DayListItem.js";
import DayListItem from "components/DayListItem.js";
// import classNames from "classnames";

export default function DayList(props) {
    const { days, setDay } = props;
    const mapDaysArr = days.map(day => <DayListItem key={props.day.id} name={props.day.name} spots={props.day.spots} selected={props.day.name === props.day} setDay={props.setDay} {...day} />);
    return (
        <ul>{mapDaysArr}</ul>
    );
}
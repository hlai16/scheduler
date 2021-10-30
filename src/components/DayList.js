import React from "react";
import "components/DayListItem.js";
import DayListItem from "components/DayListItem.js";
// import classNames from "classnames";

export default function DayList(props) {
    // const { days } = props;
    const mapDaysArr = props.days.map(day => <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.value} setDay={props.setDay} {...day} />);
    return (
        <ul>{mapDaysArr}</ul>
    );
}
import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
    const dayClass = classNames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": !props.spots
    });
    // to show users in the dom keeping track of how many available spots remain per day
    const formatSpots = function (spots) {
        if (spots <= 0) {
            return 'no spots remaining';
        } else if (spots === 1) {
            return '1 spot remaining';
        } else {
            return `${spots} spots remaining`;
        }
    }
    return (
        <li className={dayClass} data-testid='day' onClick={() => props.setDay(props.name)}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
    );
}
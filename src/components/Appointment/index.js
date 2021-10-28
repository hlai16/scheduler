import React from "react";
import './styles.scss';
import Header from "./Header";

export default function Appointment(props) {
    const formatAppointment = function (time) {
        return time ? `Appointment at ${time}.` : 'No Appointments'
    }
    return (
        <article className="appointment">{formatAppointment(props.time)}</article>
    );
}
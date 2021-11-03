import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import Application from "components/Application";
import { update } from "lodash";
// import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });
    const setDay = day => setState({ ...state, day });
    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => {

                const newDays = state.days.map(day => {
                    if (day.name === state.day) {
                        let spots = 0;
                        for (const appt of day.appointments) {
                            if (appointments[appt].interview === null) {
                                spots++;
                            }
                        }
                        return {
                            ...day, spots
                        };
                    } else {
                        return day;
                    }
                })
                // const updateSpots = state.days.forEach(day => {
                //     if (isNew && day.name === state.day) {
                //         day.spots -= 1;
                //         return day;
                //     }
                // })
                setState(prev => ({ ...prev, appointments, days: newDays }))
            })
    }

    function cancelInterview(id, interview) {
        const appointment = {
            id: state.appointments[id].id,
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };


        return axios.delete(`/api/appointments/${id}`)
            .then(() => {
                const days = [
                    ...state.days
                ]
                days.forEach(day => {
                    if (day.name === state.day) {
                        day.spots += 1;
                    }
                })
                setState(prev => ({ ...prev, appointments, days }))
            })
    }
    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ]).then((all) => {
            setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
            // console.log(all[2].data)
        });
    }, []);
    return { state, setDay, bookInterview, cancelInterview }
}
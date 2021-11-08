
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
    // setting the initial state of the below 4 keys
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });
    const setDay = day => setState({ ...state, day });
    // for users clicking different day other than Monday, need to update the state of day each time there's a click to change day
    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
            // will get interview from save()
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => {
                // updating appointments data
                const newDays = state.days.map(day => {
                    if (day.name === state.day) {
                        let spots = 0;
                        for (const appt of day.appointments) {
                            if (appointments[appt].interview === null) {
                                spots++;
                                // making a count of all the available spots
                            }
                        }
                        return {
                            ...day, spots
                            // setDay
                        };
                    } else {
                        return day;
                        // use current day
                    }
                })
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
                        // deleting an appointment means adding spots availability
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
        });
    }, []);
    // important to add [], if not, will be calling api in an infinite loop.
    return { state, setDay, bookInterview, cancelInterview }
    // need to return the above keys in order to use them in Application.js
}
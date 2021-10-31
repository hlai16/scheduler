

export function getAppointmentsForDay(state, day) {
    const apptObj = [];
    if (state.days.length <= 0) {
        return [];
    }

    const filteredDays = state.days.filter(daySelected => daySelected.name === day);
    if (filteredDays.length <= 0) {
        return [];
    }
    const apptArr = filteredDays[0].appointments;
    for (const id of apptArr) {
        for (const key in state.appointments) {
            if (id == key) {
                apptObj.push(state.appointments[key]);
            }
        }
    }
    return apptObj;
}

export function getInterview(state, interview) {
    let newObj = {};
    if (!interview) {
        return null;
    }
    for (const key in state.interviewers){
        if (key == interview.interviewer) {
            newObj = {
                'interviewer': {
                    'avatar': state.interviewers[key].avatar,
                    'id': state.interviewers[key].id,
                    'name': state.interviewers[key].name
                },
                'student': interview.student
            };
            return newObj;
        }
    }
}

export function getInterviewersForDay(state, day) {
    const interviewersObj = [];
    if (state.days.length <= 0) {
        return [];
    }

    const filteredDays = state.days.filter(daySelected => daySelected.name === day);
    if (filteredDays.length <= 0) {
        return [];
    }
    const apptArr = filteredDays[0].appointments;
    for (const id of apptArr) {
        for (const key in state.interviewers) {
            if (id == key) {
                interviewersObj.push(state.interviewers[key]);
            }
        }
    }
    return interviewersObj;
}
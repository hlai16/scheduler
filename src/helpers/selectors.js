

export function getAppointmentsForDay(state, day) {
    const apptArr = [];

    const filteredDays = state.days.filter(daySelected => daySelected.name === day);
    
    if (!filteredDays.length || !state.days.length) {
        return [];
    }
    
    for (let id of filteredDays[0].appointments) {
        for (let key in state.appointments) {
            if (id === parseInt(key)) {
                apptArr.push(state.appointments[key]);
            }
        }
    }
    return apptArr;
}

export function getInterview(state, interview) {
    let newObj = {};
    if (!interview) {
        // console.log('inside null interview block', interview)
        return null;
    }
    for (const key in state.interviewers){
        if (parseInt(key) === interview.interviewer) {
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
    const finalInterviewersArr = [];
    if (!state.days.length) {
        return [];
    }

    const filteredDays = state.days.filter(daySelected => daySelected.name === day);
   

    if (!filteredDays.length) {
        return [];
    }
    const interviewersArr = filteredDays[0].interviewers;
    console.log('filteredDays[0]', filteredDays[0])
    console.log('interviewersArr', interviewersArr)
    for (const id of interviewersArr) {
        console.log('id', id)
        for (const key in state.interviewers) {
            console.log('key + id', key, id)
            if (id === parseInt(key)) {
                finalInterviewersArr.push(state.interviewers[key]);
                console.log('!!finalinterviewersArr!!', finalInterviewersArr)
            }
        }
    }
    return finalInterviewersArr;
}
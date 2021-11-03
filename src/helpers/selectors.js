

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
    
    for (const id of interviewersArr) {
        
        for (const key in state.interviewers) {
            
            if (id === parseInt(key)) {
                finalInterviewersArr.push(state.interviewers[key]);
                
            }
        }
    }
    return finalInterviewersArr;
}
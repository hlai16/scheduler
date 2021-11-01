import React from "react";
import './styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    // console.log('!!', props.interview);
    function save(name, interviewer) {
        if (name && interviewer) {
            transition(SAVING)
        }
        const interview = {
            student: name,
            interviewer
        };
        props.bookInterview(props.id, interview)
        transition(SHOW)
    }
    function deleteAppt(name, interviewer) {
        
         transition(DELETING)
        
        const interview = {
            student: name,
            interviewer
        };
        props.cancelInterview(props.id, interview)
        transition(EMPTY)
    }
    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => { transition(CREATE, null) }} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
            {mode === CREATE &&
                <Form
                    name={props.name}
                    value={props.value}
                    interviewers={props.interviewers}
                    onSave={save}
                    onCancel={back}
                />}
            {mode === SAVING && <Status message="Saving" />}
            {mode === DELETING && <Status message="Deleting" />}
        </article>
    );
}
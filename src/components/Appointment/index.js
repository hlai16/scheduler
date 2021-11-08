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
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    
    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };

        transition(SAVING, true);
        // when is in the SAVING mode ...
        props
            .bookInterview(props.id, interview)
            // updating the appointment info
            .then(() => transition(SHOW))
            // then transition to the SHOW mode with the appointment info
            .catch(error => transition(ERROR_SAVE, true));
            // if fail, show ERROR mode with error message
    }

    function deleteAppt() {
        if (mode === CONFIRM) {
            transition(DELETING, true)
            props.cancelInterview(props.id)
            // deleting the appointment info
                .then(() => transition(EMPTY))
                // transition to the EMPTY mode
                .catch(error => transition(ERROR_DELETE, true));
                // if fail, show ERROR mode with error message
        } else {
            transition(CONFIRM)
        }
    }

    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => { transition(CREATE, null) }} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => { transition(CONFIRM, null) }}
                    onEdit={() => { transition(EDIT) }}
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
            {mode === CONFIRM && <Confirm
                message='Are you sure you want to delete this interview?'
                onCancel={back}
                onConfirm={deleteAppt}
            />}
            {mode === EDIT &&
                <Form
                    name={props.interview.student}
                    // taking values store in the previous SHOW mode, that has stored into the API.
                    value={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onSave={save}
                    onCancel={back}
                />}
            {mode === ERROR_SAVE && <Error
                message="Could not save appointment"
                onClose={back}
            />}
            {mode === ERROR_DELETE && <Error
                message="Could not delete appointment"
                onClose={back}
            />}

        </article>
    );
}
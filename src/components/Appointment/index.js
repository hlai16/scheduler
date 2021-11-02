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
    // console.log('!!', props.interview);
    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };

        transition(SAVING, true);

        props
            .bookInterview(props.id, interview)
            .then(() => transition(SHOW))
            .catch(error => transition(ERROR_SAVE, true));
    }

    function deleteAppt() {
        if (mode === CONFIRM) {
            transition(DELETING, true)
            props.cancelInterview(props.id)
                .then(() => transition(EMPTY))
                .catch(error => transition(ERROR_DELETE, true));
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
                onCancel={back}
                onConfirm={deleteAppt}
            />}
            {mode === EDIT &&
                <Form
                    name={props.interview.student}
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
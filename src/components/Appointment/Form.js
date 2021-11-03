import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
    const [student, setStudent] = useState(props.name || "");
    console.log('student', student)
    const [interviewer, setInterviewer] = useState(props.value || null);
    const reset = function () {
        return setStudent(''), setInterviewer(null);
    }
    const cancel = function () {
        return props.onCancel(reset());
    }
    
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name={props.name}
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        data-testid="student-name-input"
                        onChange={(event) => setStudent(event.target.value)}
                    />
                </form>
                <InterviewerList
                /* your code goes here */
                interviewers={props.interviewers}
                value={interviewer}
                onChange={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={()=> props.onSave(student, interviewer)}>Save</Button>
                </section>
            </section>
        </main>
    );
}
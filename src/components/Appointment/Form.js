import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
    const [student, setStudent] = useState(props.name || "");
    // using useState() to store/change the input value of student's name. Begins as "" because when form first in CREATE mode, student name input should be blank
    const [interviewer, setInterviewer] = useState(props.value || null);
    // using useState() to store/change the selected interviewer. Begin as null because when form first in CREATE mode, none of the interviewers are selected.
    const [error, setError] = useState("");
    // using useState() to toggle the error msg
    const reset = function () {
        return setStudent(''), setInterviewer(null);
    }
    const cancel = function () {
        return props.onCancel(reset());
    }

    function validate() {
        if (student === "") {
          setError("Student name cannot be blank");
          return;
        }
        if (interviewer === null) {
            setError('Please select an interviewer');
            return;
        }
        setError('');
        props.onSave(student, interviewer);
        // form proceed to save if student != "" || interviewer is selected
      }
    
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name={props.name}
                        // props.name passing down from Appointment component
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        // from the useState(), student as the current state
                        data-testid="student-name-input"
                        // for cypress testing, a secure way to run test is to have a data-testid
                        onChange={(event) => setStudent(event.target.value)}
                        // grabbing and storing the input value
                    />
                </form>
                <section className="appointment__validation">{error}</section>
                <InterviewerList
                /* your code goes here */
                interviewers={props.interviewers}
                // the interviewers array passing down from Appointment component
                value={interviewer}
                // currently selected
                onChange={setInterviewer}
                // setting the state to the currently selected interviewer
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={validate}>Save</Button>
                </section>
            </section>
        </main>
    );
}
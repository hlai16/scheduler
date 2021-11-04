import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList(props) {
    // map through the interviewers array to display each interviewer's info (avatar and name) for users to select
    const mapInterviewersArr = props.interviewers.map(interviewer => <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={interviewer.id === props.value} setInterviewer={() => props.onChange(interviewer.id)} {...interviewer} />);
    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{mapInterviewersArr}</ul>
        </section>
    );
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};


export default InterviewerList;
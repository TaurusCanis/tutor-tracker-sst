import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [students, setStudents] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const students = await loadStudents();
        console.log("students: ", students);
        setStudents(students);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadStudents() {
    return API.get("students", "/students");
  }

  function renderStudentsList(students) {
    return (
      <>
        <LinkContainer to="/students/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-1 font-weight-bold">Add a new Student</span>
          </ListGroup.Item>
        </LinkContainer>
        {students.map(({ studentId, firstName }) => (
          <LinkContainer key={studentId} to={`/students/${studentId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {firstName}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Tutor Tracker</h1>
        <p className="text-muted">A tool for tutors</p>
      </div>
    );
  }

  function renderStudents() {
    return (
      <div className="students">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Students</h2>
        <ListGroup>{!isLoading && renderStudentsList(students)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderStudents() : renderLander()}
    </div>
  );
}

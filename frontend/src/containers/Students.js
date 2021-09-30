import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Students.css";

export default function Students() {
  const { id } = useParams();
  const history = useHistory();
  const [student, setStudent] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const student = await loadStudent();
        console.log("student:", student);
        const { firstName } = student;

        setStudent(student);
        setFirstName(firstName);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function loadStudent() {
    return API.get("students", `/students/${id}`);
  }

  function validateForm() {
    //Does anything from the form need to be validated?
    return true;
  }

  function saveStudent(student) {
    return API.put("students", `/students/${id}`, {
      body: student
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      //Pass in attributes, NOT the full student object
      await saveStudent({
        firstName
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteStudent() {
    return API.del("students", `/students/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteStudent();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Student">
      {student && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="student">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}

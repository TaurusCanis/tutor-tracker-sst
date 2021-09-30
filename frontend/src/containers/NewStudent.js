import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
// import config from "../config";
import "./NewStudent.css";
import { useFormFields } from "../lib/hooksLib";
import { API } from "aws-amplify";

export default function NewStudent() {
  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    email: "",
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createStudent({});
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createStudent(student) {
    return API.post("students", "/students", {
      body: fields,
    });
  }

  return (
    <div className="NewStudent">
      <h2>Add New Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName" size="lg">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.firstName}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName" size="lg">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.lastName}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form, Container, Row, Col } from "react-bootstrap";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const route = "http://5.22.217.225:5000/auth/";
    const options = {
      method: "POST",
      url: route,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.status !== 201) {
          throw Error("incorrect login");
        }
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setToken(data.accessToken);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setToken("");
        setError("incorrect login");
      });
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Label> Login:</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
      <Row>
        <Col>
          <p> {token} </p>
        </Col>
      </Row>
      {error.length > 0 && (
        <Row>
          <Col>{error !== "" ? <p> {error} </p> : null}</Col>
        </Row>
      )}
    </Container>
  );
}

export default App;

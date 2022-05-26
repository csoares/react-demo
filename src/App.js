import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form, Container, Row, Col } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      token: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "username") {
      this.setState({
        username: event.target.value,
      });
      return;
    }
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
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
        this.setState({
          token: data.accessToken,
        });
        this.setState({
          error: "",
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: "erro na autenticação",
        });
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label> Login:</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control
                id="username"
                type="text"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
        <Row>
          <Col>
            <p> {this.state.token} </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.error !== "" ? <p> {this.state.error} </p> : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Button,
  Spinner,
  Form,
  FormControl,
} from "react-bootstrap";
import UserDetails from "../components/UserDetails";
import axios from "axios";
const HomeScreen = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [todos, setTodos] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [pgloadingFlag, setPgLoadingFlag] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [sortingFlag, setSortingFlag] = useState(false);
  const [keyword, setKeyword] = useState("");

  const getSelectedUserFromApi = async (id) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { data: selectedTodo } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    data && setSelectedUser(data);
    selectedTodo && setSelectedTodo(selectedTodo);
    setLoadingFlag(false);
  };

  const getTodos = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: {
          _limit: 10,
        },
      }
    );
    data && setTodos(data);
    setPgLoadingFlag(false);
  };

  useEffect(() => {
    getTodos();
  }, [keyword]);

  const checkUserDetails = () => {
    if (
      Object.keys(selectedUser).length === 0 ||
      Object.keys(selectedTodo).length === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const sortTodos = () => {
    const sortProperty = "id";
    if (!sortingFlag) {
      const sorted = todos.sort((a, b) => b[sortProperty] - a[sortProperty]);
      setSortingFlag(true);
      setTodos(sorted);
    } else {
      const sorted = todos.sort((a, b) => a[sortProperty] - b[sortProperty]);
      setSortingFlag(false);
      setTodos(sorted);
    }
  };

  const searchTodos = (e) => {
    e.preventDefault();
    setTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    setSelectedUser({});
    setSelectedTodo({});
  };

  return (
    <Container className="my-3">
      {pgloadingFlag ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Row>
            <Col md={8}>
              <Row>
                <Col>
                  <h3>Todos</h3>
                </Col>
                <Col>
                  <Form className="d-flex" onSubmit={searchTodos}>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button type="submit" className="btn btn-dark">
                      Search
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Table striped bordered hover variant="dark" className="my-3">
                <thead>
                  <tr>
                    <td onClick={sortTodos} style={{ cursor: "pointer" }}>
                      ToDo Id
                    </td>
                    <td>Title</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {todos.length === 0 ? (
                    <tr>
                      <td>No Todos To Display</td>
                      <td>NA</td>
                      <td>NA</td>
                      <td>NA</td>
                    </tr>
                  ) : (
                    todos.map((todo) => (
                      <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td>{todo.completed ? "Completed" : "In Complete"}</td>
                        <td>
                          <Button
                            className="btn btn-sm"
                            onClick={() => {
                              getSelectedUserFromApi(todo.id);
                            }}
                          >
                            View User
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Col>
            <Col md={4} className="my-3">
              <h3>User Details</h3>
              {todos.length === 0 ? (
                "No Todos To Select User"
              ) : checkUserDetails() ? (
                <h4>Click on View User To Get User Details</h4>
              ) : loadingFlag ? (
                <Spinner animation="border" />
              ) : (
                <UserDetails
                  todoId={selectedTodo.id}
                  todoTitle={selectedTodo.title}
                  userId={selectedUser.id}
                  userName={selectedUser.name}
                  userEmail={selectedUser.email}
                />
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;

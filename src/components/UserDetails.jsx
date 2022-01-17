import React from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";

const UserDetails = ({ todoId, todoTitle, userId, userName, userEmail }) => {
  return (
    <Card style={{ width: "25rem" }}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>ToDo Id</strong>
            </Col>
            <Col>{todoId}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>ToDo Title</strong>
            </Col>
            <Col>{todoTitle}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>User Id</strong>
            </Col>
            <Col>{userId}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>User Name</strong>
            </Col>
            <Col>{userName}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>User Email</strong>
            </Col>
            <Col>{userEmail}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default UserDetails;

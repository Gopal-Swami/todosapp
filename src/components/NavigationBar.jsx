import React from "react";
import { Navbar, Container } from "react-bootstrap";
const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="https://th.bing.com/th/id/OIF.sGJA9tnjx5YjBL4gr8Eq6g?pid=ImgDet&rs=1"
            width="30"
            height="30"
            className="d-inline-block align-top mx-3"
          />
          Todo Viewer
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

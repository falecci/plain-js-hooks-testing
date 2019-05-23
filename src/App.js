import React, { useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useKeyPress from "./useKeyPress";

const stylesheet = {
  container: {
    marginTop: "30px"
  },
  keysRow: {
    marginTop: "15px"
  }
};

const App = () => {
  const {
    pressedKeys,
    setPressedKey,
    removeDuplicateKeys,
    clearPressedKeys
  } = useKeyPress();

  const upHandler = useCallback(
    ({ key }) => {
      setPressedKey(key);
    },
    [setPressedKey]
  );

  useEffect(() => {
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, [upHandler]);

  return (
    <Container style={stylesheet.container}>
      <Jumbotron>
        <Row>
          <Col xs={1}>
            <Button onClick={clearPressedKeys} type="button">
              Clear
            </Button>
          </Col>
          <Col xs={3}>
            <Button onClick={removeDuplicateKeys} type="button">
              Remove Duplicates
            </Button>
          </Col>
        </Row>
        <Row style={stylesheet.keysRow}>
          <Col>
            Keys already pressed:{" "}
            {pressedKeys.length === 0 ? "None" : pressedKeys.join(",")}
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export default App;

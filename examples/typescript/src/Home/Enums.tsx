import * as React from "react";
import Container from "./Container";
enum Direction {
  Up,
  Down = 0,
  Left,
  Right,
}
export default (): JSX.Element => (
  <Container title="枚举">
    <p>上：{Direction[0]}</p>
    <p>下：{Direction[2]}</p>
  </Container>
);

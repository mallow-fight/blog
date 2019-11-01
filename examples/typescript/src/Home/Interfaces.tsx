import * as React from "react";
import Container from "./Container";
function printLabel(labeledObj: { label: string }) {
  return labeledObj.label;
}
type Cd = (c: string, d: string) => string;
interface ITest {
  readonly a: string;
  b?: string;
  cd: Cd;
}
function printLabel1(props: ITest) {
  return props.a;
}
export default (): JSX.Element => (
  <Container title="接口">
    <p>{printLabel({ label: "abc" })}</p>
    <p>{printLabel1({ a: "test", cd: (a, b) => `${a}${b}`})}</p>
  </Container>
);

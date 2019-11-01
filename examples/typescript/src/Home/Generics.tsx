import * as React from "react";
import Container from "./Container";
function sum<T>(a: T, b: T): T[] {
  return [a, b];
}
class Component<S, P> {
  public add(a: S, b: P): S {
    return a;
  }
}
function getObjectValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
export default (): JSX.Element => (
  <Container title="泛型">
    <p>数字：{JSON.stringify(sum<number>(1, 2))}</p>
    <p>字符串：{JSON.stringify(sum<string>("a", "b"))}</p>
    <p>类：{(new Component<number, string>().add(1, "2"))}</p>
    <p>获取对象的值：{getObjectValue({a: 1, b: 2}, "a")}</p>
  </Container>
);

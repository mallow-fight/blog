import * as React from "react";
import Container from "./Container";
function Types(): JSX.Element {
  const aBoolean: boolean = false;
  const aNumber: number = 12345;
  const aString: string = "hahaha";
  const aNumberArray: number[] = [1, 2, 3];
  const aTupleArray: [number, string, boolean] = [1, "a", true];
  enum Color {
    Red = 100,
    Green = 200,
    Blue = 300,
    Yellow = "yellowCode",
  }
  const aAny: any = 123;
  const aVoid: void = undefined;
  const aUndefined: undefined = undefined;
  const aNull: null = null;
  return (
    <Container title="类型">
      <p>I am a boolean: {JSON.stringify(aBoolean)}</p>
      <p>I am a number: {JSON.stringify(aNumber)}</p>
      <p>I am a string: {JSON.stringify(aString)}</p>
      <p>I am any string length: {`${(aAny as string).length}`}</p>
      <p>I am a number array: {JSON.stringify(aNumberArray)}</p>
      <p>I am a tuple array: {JSON.stringify(aTupleArray)}</p>
      <p>I am a enum: {Color.Blue}、{Color[100]}、{Color.Yellow}</p>
      <p>I am a any: {aAny}</p>
      <p>I am a void: {`${aVoid}`}</p>
      <p>I am a undefined: {`${aUndefined}`}</p>
      <p>I am a null: {`${aNull}`}</p>
    </Container>
  );
}

export default Types;

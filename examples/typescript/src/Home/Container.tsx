import * as React from "react";
interface IProps {
  title?: string;
  children?: JSX.Element | JSX.Element[];
}
function Container({title, children}: IProps) {
  return (
    <div className="container">
      <p className="title">{title}:</p>
      {children}
    </div>
  );
}
export default Container;

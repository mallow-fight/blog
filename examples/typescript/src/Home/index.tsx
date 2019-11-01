import * as React from "react";
import Declaration from "./Declaration";
import Enums from "./Enums";
import Generics from "./Generics";
import Interfaces from "./Interfaces";
import Types from "./Types";

import "./index.less";

class Home extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div>
        <Types />
        <Declaration />
        <Interfaces />
        <Generics />
        <Enums />
      </div>
    );
  }
}

export default Home;

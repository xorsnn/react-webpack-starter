import * as React from "react";
import * as styles from "./App.css";

import testImg from "img/test-image.jpg";

export const App = () => {
  return (
    <div>
      <h1 className={styles.header}>the app</h1>
      <img src={testImg} />
    </div>
  );
};

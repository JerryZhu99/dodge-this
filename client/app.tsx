import "bootstrap";
import "stylesheets/styles.scss";

import * as React from "react";
import { render } from 'react-dom';

import Main from "components/main";

render(<Main />, document.getElementById('view'));

export * from "./src/game";
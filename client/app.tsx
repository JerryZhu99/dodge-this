import "bootstrap";
import "stylesheets/styles.scss";

import * as React from "react";
import {render} from 'react-dom';

import GameContainer from "./components/game-container";

render(<GameContainer name="test"/>, document.getElementById('view'));

export * from "./src/game";
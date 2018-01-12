import "bootstrap";
import "stylesheets/styles.scss";

import * as React from "react";
import {render} from 'react-dom';

import Game from "src/game";

render(<Game name="test"/>, document.getElementById('view'));


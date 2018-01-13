import * as React from "react";

import Graphics from "graphics";
import * as Game from "game";
import { MouseEvent } from "react";

/**
 * The game canvas. 
 * Handles renderering.
 */
export class Canvas extends React.Component<any, any>{
  canvas: HTMLCanvasElement;
  componentDidMount(){
    Game.init(this.canvas);
  }
  render() {
    return <canvas className={"w-100"} ref={c=>this.canvas = c}
    //https://stackoverflow.com/a/33924816
    width={this.props.width}
    height={this.props.height}>
    </canvas>
  }

}

/**
 * Describes the game page.
 */
export default class GameContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="container-fluid">
      <h1>Text</h1>
      <div className={"row"}>
        <Canvas width="1600" height="900"></Canvas>
      </div>
    </div>;
  }
}


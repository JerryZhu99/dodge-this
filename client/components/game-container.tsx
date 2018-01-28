import * as React from "react";
import * as Game from "src/game";

/**
 * The game canvas. 
 * Handles renderering.
 */
export class Canvas extends React.Component<any, any>{
  canvas: HTMLCanvasElement;
  componentDidMount() {
    Game.init(this.canvas);
  }
  componentWillUnmount(){
    Game.destroy();
  }
  render() {
    return <canvas ref={c => this.canvas = c}
      //https://stackoverflow.com/a/33924816
      width={this.props.width}
      height={this.props.height}>
    </canvas>
  }

}

/**
 * Describes the game page.
 */
export default class GameContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Text</h1>
        <div className="row">
          <div className="col">
            <Canvas width="1600" height="900"></Canvas>
          </div>
        </div>
      </div>
    );
  }
}


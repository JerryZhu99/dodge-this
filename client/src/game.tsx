import * as React from "react";

import Graphics from "graphics";

/**
 * The game canvas. 
 * Handles renderering.
 */
export class Canvas extends React.Component<any, any>{
  componentDidMount(){
    let graphics = new Graphics(this.context);
    graphics.init();
  }
  render() {
    return <canvas className={"w-100"} ref={(c) => this.context = c.getContext('2d')}
    //https://stackoverflow.com/a/33924816
    width={this.props.width}
    height={this.props.height}>
    </canvas>
  }
}

/**
 * Describes the game page.
 */
export default class Game extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="container">
      <h1>Text</h1>
      <div className={"w-100"}>
        <Canvas width="1600" height="900"></Canvas>
      </div>
    </div>;
  }
}


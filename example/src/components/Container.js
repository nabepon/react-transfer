import React, { Component } from "react";
import Items1 from "./Items1";
import Items2 from "./Items2";
import { Destination, Transporter } from "../../../src/index";

export default class TransportContainer extends Component {
  constructor() {
    super();
    this.state = { count: 1 };
  }
  increment = () => {
    this.setState(state => ({
      count: state.count + 1,
    }));
  };
  render() {
    const count = this.state.count;
    return (
      <div>
        <button onClick={this.increment}>increment</button>:{count}<br/><br/>
        <Transporter collect="testItem">
          <div>
            <Items1 count={count} />
          </div>
          <Transporter collect="testItem2">
            <Items2 count={count} />
            <Destination collect="testItem2"/><br/>
          </Transporter>
          <Destination collect="testItem" component="span">
            {(components) => {
              if(components.length){
                components.unshift({
                  children: <div key="layer">layer element</div>
                });
              }
              return components.sort((a, b) => a.itemKey < b.itemKey);
            }}
          </Destination>
          <br/>
        </Transporter>
      </div>
    );
  }
}

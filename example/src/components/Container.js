import React, { Component } from "react";
import { Destination, Transporter, TransportItem } from "../../../src/index";

const style = (
  <style>
    { /* language=SCSS */ `
      .destination{
        display: block;
        position: relative;
      }
      .item{
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        padding: 20px 0;
        color: #fff;
        border: solid 1px #aaa;
      }
    `}
  </style>
);

const getItemStyle = (priority, index) => {
  const code = (index+1).toString(16);
  return {
    top: (index * 40) + "px",
    left: (index * 10) + "px",
    backgroundColor: `#${code}${code}${code}`,
  };
};

export default class TransportContainer extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      sort: 0,
    };
  }
  increment = () => {
    this.setState(state => ({
      count: state.count <= 10 ? state.count + 1 : state.count,
    }));
  };
  decrement = () => {
    this.setState(state => ({
      count: state.count >= 1 ? state.count - 1 : 0,
    }));
  };
  sort = () => {
    this.setState(state => ({
      sort: state.sort === 1 ? 0 : 1,
    }));
  };
  render() {
    const {
      count,
      sort
    } = this.state;
    return (
      <div>
        {style}
        <button onClick={this.sort}>sort: { sort ? "asc" : "desc" }</button><br/>
        <button onClick={this.increment}>increment</button><br/>
        <button onClick={this.decrement}>decrement</button><br/>
        <br/>
        <Transporter collect="testItem">
          <div>- component code start</div>
          <div>
            (hidden)
            {(() => {
              const components = [];
              for(let i = 0; i<count; i++) {
                components.push(
                  <TransportItem itemKey={"Item" + i} priority={i} key={i}>
                    <div className={"item " + i}style={getItemStyle(1, i)}>Item {i}</div>
                  </TransportItem>
                );
              }
              return components;
            })()}
          </div>
          <div>- component code end</div>
          <br/>
          <div>- display component</div>
          <Destination collect="testItem" component="span" className="destination">
            {(components) => {
              if(sort === 1) {
                return components.sort((a, b) => b.priority - a.priority);
              }
              return components.sort((a, b) => a.priority - b.priority);
            }}
          </Destination>
        </Transporter>
      </div>
    );
  }
}

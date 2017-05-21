import React, { Component } from "react";
import { TransportItem } from "../../../src/index";

export default class Item2 extends Component {
  render() {
    const { count } = this.props;
    return (
      <div>
        <TransportItem itemKey="Item1">
          <div>Item2 1: {count}</div>
        </TransportItem>
        <TransportItem itemKey="Item2">
          <div>Item2 2: {count}</div>
        </TransportItem>
        <TransportItem itemKey="Item3">
          <div>Item2 3: {count}</div>
        </TransportItem>
      </div>
    );
  }
}

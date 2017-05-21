import React, { Component } from "react";
import { TransportItem } from "../../../src/index";

export default class Item1 extends Component {
  render() {
    const { count } = this.props;
    return (
      <div>
        <TransportItem itemKey="Item1">
          <div>Item1 1: {count}</div>
        </TransportItem>
        <TransportItem itemKey="Item2">
          <div>Item1 2: {count}</div>
        </TransportItem>
        <TransportItem itemKey="Item3">
          <div>Item1 3: {count}</div>
        </TransportItem>
      </div>
    );
  }
}

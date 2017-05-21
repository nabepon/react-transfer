import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Transporter extends Component {
  static childContextTypes = {
    transferContext: PropTypes.object,
  };
  components = {};
  collectComponent = (props) => {
    if(!this.components[this.props.collect]) {
      this.components[this.props.collect] = {};
    }
    this.components[this.props.collect][props.itemKey] = props;
  };
  removeComponent = (props) => {
    this.components[this.props.collect][props.itemKey] = null;
  };
  getChildContext = () => ({
    transferContext: {
      collectComponent: this.collectComponent,
      removeComponent: this.removeComponent,
      components: this.components,
    }
  });
  render() {
    const {
      component,
      // eslint-disable-next-line no-unused-vars
      collect,
      children,
      ...restProps
    } = this.props;
    return React.createElement(component || "div", restProps, children);
  }
}

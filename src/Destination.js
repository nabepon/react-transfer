import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Destination extends Component {
  static contextTypes = {
    transferContext: PropTypes.object
  };
  render() {
    const {
      collect,
      component,
      children,
      ...restProps
    } = this.props;
    const propsObj = this.context.transferContext.components[collect];
    if(!propsObj) {
      return null;
    }
    const propsArray = Object.keys(propsObj).reduce((result, key) => {
      if(propsObj[key]) {
        result.push(propsObj[key]);
      }
      return result;
    }, []);
    const components = (children ? children(propsArray) : propsArray).map(props => props.children) ;
    return React.createElement(component || "div", restProps, components);
  }
}

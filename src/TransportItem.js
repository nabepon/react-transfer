import { Component } from "react";
import PropTypes from "prop-types";

export default class TransportItem extends Component {
  static contextTypes = {
    transferContext: PropTypes.object
  };
  componentWillReceiveProps(nextProps) {
    this.context.transferContext.collectComponent(nextProps);
  }
  componentWillMount() {
    this.context.transferContext.collectComponent(this.props);
  }
  componentWillUnmount() {
    this.context.transferContext.removeComponent(this.props);
  }
  render() {
    return null;
  }
}

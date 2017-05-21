import React from "react";
import assert from "power-assert";
import { render, mount } from "enzyme";
import { JSDOM } from "jsdom";
import { Destination, Transporter, TransportItem } from "../src/index";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;
global.window = window;
global.document = window.document;
global.navigator = { userAgent: "node.js" };

describe("Transporter", () => {
  it("simple transfer", () => {
    const elem = render(
      <Transporter collect="testCollect">
        <div className="wrap-transport-item">
          <TransportItem itemKey="key1">item1</TransportItem>
        </div>
        <div className="wrap-destination">
          <Destination collect="testCollect" />
        </div>
      </Transporter>
    );

    const transportItem = elem.find(".wrap-transport-item").text();
    const destination = elem.find(".wrap-destination").text();
    assert.equal(transportItem, "");
    assert.equal(destination, "item1");
  });

  it("multi transfer", () => {
    const elem = render(
      <Transporter collect="testCollect-1">
        <div className="wrap-transport-item-1">
          <TransportItem itemKey="key1">item1</TransportItem>
        </div>
        <div className="wrap-destination-1">
          <Destination collect="testCollect-1" />
        </div>
        <Transporter collect="testCollect-2">
          <div className="wrap-transport-item-2">
            <TransportItem itemKey="key1">item2</TransportItem>
          </div>
          <div className="wrap-destination-2">
            <Destination collect="testCollect-2" />
          </div>
        </Transporter>
      </Transporter>
    );

    const text = elem.text();
    assert.equal(text, "item1item2");
  });

  it("display order", () => {
    const elem = render(
      <Transporter collect="testCollect-1">
        <div className="wrap-transport-item-1">
          <TransportItem itemKey="key1">item1</TransportItem>
        </div>
        <Transporter collect="testCollect-2">
          <div className="wrap-transport-item-2">
            <TransportItem itemKey="key1">item2</TransportItem>
          </div>
          <div className="wrap-destination-2">
            <Destination collect="testCollect-2" />
          </div>
        </Transporter>
        <div className="wrap-destination-1">
          <Destination collect="testCollect-1" />
        </div>
      </Transporter>
    );

    const text = elem.text();
    assert.equal(text, "item2item1");
  });

  it("mount and unmount", () => {
    class Container extends React.Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
      }
      increment = () => {
        this.setState(state => ({
          count: state.count + 1,
        }));
      };
      render() {
        const { count } = this.state;
        return (
          <div className="container">
            <button className="increment" onClick={this.increment}/>
            <div className="wrap-count">{ count }</div>
            <Transporter collect="testCollect">
              <div className="wrap-transport-item">
                {count === 0 || count === 2 ? <TransportItem itemKey="key1">item1</TransportItem> : null}
              </div>
              <div className="wrap-destination">
                <Destination collect="testCollect" />
              </div>
            </Transporter>
          </div>
        );
      }
    }

    const wrapper = mount(<Container />);

    assert.equal(wrapper.find(".wrap-count").text(), 0);
    assert.equal(wrapper.find(".wrap-destination").text(), "item1");

    wrapper.find(".increment").simulate("click");
    assert.equal(wrapper.find(".wrap-count").text(), 1);
    assert.equal(wrapper.find(".wrap-destination").text(), "");

    wrapper.find(".increment").simulate("click");
    assert.equal(wrapper.find(".wrap-count").text(), 2);
    assert.equal(wrapper.find(".wrap-destination").text(), "item1");
  });

  it("sort and unshift", () => {
    class Container extends React.Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
      }
      increment = () => {
        this.setState(state => ({
          count: state.count + 1,
        }));
      };
      render() {
        const { count } = this.state;
        return (
          <div className="container">
            <button className="increment" onClick={this.increment}/>
            <div className="wrap-count">{ count }</div>
            <Transporter collect="testCollect">
              <div className="wrap-transport-item">
                <TransportItem itemKey="key1" priority={3}>item1</TransportItem>
                <TransportItem itemKey="key2" priority={1}>item2</TransportItem>
                <TransportItem itemKey="key3" priority={2}>item3</TransportItem>
              </div>
              <div className="wrap-destination">
                <Destination collect="testCollect">
                  {components => {
                    if(count === 0) {
                      return components.sort((a, b) => a.priority - b.priority);
                    }
                    if(count === 1) {
                      return [
                        { children: "AdditionalElement & " },
                        ...components.sort((a, b) => b.priority - a.priority)
                      ];
                    }
                  }}
                </Destination>
              </div>
            </Transporter>
          </div>
        );
      }
    }

    const wrapper = mount(<Container />);

    assert.equal(wrapper.find(".wrap-count").text(), 0);
    assert.equal(wrapper.find(".wrap-destination").text(), "item2item3item1");

    wrapper.find(".increment").simulate("click");
    assert.equal(wrapper.find(".wrap-count").text(), 1);
    assert.equal(wrapper.find(".wrap-destination").text(), "AdditionalElement & item1item3item2");
  });
});

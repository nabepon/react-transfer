# React Transfer
Rendering components in a different location.

## Installation
```
npm install --save react-transfer
```

## Why React Transfer?
<!--
ReactでModalを作るときは、z-indexで表示順を管理します。
しかし、前面に表示する要素(固定ヘッダーやドロワーメニュー等)が増えると、z-indexでは管理不可能になります。
react-transferのアプローチでは、前面表示したい要素をDOMツリーの最後へ輸送します。
表示順序の問題は、javascriptで表示順を制御することで解決します。
-->

When making Modal with React, manage display order with z-index.
However, as elements to be displayed on the front (such as fixed headers and drawer menus) increase, it becomes impossible to manage with z-index.
In the react-transfer approach, we will transport the elements you want to display in front to the end of the DOM tree.
The display order problem is solved by controlling the display order with javascript.

## Example

## API

### Transporter
<!-- Transporterでラップした範囲の要素に対して輸送を行います。 -->
We will transport the elements in the range wrapped in the Transporter.
```
<Transporter collect="uniq_id">some jsx</Transporter>
```

### TransportItem
<!-- TransportItemでラップした要素を輸送をします。 -->
We will transport the wrapped elements in the TransportItem.
```
<TransportItem itemKey="uniq_key">some jsx</TransportItem>
```

### Destination
<!-- 
TransportItemの表示先。
collect属性はTransporterと同じにしてください。
-->
The destination of the TransportItem.
The collect attribute should be the same as Transporter.
```
<Destination collect="uniq_id">reducer function</Destination>
```

## Usage
```jsx
import React from "react";
import { Transporter, TransportItem, Destination } from "react-transfer";

function Component(){
  return (
    <Transporter collect="collectId">
      <div className="transport-item">
        <TransportItem itemKey="key1">item1</TransportItem>
        <TransportItem itemKey="key2">item2</TransportItem>
        <TransportItem itemKey="key3">item3</TransportItem>
      </div>
      <div className="destination">
        <Destination collect="collectId" />
      </div>
    </Transporter>
  );
}

ReactDOM.render(
  <Component />,
  document.querySelector("#app")
);
```

## Advanced
Please look at the example.  
[example](https://github.com/nabepon/react-transfer/blob/master/example/src/components/Container.js)

## Demo
https://nabepon.github.io/react-transfer/example/src/

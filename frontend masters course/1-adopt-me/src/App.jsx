import React from "react";
import ReactDOM from 'react-dom';

const Pet = (props) => {
     return React.createElement("div", {}, [
          React.createElement("h1", {}, props.name),
          React.createElement("h2", {}, props.animal),
          React.createElement("h3", {}, props.breed),
     ]);
};

const App = () => {
     return React.createElement("div", {}, [
          React.createElement("h1", {}, "Adopt Me!"),
          React.createElement(Pet, {
               animal: "Dog",
               name: "Frugo",
               breed: "Spaniel",
          }),
          React.createElement(Pet, {
               animal: "Snake",
               name: "Daniel",
               breed: "Python",
          }),
          React.createElement(Pet, {
               animal: "Cat",
               name: "Lucifer",
               breed: "Mixed",
          }),
     ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));

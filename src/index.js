import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";
import './assets/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 1024,
  height: 600,
  scene: playGame,
  app1: App
};

const game = new Phaser.Game(config);


ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);

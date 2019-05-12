//Star Wars Pit Fight Object Game
//Main object: starWars

import { SingletonPitFight } from "./classes/PitFight.js";

$(document).ready(function() {
  var pitFight = new SingletonPitFight().getInstance();
  console.log("done creating pitFight object...");

  pitFight.gameReset();
});

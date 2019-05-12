import characters from "../utilities/characters.js";
import characterImages from "../utilities/characterImages.js";
import d6 from "../functions/d6.js";
import moveCard from "../functions/moveCard.js";
import resolveAttack from "../functions/resolveAttack.js";
import resolveBattle from "../functions/resolveBattle.js";
import gameOver from "../functions/gameOver.js";
import setBoard from "../functions/setBoard.js";
import gameReset from "../functions/gameReset.js";

export class SingletonPitFight {
  constructor() {
    if (!SingletonPitFight.instance) {
      console.log("creating new PitFight instance...");
      SingletonPitFight.instance = new PitFight();
    }
  }
  getInstance() {
    console.log("getting PitFight instance...");
    return SingletonPitFight.instance;
  }
}
export class PitFight {
  //Beginning of the game object
  constructor() {
    this.combatants = [];
    this.dudes = characters;
    this.images = characterImages;
    this.gamesPlayed = 0;
    this.wins = 0;
    this.losses = 0;
    this.counter = 0;
    this.round = 0;
    this.champion = 0;
    this.battleStarted = false;
    this.defenders = [];
    this.album = [];
  }

  d6 = d6;

  moveCard = moveCard;

  resolveAttack = resolveAttack;

  resolveBattle = resolveBattle;

  gameOver = gameOver;

  gameReset = gameReset;

  setBoard = setBoard;

  messages = {
    //Begin messages object
    rules:
      "Choose your champion by double-clicking on the card. After you have chosen your champion, choose three defenders by double-clicking on their cards. <br> Choose wisely. <br> During each round, the Champion attacks the first Defender in the group. The Defender responds with a Counter Attack. If either are reduced below 0 HP, they die. However, with each susequent round, the Champion's Attack Power doubles while the Defender's Counter Attack Power stays the same. <br>You win the game only if your champion survives all the counter attacks from the Defenders while eliminating all of them.",
    readyBattle: "Are you ready to start the battle?",
    readyNextBattle: "Are you ready for the next defender?",
    gameOver: "Game over!",
    restart: "Would you like another game?",
    winner: "You won the game!",
    loser: "You lost the game.",

    billboard(condition, message) {
      let newMessage = "";

      switch (condition) {
        case "win":

        case "loss":
          newMessage = this.gameOver.concat("\n", message);
          newMessage = newMessage.concat("\n", this.restart);
          break;

        default:
          newMessage = message;
      }

      $("#billboard").empty();
      let announcement = $("#billboard");
      announcement.append($("<h3 id='text'>"));
      $("#text").append(newMessage);

      announcement.addClass("billboard-show");
      let x = $(
        "<button type ='button'class ='action-button' id = 'ready-button'></button"
      );
      x.text("Ready");
      announcement.append(x);
      announcement.show();

      x.on("click", function() {
        announcement.hide();
        $("#pit").show();

        return true;
      });
    }
  }; //end messages object
}

import readyPitForMessage from "./readyPitForMessage.js";
import readyPitForBattle from "./readyPitForBattle.js";
import prepareBoard from "./prepareBoard.js";
import resolveAttack from "./resolveAttack.js";

export default function resolveBattle() {
  readyPitForMessage();

  this.round++;
  this.battleStarted = true;

  if (this.round < 2) {
    this.messages.billboard("battle", this.messages.readyBattle);
  } else {
    this.messages.billboard("battle", this.messages.readyNextBattle);
  }

  if (
    this.defenders.length === 0 ||
    this.champion === undefined ||
    this.champion.hp < 0
  ) {
    return;
  }

  readyPitForBattle(this);

  prepareBoard();
  resolveAttack(this);
}

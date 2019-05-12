export default function gameReset() {
  this.battleStarted = false;
  this.gamesPlayed++;
  this.round = 0;
  this.combatants = [];
  this.counter = 0;

  $(this.champion).empty();

  if ($("#combatant-area").hasClass("billboard")) {
    $("#combatant-area").removeClass("billboard");
  }
  if ($("#champion-box").hasClass("billboard")) {
    $("#champion-box").removeClass("billboard");
  }
  if ($("#battlefield").hasClass("battlefield")) {
    $("#battlefield").removeClass("battlefield");
  }
  if ($("#defender-box").hasClass("ready-defender")) {
    $("#defender-box").removeClass("ready-defender");
  }

  $("#characterPen, #billboard, #champion, #defender, #pit").empty();

  if (this.gamesPlayed < 2) {
    this.messages.billboard("start", this.messages.rules);
  }

  this.setBoard();
}

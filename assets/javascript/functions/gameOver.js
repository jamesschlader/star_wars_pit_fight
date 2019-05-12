export default function gameOver() {
  if (this.combatants[this.champion.attr("combatant-index")].hp < 1) {
    this.losses++;
    $("#losses").text("Losses: " + this.losses);
    if ($("#billboard").hasClass("billboard")) {
      $("#billboard").addClass("billboard-show");
    }
    this.gameReset();
    return true;
  } else if (this.defenders.length < 1) {
    this.wins++;
    $("#wins").text("Wins: " + this.wins);
    if ($("#billboard").hasClass("billboard")) {
      $("#billboard").addClass("billboard-show");
    }
    this.gameReset();
    return true;
  }
}

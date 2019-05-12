export default function readyPitForMessage() {
  $("#pit").empty();
  $("#combatant-area").hide();
  $("#combatant-area").addClass("billboard");
  $("#champion-box").addClass("billboard");
  $("#battlefield").addClass("battlefield");
  $("#defender-box").addClass("ready-defender");
  $("#thePit").addClass("billboard");
}

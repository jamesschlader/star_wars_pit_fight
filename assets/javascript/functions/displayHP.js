export default function displayHP(pitFight) {
  const defenderHpDisplay = pitFight.defenders[0].find("#hp");

  defenderHpDisplay.text(
    "Health: " +
      pitFight.combatants[pitFight.defenders[0].attr("combatant-index")].hp
  );
  const championHpDisplay = pitFight.champion.find("#hp");

  championHpDisplay.text(
    "Health: " +
      pitFight.combatants[pitFight.champion.attr("combatant-index")].hp
  );
}

import applyFancyLetter from "./applyFancyLetter.js";
import displayHP from "./displayHP.js";
import applyfancyLetter from "./applyFancyLetter.js";
import makeAttack from "./makeAttack.js";

export default function resolveAttack(pitFight) {
  let defender =
    pitFight.combatants[pitFight.defenders[0].attr("combatant-index")];

  let attacker = pitFight.combatants[pitFight.champion.attr("combatant-index")];

  $("#attack-button").on("click", function() {
    applyFancyLetter(attacker.attackPower, pitFight);
    displayHP(pitFight);

    const defenderDead = makeAttack(defender, attacker, "attack");

    const attackerDead = makeAttack(attacker, defender, "counter");

    displayHP(pitFight);
    applyfancyLetter(attacker.attackPower, pitFight);

    if (attackerDead) {
      pitFight.champion.hide();
      pitFight.gameOver();
      pitFight.messages.billboard("loss", pitFight.messages.loser);
    } else if (defenderDead) {
      pitFight.defenders[0].hide();
      pitFight.defenders.shift();

      if (pitFight.gameOver()) {
        pitFight.messages.billboard("win", pitFight.messages.winner);
      } else {
        pitFight.resolveBattle(pitFight);
      }
    }
  });
}

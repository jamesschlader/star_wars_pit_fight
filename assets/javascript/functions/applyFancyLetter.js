export default function applyfancyLetter(attackerDamage, pitFight) {
  const championAttackPower = pitFight.champion.find("#attack-power");
  championAttackPower.removeClass("fancyLetter");
  championAttackPower.addClass("fancyLetter");
  championAttackPower.text("Attack Power: " + attackerDamage);
}

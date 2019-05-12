export default function makeAttack(defender, attacker, style) {
  return defender.takeDamage(attacker.attack(style)) <= 0 ? true : false;
}

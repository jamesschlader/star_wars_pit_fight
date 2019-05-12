export default function attack(style) {
  //If attacker is champion, then use attackPower.
  if (style === "attack") {
    //Send attackDamage.
    const current = this.attackPower;
    this.attackPower = current * 2;
    return current;
  }
  if (style === "counter") {
    //Otherwise, counterPower.
    return this.counterPower;
  }
}

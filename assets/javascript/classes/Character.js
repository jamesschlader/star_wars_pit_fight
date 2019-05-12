import attack from "../functions/attack.js";

class Character {
  constructor() {
    this.name = "";
    this.hp = 0;
    this.attackPower = 0;
    this.counterPower = 0;
    this.icon = "";
  }

  attack = attack;

  takeDamage = damage => {
    this.hp -= damage;
    return this.hp;
  };
} //end character object

export default Character;

import d6 from "../assets/javascript/functions/d6.js";
import takeDamage from "../assets/javascript/functions/takeDamage.js";
import Character from "../assets/javascript/classes/Character.js";
import makeAttack from "../assets/javascript/functions/makeAttack.js";
import { PitFight } from "../assets/javascript/classes/PitFight.js";
import gameOver from "../assets/javascript/functions/gameOver.js";

describe("d6.js", () => {
  it("should return an integer equal to or greater than n but not greater than n * 6", () => {
    const result = d6(3);
    expect(result).toBeGreaterThanOrEqual(3);
    expect(result).toBeLessThanOrEqual(18);
  });
});

describe("Character.takeDamage", () => {
  it("should subtract damage from victim's hp", () => {
    const character = new Character();
    character.hp = 20;
    const newHp = character.takeDamage(10);
    expect(character.hp).toBe(10);
  });
});

describe("Character.takeDamage", () => {
  it("should return victim's current hp", () => {
    const character = new Character();
    character.hp = 20;
    const newHp = character.takeDamage(10);
    expect(newHp).toBe(10);
  });
});

describe("attack.js", () => {
  it("should return current attack value", () => {
    const attacker = new Character();
    attacker.attackPower = 12;
    const newAttackRating = attacker.attack("attack");
    expect(newAttackRating).toBe(12);
  });
});

describe("attack.js", () => {
  it("should double current attack value before returning current attack value", () => {
    const attacker = new Character();
    attacker.attackPower = 12;
    const newAttackRating = attacker.attack("attack");
    expect(attacker.attackPower).toBe(24);
  });
});

describe("attack.js", () => {
  it("should return the current counter attack power when using the counter attack style", () => {
    const attacker = new Character();
    attacker.counterPower = 12;
    const counterAttacker = attacker.attack("counter");
    expect(counterAttacker).toBe(12);
  });
});

describe("makeAttack.js", () => {
  it("should return true when the attack damage exceeds the defender's hp", () => {
    const attacker = new Character();
    const defender = new Character();
    attacker.attackPower = 24;
    defender.hp = 18;
    const result = makeAttack(defender, attacker, "attack");
    expect(result).toBe(true);
  });
});

describe("makeAttack.js", () => {
  it("should return false when the attack damage is less than the defender's hp", () => {
    const attacker = new Character();
    const defender = new Character();
    attacker.attackPower = 24;
    defender.hp = 30;
    const result = makeAttack(defender, attacker, "attack");
    expect(result).toBe(false);
  });
});

describe("makeAttack.js", () => {
  it("should return true when the attack damage is equal to defender's hp", () => {
    const attacker = new Character();
    const defender = new Character();
    attacker.attackPower = 24;
    defender.hp = 24;
    const result = makeAttack(defender, attacker, "attack");
    expect(result).toBe(true);
  });
});

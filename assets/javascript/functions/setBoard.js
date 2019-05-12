import Character from "../classes/Character.js";

export default function setBoard() {
  this.counter = 0;
  this.combatants = [];
  if ($("#character-pen").hasClass("billboard")) {
    $("#character-pen").removeClass("billboard");
  }
  $("#combatant-area").show();
  $("#champion-box").show();
  $("#defender").show();

  for (let i = 0; i < this.dudes.length; i++) {
    var x = new Character();
    x.attackPower = this.d6(3);
    x.hp = this.d6(17);
    x.counterPower = this.d6(6) - this.d6(1);
    x.icon = this.images[i];
    x.name = this.dudes[i];
    this.combatants.push(x);

    var card = $(
      "<div class = 'hero-card' id='hero-card' " + this.combatants[i].name + ">"
    );
    card.attr("combatant-index", i);
    card.data(this.combatants[i]);
    var img = $(
      "<img src='" +
        this.combatants[i].icon +
        "' alt = 'image of '" +
        this.combatants[i].name +
        ">"
    );
    var textBox = $("<div class = 'hero-text' >");
    var details = $(
      "<h2><b>" +
        this.combatants[i].name +
        "</b></h2><p id = 'hp' >Health: " +
        this.combatants[i].hp +
        "</p><p id = 'attack-power' >Attack Power: " +
        this.combatants[i].attackPower +
        "</p><p>Counter Attack Power: " +
        this.combatants[i].counterPower +
        "</p>"
    );
    details.data("stats", {
      name: this.combatants[i].name,
      hp: this.combatants[i].hp,
      attack: this.combatants[i].attackPower,
      counter: this.combatants[i].counterPower
    });
    textBox.append(details);
    card.append(img, textBox);

    $("#characterPen").append(card);
  }
  this.moveCard();
}

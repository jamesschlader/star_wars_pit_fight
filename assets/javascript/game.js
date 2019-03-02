//Star Wars Pit Fight Object Game
//Main object: starWars

$(document).ready(function() {
  var Character = function Character() {
    let name = "";
    let hp = 0;
    let attackPower = 0;
    let counterPower = 0;
    let icon = "";
    this.attack = function attack(style) {
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
    };

    this.takeDamage = function takeDamage(number) {
      this.hp = this.hp - number;
      return this.hp < 1 ? true : false;
    };
  }; //end character object

  var pitFight = {
    //Beginning of the game object
    combatants: [],
    dudes: [
      "Leia",
      "Luke",
      "Darth Vader",
      "Han Solo",
      "The Emperor",
      "Obi Wan Kenobi",
      "Yoda",
      "Chewbacca",
      "Kylo Ren",
      "Boba Fett",
      "Snoke",
      "General Grievous",
      "Darth Maul"
    ],
    images: [
      "./assets/images/images/leia edit.jpg",
      "./assets/images/images/luke edit.jpg",
      "./assets/images/images/darth vader edit.jpg",
      "./assets/images/images/han solo edit.jpg",
      "./assets/images/images/palpatine edit.jpg",
      "./assets/images/images/obi wan edit.jpg",
      "./assets/images/images/yoda edit.jpg",
      "./assets/images/images/chewbacca edit.jpg",
      "./assets/images/images/kylo ren edit.jpg",
      "./assets/images/images/boba fett edit.jpg",
      "./assets/images/images/snoke edit.jpg",
      "./assets/images/images/grievous edit.jpg",
      "./assets/images/images/darth maul edit.jpg"
    ],
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    counter: 0,
    round: 0,
    champion: 0,
    battleStarted: false,
    defenders: [],
    album: [],

    moveCard() {
      pitFight.defenders = [];
      // pitFight.counter = 0;
      function move() {
        var x = $(this);

        if (pitFight.counter < 1) {
          $("#champion").append(x);
          pitFight.champion = x;
          pitFight.counter++;
        } else if (pitFight.counter < 4) {
          $("#defender").append(x);
          pitFight.defenders.push(x);
          $(".hero-card").off("click", ".hero-card");
          pitFight.counter++;
          console.log(`pitFight.counter = ${pitFight.counter}`);

          pitFight.counter === 4
            ? $("#defender-message").empty()
            : $("#defender-message")
                .empty()
                .append("<p>")
                .append(`Please select ${4 - pitFight.counter} defenders.`);
        }
        if (pitFight.defenders.length === 3) {
          pitFight.resolveBattle();
        }
      }
      $(".hero-card").on("click", move);
      console.log("pitFight.counter " + pitFight.counter);
    },

    resolveAttack() {
      if ($("#pit").hasClass("billboard")) {
        $("#pit").removeClass("billboard");
      }

      const x = $(
        "<button type='button'class='action-button' id='attack-button'>Attack!</button>"
      );
      //console.log("the counter is " + pitFight.counter);

      if ($("#pit").hasClass("action-button")) {
        $("#pit").remove("action-button");
        $("#pit").append(x);
      } else {
        $("#pit").append(x);
      }
      var victim = pitFight.defenders[0].attr("combatant-index");
      var defender = pitFight.combatants[victim];
      var hero = pitFight.champion.attr("combatant-index");
      var attacker = pitFight.combatants[hero];

      $("#attack-button").on("click", function() {
        //console.log(`attack round = ${pitFight.round}`);
        const attackerDamage = attacker.attackPower;
        //console.log(
        // `attacker's current round attack value is ${attackerDamage}`
        //  );
        // console.log(
        // `attacker hp = ${attacker.hp}\ndefender hp = ${defender.hp}`
        // );

        const championAttackPower = pitFight.champion.find("#attack-power");
        // console.log(`championAttackPower is ${championAttackPower}`);

        championAttackPower.removeClass("fancyLetter");
        championAttackPower.addClass("fancyLetter");
        championAttackPower.text("Attack Power: " + attackerDamage);

        const counterDmg = defender.counterPower;

        let defenderHp = pitFight.defenders[0].find("#hp");
        defenderHp.text("Health: " + defender.hp);

        let championHp = pitFight.champion.find("#hp");

        championHp.text("Health: " + attacker.hp);

        const defenderDead = defender.takeDamage(attacker.attack("attack"));

        const attackerDead = attacker.takeDamage(counterDmg);

        // console.log(
        //   `attacker dead? ${attackerDead}.\nDefender dead? ${defenderDead}`
        // );
        // console.log(
        //   `After the attack, we have:\nattacker hp = ${
        //     attacker.hp
        //   }\ndefender hp = ${defender.hp}`
        // );

        defenderHp = pitFight.defenders[0].find("#hp");
        defenderHp.text("Health: " + defender.hp);

        championHp = pitFight.champion.find("#hp");

        championHp.text("Health: " + attacker.hp);

        championAttackPower.removeClass("fancyLetter");
        championAttackPower.addClass("fancyLetter");

        championAttackPower.text("Attack Power: " + attacker.attackPower);

        if (attackerDead) {
          pitFight.champion.hide();

          pitFight.gameOver();
          // console.log("gamereset is finished after the champion died.");

          messages.billboard("loss", messages.loser);
        } else if (defenderDead) {
          pitFight.defenders[0].hide();
          pitFight.defenders.shift();

          if (pitFight.gameOver()) {
            // console.log(
            //   "defender dead inside resolveattack called the gamereset"
            // );
            messages.billboard("win", messages.winner);
          } else {
            pitFight.resolveBattle();
          }
        }
      });
    },

    resolveBattle() {
      // console.log(`round is ${pitFight.round}`);
      pitFight.round++;
      pitFight.battleStarted = true;
      //   console.log(`pitFight.battleStarted = ${pitFight.battleStarted}`);
      //   console.log(`defenders remaining = ${pitFight.defenders.length}`);
      if (pitFight.round < 2) {
        messages.billboard("battle", messages.readyBattle);
      } else {
        messages.billboard("battle", messages.readyNextBattle);
      }

      $("#pit").empty();
      $("#combatant-area").hide();
      $("#combatant-area").addClass("billboard");
      $("#champion-box").addClass("billboard");
      $("#battlefield").addClass("battlefield");
      $("#defender-box").addClass("ready-defender");
      $("#thePit").addClass("billboard");
      if (
        pitFight.defenders.length === 0 ||
        pitFight.champion === undefined ||
        pitFight.champion.hp < 0
      ) {
        return;
      }

      pitFight.champion.removeClass("hero-card", "hero-text");
      pitFight.champion.addClass("big-card", "big-card-text");
      $("#pit").append(pitFight.champion);
      const vs = $(
        "<img class = 'versus' src = './assets/images/images/versus.jpg' style='width: 100px' height='100px' display='inline-block'>"
      );
      $("#pit").append(vs);
      pitFight.defenders[0].removeClass("hero-card", "hero-text");
      pitFight.defenders[0].addClass("big-card", "big-card-text");
      $("#pit").append(pitFight.defenders[0]);
      $("#pit").hide();
      if (pitFight.resolveAttack()) {
        // console.log(`The fight ended in a death.`);
      }
    },

    d6(factor) {
      sum = 0;
      for (let j = 1; j < factor + 1; j++) {
        sum = sum + Math.floor(Math.random() * 5 + 1);
      }
      return sum;
    },

    gameOver() {
      if (
        pitFight.combatants[pitFight.champion.attr("combatant-index")].hp < 1
      ) {
        // console.log("We're in the champion loses outright condition.");

        pitFight.losses++;
        $("#losses").text("Losses: " + pitFight.losses);
        if ($("#billboard").hasClass("billboard")) {
          $("#billboard").addClass("billboard-show");
        }

        // console.log("champion loses outright called the gamereset");
        pitFight.gameReset(pitFight.defenders[0]);
      } else if (pitFight.defenders.length < 1) {
        //  console.log("We're in the champion wins condition.");

        pitFight.wins++;
        $("#wins").text("Wins: " + pitFight.wins);

        if ($("#billboard").hasClass("billboard")) {
          $("#billboard").addClass("billboard-show");
        }

        // console.log("champion wins called the gamereset");
        pitFight.gameReset(pitFight.champion);
        return true;
      }
    },

    gameReset(winner) {
      pitFight.battleStarted = false;
      pitFight.gamesPlayed++;
      pitFight.round = 0;
      if (winner) {
        const target = winner[0].innerText.slice(
          0,
          winner[0].innerText.indexOf("\n")
        );

        // console.log(`Winner is `, target);
      }

      //  console.log("games played = " + pitFight.gamesPlayed);

      $(pitFight.champion).empty();

      if ($("#combatant-area").hasClass("billboard")) {
        $("#combatant-area").removeClass("billboard");
      }
      if ($("#champion-box").hasClass("billboard")) {
        $("#champion-box").removeClass("billboard");
      }
      if ($("#battlefield").hasClass("battlefield")) {
        $("#battlefield").removeClass("battlefield");
      }
      if ($("#defender-box").hasClass("ready-defender")) {
        $("#defender-box").removeClass("ready-defender");
      }

      $("#characterPen, #billboard, #champion, #defender, #pit").empty();
      pitFight.combatants = [];
      pitFight.counter = 0;
      pitFight.rounds = 1;

      if (pitFight.gamesPlayed < 2) {
        messages.billboard("start", messages.rules);
      }

      pitFight.setBoard();
      //console.log("from gamereset, setboard has returned from duty");
    },

    setBoard() {
      pitFight.counter = 0;
      pitFight.combatants = [];
      if ($("#character-pen").hasClass("billboard")) {
        $("#character-pen").removeClass("billboard");
      }
      $("#combatant-area").show();
      $("#champion-box").show();
      $("#defender").show();
      for (let i = 0; i < pitFight.dudes.length; i++) {
        var x = new Character();
        x.attackPower = this.d6(3);
        x.hp = this.d6(17);
        x.counterPower = this.d6(6) - this.d6(1);
        x.icon = this.images[i];
        x.name = this.dudes[i];
        pitFight.combatants.push(x);

        var card = $(
          "<div class = 'hero-card' id='hero-card' " +
            pitFight.combatants[i].name +
            ">"
        );
        card.attr("combatant-index", i);
        card.data(pitFight.combatants[i]);
        var img = $(
          "<img src='" +
            pitFight.combatants[i].icon +
            "' alt = 'image of '" +
            pitFight.combatants[i].name +
            ">"
        );
        var textBox = $("<div class = 'hero-text' >");
        var details = $(
          "<h2><b>" +
            pitFight.combatants[i].name +
            "</b></h2><p id = 'hp' >Health: " +
            pitFight.combatants[i].hp +
            "</p><p id = 'attack-power' >Attack Power: " +
            pitFight.combatants[i].attackPower +
            "</p><p>Counter Attack Power: " +
            pitFight.combatants[i].counterPower +
            "</p>"
        );
        details.data("stats", {
          name: pitFight.combatants[i].name,
          hp: pitFight.combatants[i].hp,
          attack: pitFight.combatants[i].attackPower,
          counter: pitFight.combatants[i].counterPower
        });
        textBox.append(details);
        card.append(img, textBox);
        //render the cards to the characterPen
        $("#characterPen").append(card);
      }
      if (pitFight.gamesPlayed > 1) {
        // console.log("games played: " + pitFight.gamesPlayed);
      }

      pitFight.moveCard();
    }
  }; //end pitFight game object

  var messages = {
    //Begin messages object
    rules:
      "Choose your champion by double-clicking on the card. After you have chosen your champion, choose three defenders by double-clicking on their cards. <br> Choose wisely. <br> During each round, the Champion attacks the first Defender in the group. The Defender responds with a Counter Attack. If either are reduced below 0 HP, they die. However, with each susequent round, the Champion's Attack Power doubles while the Defender's Counter Attack Power stays the same. <br>You win the game only if your champion survives all the counter attacks from the Defenders while eliminating all of them.",
    readyBattle: "Are you ready to start the battle?",
    readyNextBattle: "Are you ready for the next defender?",
    gameOver: "Game over!",
    restart: "Would you like another game?",
    winner: "You won the game!",
    loser: "You lost the game.",

    billboard(condition, message) {
      let newMessage = "";

      switch (condition) {
        case "win":
        case "loss":
          newMessage = messages.gameOver.concat("\n", message);
          newMessage = newMessage.concat("\n", messages.restart);

          break;

        default:
          newMessage = message;
      }

      $("#billboard").empty();
      var announcement = $("#billboard");
      announcement.append($("<h3 id='text'>"));
      $("#text").append(newMessage);

      announcement.addClass("billboard-show");
      var x = $(
        "<button type ='button'class ='action-button' id = 'ready-button'></button"
      );
      x.text("Ready");
      announcement.append(x);
      announcement.show();

      x.on("click", function() {
        announcement.hide();
        $("#pit").show();

        return true;
      });
    }
  }; //end messages object

  pitFight.gameReset();
}); //end of ready function call

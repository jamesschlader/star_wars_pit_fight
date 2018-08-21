//Star Wars Pit Fight Object Game
//Main object: starWars

$(document).ready(function() {    

    var Character = function Character() {
        name = "";
        hp= 0;
        attackPower = 0;
        counterPower = 0;
        icon = "";
        
        this.attack = function attack(style) { 
            //If attacker is champion, then use attackPower. 
    
            if (style === "attack") {//Send attackDamage. 
                console.log("The champion strikes!");
                console.log("Attack power = " + this.attackPower );
                if (pitFight.round === 1) {
                    return this.attackPower;
                } else {           
                this.attackPower = this.attackPower * 2;
                console.log("The attack power now is: " + this.attackPower);
                return this.attackPower;
                }       
            if (style === "counter") {//Otherwise, counterPower.
                console.log("The defender strikes back!");
                return this.counterPower;
            } 
        }   
        };
    
        this.takeDamage = function takeDamage(number) {
            console.log(this + " taking damage!");
            this.hp = this.hp - number;
            console.log(this + " has " + this.hp + " hp left."); 
            if (this.hp < 1) {
                return true;
            } else {
                return false;
            }
        }
        
    }; //end character object
    
    var pitFight = {
    combatants: [],
    dudes: ["Leia", "Luke", "Darth Vader", "Han Solo", "The Emperor", "Obi Wan Kenobi", "Yoda", "Chewbacca", "Kylo Ren","Boba Fett","Snoke","General Grievous"],
    images: ['./assets/images/images/leia.jpg', './assets/images/images/luke edit.jpg','./assets/images/images/darth vader edit.jpg', './assets/images/images/han solo edit.jpg', './assets/images/images/palpatine edit.jpg', './assets/images/images/obi wan edit.jpg', './assets/images/images/yoda.jpg', './assets/images/images/chewbacca edit.jpg', './assets/images/images/kylo ren edit.jpg', './assets/images/images/boba fett edit.jpg', './assets/images/images/snoke edit.jpg', './assets/images/images/grievous edit.jpg'],
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    counter: 0,
    round: 1,
    
    defenders: [],
    
    moveCard() {
      
        function move() {
            var x = $(this);
            console.log(console.dir(x));
            
            if (pitFight.counter < 1) {
                $("#champion").append(x);
                pitFight.champion = x;
                pitFight.counter++;
            } else if (pitFight.counter < 4) {
                $("#defender").append(x);
                pitFight.defenders.push(x);
                console.log("pitFight defenders length = " + pitFight.defenders.length);
                pitFight.counter++        
            };
            
            if (pitFight.defenders.length === 3) {
                messages.billboard(messages.readyBattle);
                    if (messages.billboard) {
                     pitFight.resolveBattle();
                }
            }
    
        }
            $(".hero-card").on("dblclick", move);
            $(".hero-card").off("dblclick", ".hero-card");
        console.log("dbl-click listener off");
        console.log(pitFight.defenders.length);
        
    },
    
    resolveAttack() {
        var x = $("<button type='button'class='action-button' id='attack-button'>Attack!</button>");
       
        if (pitFight.counter === 4) {
            
            $("#pit").prepend(x);   
        }
    
        var victim = pitFight.defenders[0].attr("combatant-index");
        console.log("this is the victim number which is supposed to help decide who the defender is: " + victim);
        var defender = pitFight.combatants[victim]; 
        var hero = pitFight.champion.attr("combatant-index");
        var attacker = pitFight.combatants[hero];
        console.log("our hero is " + console.dir(attacker));
        console.log("our hero's name is " + attacker.name);
        console.log("The defender is " + defender.name);
        console.log("The defender's card: " + console.dir(defender));
    
        $("#attack-button").on("click", function(){
            console.log("It's an attack!")
            var damage = attacker.attackPower;
            console.log("damage from attacker = " + damage);
            var counterDmg = defender.counterPower;
            console.log("counter attack damage = " + counterDmg);
            console.log("The defender's stat sheet: " + console.dir(defender));
            var defenderDead = defender.takeDamage(damage);
            console.log("is the defender dead? " + console.dir(defender.takeDamage(damage)) );
           console.log("The defender's card info, I hope: " + console.dir(pitFight.defenders[0]));
           console.log("The defender's new hp: " + defender.hp);
           var defenderHp = pitFight.defenders[0].find("#hp");
           defenderHp.text(defender.hp);

            if (defenderDead) {
                
                pitFight.defenders.shift();
                $("#defender-area").append(pitFight.defenders[0]);
                pitFight.round++;
                pitFight.gameOver();
            }
            console.log("counter attack!");
            var attackerDead = attacker.takeDamage(counterDmg);
            var championHp = pitFight.champion.find("#hp");
           championHp.text(champion.hp);
            if (attackerDead) {
            console.log("Champion is dead!");
            }
            pitFight.gameOver();
        });  
         
    },
    
    resolveBattle () {
       
    $("#pit").append(pitFight.champion);
    
    var vs = $("<img class = 'versus' src = './assets/images/images/versus.jpg' style='width: 100px' height='100px'>")
    $("#pit").append(vs);
    
    $("#pit").append(pitFight.defenders[0]);
    
    pitFight.resolveAttack();
    
    },
    
    d6(factor) {
        sum = 0;
        for (j = 1; j < (factor + 1); j++) {
            sum = sum + (Math.floor((Math.random() * 5) + 1));
        }
        return sum;
    },
    
    gameOver() {
    if (pitFight.champion.hp < 1) {
        pitFight.wins++;
        messages.billboard(messages.gameOver);
        pitFight.gamesPlayed++;
        pitFight.gameReset();
    } else if (pitFight.defenders.length < 1) {
        pitFight.losses++;
        messages.billboard(messages.gameOver);
        pitFight.gamesPlayed++;
        pitFight.gameReset();
    } 
        
    
    },
    
    gameReset() {
        $("#characterPen", "#champion", "#defender", "#pit").empty();
        pitFight.combatants.splice(0,pitFight.combatants.length);
        pitFight.champion = "";
        pitFight.counter = 0;
        pitFight.rounds = 1;
        pitFight.setBoard();
    },
    
    setBoard() {
        pitFight.combatants = [];
        
        //create character objects to fill in the combatants array
        for (i = 0; i < pitFight.dudes.length; i++) {
            var x = new Character();
            x.attackPower = this.d6(3);
            x.hp = this.d6(17);
            x.counterPower = pitFight.d6(6);
            x.icon = this.images[i];
            x.name = this.dudes[i];
            this.combatants.push(x);
           //attach each character to a card
            var card = $("<div class = 'hero-card' id=" + pitFight.combatants[i].name + ">");
            card.attr("combatant-index", i);
            card.data(pitFight.combatants[i]);
            var img = $("<img src='" + pitFight.combatants[i].icon + "' alt = 'image of '" + pitFight.combatants[i].name + ">");
            var textBox = $("<div class = 'hero-text' >");
            var details = $("<h2><b>" + pitFight.combatants[i].name + "</b></h2><p id = 'hp' >Health: " + pitFight.combatants[i].hp + "</p><p>Attack Power: " + pitFight.combatants[i].attackPower + "</p><p>Counter Attack Power: " + pitFight.combatants[i].counterPower + "</p>");
            details.data("stats", {name: pitFight.combatants[i].name, hp: pitFight.combatants[i].hp, attack: pitFight.combatants[i].attackPower, counter: pitFight.combatants[i].counterPower});
            textBox.append(details);
            card.append(img, textBox);      
            
        //render the cards to the characterPen
        $("#characterPen").append(card);
     }//end main for loop
    
    }
    
    } //end pitFight object
    
    
    var messages = {
        rules: 'Choose your champion by double-clicking on the card. After you have chosen your champion, choose three defenders by double-clicking on their cards.',
        readyBattle: 'During each round, the Champion attacks the first Defender in the group. The Defender responds with a Counter Attack. If either are reduced below 0 HP, they die. However, with each susequent round, the Champion\'s Attack Power doubles while the Defender\'s Counter Attack Power stays the same.\nAre you ready to start the battle?',
        gameOver: "Game over!",
    
        billboard(message) {
            $("#billboard").empty();
            var announcement = $("#billboard");
            announcement.append($("<h3 id='text'>"));
            $("#text").append(message);
          
            var x = $("<button type ='button'class ='action-button' id = 'ready-button'></button");
            x.text("Ready");
            $("#billboard").append(x);
    
            x.on("click", function(){
                announcement.hide();
                return true;
            })
        },
    
    } //end messages object
    
        messages.billboard(messages.rules);
        pitFight.setBoard();
        pitFight.moveCard();
          
        
    
    }); //end of ready function call
    
    
    
    
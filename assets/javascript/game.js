//Star Wars Pit Fight Object Game
//Main object: starWars

//$(document).ready(function() {    

    var Character = function Character() {
        name = "";
        hp= 0;
        attackPower = 0;
        counterPower = 0;
        icon = "";
        
        var attack = function attack(style) { 
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
    
        var takeDamage = function takeDamage(number) {
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
    dudes: ["Leia", "Luke", "Darth Vader", "Han Solo", "Emperor Palpatine", "Obi Wan Kebobi", "Yoda", "Chewbacca", "Kylo Ren","Boba Fett","Snoke","General Grievous"],
    images: ['./assets/images/images/leia.jpg', './assets/images/images/luke.jpg','./assets/images/images/darth vader.jpg', './assets/images/images/han solo.jpg', './assets/images/images/palpatine.jpg', './assets/images/images/obi wan.jpg', './assets/images/images/yoda.jpg', './assets/images/images/chewbacca.jpg', './assets/images/images/kylo ren.jpg', './assets/images/images/boba fett.jpg', './assets/images/images/snoke.jpg', './assets/images/images/grievous.jpg'],
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
        
        var defender = pitFight.combatants[victim]; 
        var hero = pitFight.champion.attr("combatant-index");
        var attacker = pitFight.combatants[hero];
    
        $("#attack-button").on("click", function(){
            console.log("It's an attack!")
            defender.takeDamage(attacker.attack("attack"));
            pitFight.defenders[0].child("<p id = 'hp' >", defender.hp);
            if (defender.takeDamage(attacker.attack("attack"))) {
                pitFight.defenders.shift();
                $("#defender-area").append(pitFight.defenders[0]);
                pitFight.round++;
                pitFight.gameOver();
            }
            console.log("counter attack!");
            attacker.takeDamage(defender.attack("counter"));
            pitFight.champion.child("<p id = 'hp' >", attacker.hp);
            if (attacker.takeDamage(defender.attack("counter"))) {
            console.log("Champion is dead!");
            }
            pitFight.gameOver();
        });  
         
    },
    
    resolveBattle () {
       
    $("#pit").append(pitFight.champion);
    
    var vs = $("<img class = 'versus' src = './assets/images/images/versus.jpg' style='width: 200px' height='200px'>")
    $("#pit").append(vs);
    
    $("#pit").append(pitFight.defenders[0]);
    
    pitFight.resolveAttack();
    
    },
    
    d6(factor) {
        sum = 0;
        for (i = 1; i < (factor + 1); i++) {
            sum = sum + (Math.floor((Math.random() * 5) + 1));
        }
        return sum;
    },
    
    gameOver() {
    if (pitFight.champion.hp < 1) {
        pitFight.wins++;
    } else if (pitFight.defenders.length < 1) {
        pitFight.losses++;
    } else {
        messages.billboard(message.gameOver);
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
        console.log("dudes array = " + pitFight.dudes);
        console.log(console.dir(pitFight.dudes));
        console.log("dudes array length = " +pitFight.dudes.length);
        //create character objects to fill in the combatants array
        for (i = 0; i < pitFight.dudes.length; i++) {
            console.log("i = " + i);
            var x = new Character();
            console.log("This is the console.log of x: " + x);
            console.log("This is the console.log of the console.dir of x: " + console.dir(x));
            x.attackPower = this.d6(3);
            //console.log("attack power = " + pitFight.combatants[i].attackPower);
            x.hp = this.d6(17);
            x.counterPower = pitFight.d6(6);
            x.icon = this.images[i];
            x.name = this.dudes[i];
            this.combatants.push(x);
            console.log("This is the console log of the combatants array = " + console.dir(this.combatants));
            console.log("i-th index is " + i + " and the element from the combatants array at the 0th index is = " + pitFight.combatants[0]);
            console.log("i-th index is " + i + " and the element from the combatants array at the 7th index is = " + pitFight.combatants[7]);
            console.log("The name of the " + i + "th member of pitFight.combatants is " + pitFight.combatants[i].name);
            console.log("The name of the " + i + "th member of pitFight.combatants is " + pitFight.combatants[7].name);
            pitFight.combatants.forEach(dude => {
                console.log("This is the console.log of each member of dudes: " + dude);
            });
    
           //attach each character to a card
            var card = $("<div class = 'hero-card' id=" + pitFight.combatants[i].name + ">");
            card.attr("combatant-index", i);
            card.data(pitFight.combatants[i]);
            var img = $("<img src='" + pitFight.combatants[i].icon + "' alt = 'image of '" + pitFight.combatants[i].name + ">");
            var textBox = $("<div class = 'hero-text' >");
            var details = $("<h4><b>" + pitFight.combatants[i].name + "</b></h4><p id = 'hp' >Health: " + pitFight.combatants[i].hp + "</p><p>Attack Power: " + pitFight.combatants[i].attackPower + "</p><p>Counter Attack Power: " + pitFight.combatants[i].counterPower + "</p>");
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
          
        
    
    //}); //end of ready function call
    
    
    
    
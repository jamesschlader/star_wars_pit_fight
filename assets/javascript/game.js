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
                
                    pitFight.round++;
                    
                this.attackPower = this.attackPower * 2;
                 return this.attackPower;
                }       
            if (style === "counter") {//Otherwise, counterPower.
                return this.counterPower;
            } 
          
        };
    
        this.takeDamage = function takeDamage(number) {
            this.hp = this.hp - number;
            if (this.hp < 1) {
                return true;
            } else {
                return false;
            }
        }
    }; //end character object
    
    var pitFight = { //Beginnine of the game object
    combatants: [],
    dudes: ["Leia", "Luke", "Darth Vader", "Han Solo", "The Emperor", "Obi Wan Kenobi", "Yoda", "Chewbacca", "Kylo Ren","Boba Fett","Snoke","General Grievous","Darth Maul"],
    images: ['./assets/images/images/leia edit.jpg', './assets/images/images/luke edit.jpg','./assets/images/images/darth vader edit.jpg', './assets/images/images/han solo edit.jpg', './assets/images/images/palpatine edit.jpg', './assets/images/images/obi wan edit.jpg', './assets/images/images/yoda edit.jpg', './assets/images/images/chewbacca edit.jpg', './assets/images/images/kylo ren edit.jpg', './assets/images/images/boba fett edit.jpg', './assets/images/images/snoke edit.jpg', './assets/images/images/grievous edit.jpg', './assets/images/images/darth maul edit.jpg'],
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    counter: 0,
    round: 1,
    champion: 0,
    defenders: [],
    album: [],
    
    moveCard() {
        function move() {
            var x = $(this);

            if (pitFight.counter < 1) {
                $("#champion").append(x);
                pitFight.champion = x;
                pitFight.counter++;
            } else if (pitFight.counter < 4) {
                $("#defender").append(x);
                pitFight.defenders.push(x);
                $(".hero-card").off("dblclick", ".hero-card");
                pitFight.counter++   
                if (pitFight.defenders.length === 3) { 
                    pitFight.resolveBattle(); 
                }
            }  
        }
            $(".hero-card").on("dblclick", move);
    },
    
    resolveAttack() {
        var x = $("<button type='button'class='action-button' id='attack-button'>Attack!</button>");
        if (pitFight.counter === 4) { 
            $("#pit").append(x);   
        }
        var victim = pitFight.defenders[0].attr("combatant-index");
        var defender = pitFight.combatants[victim]; 
        var hero = pitFight.champion.attr("combatant-index");
        var attacker = pitFight.combatants[hero];
        $("#attack-button").on("click", function(){
            var damage = attacker.attack("attack");
            var championAttackPower = pitFight.champion.find("#attack-power");
            championAttackPower.addClass("fancyLetter");
            championAttackPower.text("Attack Power: " + damage);
            var counterDmg = defender.counterPower;
            var defenderDead = defender.takeDamage(damage);
            var defenderHp = pitFight.defenders[0].find("#hp");
            defenderHp.text("Health: " + defender.hp);
            if (defenderDead) {
                pitFight.defenders[0].hide();
                pitFight.defenders.shift();
                pitFight.gameOver();
                if (pitFight.gameOver()) {
                    console.log("defender dead inside resolveattack called the gamereset");
                    pitFight.gameReset();
                };
                pitFight.resolveBattle();
                pitFight.round++;
                
            } 
            var championDead = attacker.takeDamage(counterDmg);
            var championHp = pitFight.champion.find("#hp");
            championHp.text("Health: " + attacker.hp);
            if (championDead) {
            pitFight.champion.hide();
            pitFight.gameOver();
            if (pitFight.gameOver()) {
                console.log("champion dead inside resolveattack called the gamereset");
                pitFight.gameReset();
            };
            } 
        });   
        return true;
    },
    
    resolveBattle () {
        
        messages.billboard(messages.readyBattle);
        $("#pit").empty();
        $("#combatant-area").hide();
        $("#combatant-area").addClass("billboard");
        $("#champion-box").addClass("billboard");
        $("#battlefield").addClass("battlefield");
        $("#defender-box").addClass("ready-defender");
        
        if ((pitFight.defenders.length === 0) || (pitFight.champion === undefined) || (pitFight.champion.hp < 0)) {
            return;
        }
       
        (pitFight.champion).removeClass("hero-card", "hero-text");
        (pitFight.champion).addClass("big-card", "big-card-text");
        $("#pit").append(pitFight.champion);

        

        var vs = $("<img class = 'versus' src = './assets/images/images/versus.jpg' style='width: 100px' height='100px' display='inline-block'>")
        $("#pit").append(vs);
        (pitFight.defenders[0]).removeClass("hero-card", "hero-text");
        (pitFight.defenders[0]).addClass("big-card", "big-card-text");
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
    if (pitFight.combatants[pitFight.champion.attr("combatant-index")].hp < 1) {
        console.log("We're in the champion loses outright condition.");

        pitFight.losses++;
        $("#losses").text("Losses: " + pitFight.losses);
        messages.billboard(messages.gameOver);
        pitFight.gamesPlayed++;
        console.log("champion loses outright called the gamereset");
        pitFight.gameReset();
        return true;

    } else if (pitFight.defenders.length < 1)  {
        console.log("We're in the champion wins condition.");

        pitFight.wins++;
        $("#wins").text("Wins: " + pitFight.wins);
        messages.billboard(messages.gameOver);
        pitFight.gamesPlayed++;
        console.log("champion wins called the gamereset");
        pitFight.gameReset();
        return true;

    } else if ((pitFight.combatants[pitFight.champion.attr("combatant-index")].hp < 1) && (pitFight.defenders.length < 1)) {
        console.log("We're in the champion loses by default condition.");

        pitFight.losses++;
        $("#losses").text("Losses: " + pitFight.losses);
        messages.billboard(messages.gameOver);
        pitFight.gamesPlayed++;
        console.log("champion loses by default called the gamereset");
        pitFight.gameReset();
        return true;
    }
    },
    
    gameReset() {
        
    console.log("Somebody called the game reset");

        

       

        $("#characterPen, #billboard, #champion, #defender, #pit").empty();
        pitFight.combatants = [];
        console.log("from gamereset, combatants: " + console.dir(pitFight.combatants));
        //pitFight.champion = "";
        pitFight.counter = 0;
        pitFight.rounds = 1;
        
        //messages.billboard(messages.restart);

        if (pitFight.gamesPlayed < 1) {
            messages.billboard(messages.rules);
        };

        pitFight.setBoard();
        console.log("from gamereset, setboard has returned from duty");
       
       
           //console.log("from gamereset, billboard is done " + messages.billboard(messages.restart));
        
        
        //pitFight.moveCard();
       // console.log("from gamereset, movecard has returned from duty");
        
    },

    setBoard() {
        
        pitFight.combatants = [];
        if ($("#character-pen").hasClass("billboard")) {
            $("#character-pen").removeClass("billboard");
        }

        $("#combatant-area").show();
        $("#champion-box").show();
        $("#defender").show();
        for (i = 0; i < pitFight.dudes.length; i++) {
            var x = new Character();
            x.attackPower = this.d6(3);
            x.hp = this.d6(17);
            x.counterPower = this.d6(6);
            x.icon = this.images[i];
            x.name = this.dudes[i];
            pitFight.combatants.push(x);
            
            var card = $("<div class = 'hero-card' id='hero-card' " + pitFight.combatants[i].name + ">");
            card.attr("combatant-index", i);
            card.data(pitFight.combatants[i]);
            var img = $("<img src='" + pitFight.combatants[i].icon + "' alt = 'image of '" + pitFight.combatants[i].name + ">");
            var textBox = $("<div class = 'hero-text' >");
            var details = $("<h2><b>" + pitFight.combatants[i].name + "</b></h2><p id = 'hp' >Health: " + pitFight.combatants[i].hp + "</p><p id = 'attack-power' >Attack Power: " + pitFight.combatants[i].attackPower + "</p><p>Counter Attack Power: " + pitFight.combatants[i].counterPower + "</p>");
            details.data("stats", {name: pitFight.combatants[i].name, hp: pitFight.combatants[i].hp, attack: pitFight.combatants[i].attackPower, counter: pitFight.combatants[i].counterPower});
            textBox.append(details);
            card.append(img, textBox);  
            //render the cards to the characterPen
            $("#characterPen").append(card);
     }
     pitFight.moveCard();
    }

    } //end pitFight game object
    
    var messages = { //Begin messages object
        rules: 'Choose your champion by double-clicking on the card. After you have chosen your champion, choose three defenders by double-clicking on their cards. <br> Choose wisely. <br> During each round, the Champion attacks the first Defender in the group. The Defender responds with a Counter Attack. If either are reduced below 0 HP, they die. However, with each susequent round, the Champion\'s Attack Power doubles while the Defender\'s Counter Attack Power stays the same. ',
        readyBattle: 'Are you ready to start the battle?',
        gameOver: 'Game over!',
        restart: 'Would you like another game?',
    
        billboard(message) {
            $("#billboard").empty();
            var announcement = $("#billboard");
            announcement.append($("<h3 id='text'>"));
            $("#text").append(message);
            announcement.addClass("billboard-show");
            var x = $("<button type ='button'class ='action-button' id = 'ready-button'></button");
            x.text("Ready");
            $("#billboard").append(x);
            $("#billboard").show();
            x.on("click", function(){
                announcement.hide();
                return true;
            })
            return false;
        },
    } //end messages object
        //The game initializes here.
       // messages.billboard(messages.rules);
       // pitFight.setBoard();
        //pitFight.moveCard();

        pitFight.gameReset();
          
    }); //end of ready function call
    
    
    
    
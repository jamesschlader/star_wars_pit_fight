export default function move(card, pitFight) {
  var x = $(card.currentTarget);

  if (pitFight.counter < 1) {
    $("#champion").append(x);
    pitFight.champion = x;
    pitFight.counter++;
  } else if (pitFight.counter < 4) {
    $("#defender").append(x);
    pitFight.defenders.push(x);
    $(".hero-card").off("click", ".hero-card");
    pitFight.counter++;
    pitFight.counter === 4
      ? $("#defender-message").empty()
      : $("#defender-message")
          .empty()
          .append("<p>")
          .append(`Please select ${4 - pitFight.counter} defenders.`);
    if (pitFight.defenders.length === 3) {
      pitFight.resolveBattle();
    }
  }
}

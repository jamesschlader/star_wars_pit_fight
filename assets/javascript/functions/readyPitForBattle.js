export default function readyPitForBattle(pitFight) {
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
}

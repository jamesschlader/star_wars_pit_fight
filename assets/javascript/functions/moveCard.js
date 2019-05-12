import move from "../functions/move.js";

export default function moveCard() {
  const pitFight = this;
  pitFight.defenders = [];

  $(".hero-card").on("click", x => {
    move(x, pitFight);
  });
}

export default function prepareBoard() {
  if ($("#pit").hasClass("billboard")) {
    $("#pit").removeClass("billboard");
  }

  const x = $(
    "<button type='button'class='action-button' id='attack-button'>Attack!</button>"
  );

  if ($("#pit").hasClass("action-button")) {
    $("#pit").remove("action-button");
    $("#pit").append(x);
  } else {
    $("#pit").append(x);
  }
}

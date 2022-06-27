"use strict";

import elements from "./elements.js";

const initCanvas = () => {
  //Dekl & Init der Variablen
  const elCanvas = document.querySelector(".canvas");
  const ctx = elCanvas.getContext("2d");

  const point = {
    x: 0,
    y: 0,
    color: "red",
  };

  let endOfHorizontal = true;
  let endOfVertical = true;

  //Groeße des Canvas berechnen, damit dieses sich auch dynamisch an die Websitegroesse anpassen kann
  const frameCalc = () => {
    elCanvas.width = getComputedStyle(elements.elBombDisplay).width.substr(
      0,
      getComputedStyle(elements.elBombDisplay).width.length - 2
    );
    elCanvas.height = getComputedStyle(elements.elBombDisplay).height.substr(
      0,
      getComputedStyle(elements.elBombDisplay).width.length - 2
    );
  };

  //Der neue Teilabschnitt des Canvas wird gezeichnet
  const drawPoint = () => {
    ctx.strokeStyle = point.color;
    ctx.lineWidth = "10";
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    ctx.closePath();
  };

  //Logic fuer das Canvas. Hier wird der neue Punkt angesteuert und dann zum Zeichnen an drawPoint uebergeben
  const draw = () => {
    if (point.x < elCanvas.width && endOfHorizontal) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      point.x++;
      drawPoint();

      if (point.x == elCanvas.width) endOfHorizontal = false;
    } else if (point.y < elCanvas.height && endOfVertical) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      point.y++;
      drawPoint();

      if (point.y == elCanvas.height) endOfVertical = false;
    } else if (elCanvas.width >= point.x && point.x >= 1) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      point.x--;
      drawPoint();
    } else if (elCanvas.height >= point.y && point.y >= 1) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      point.y--;
      drawPoint();

      //Wenn der Farbverlauf wieder in der linken oberen Ecke (also am Startpunkt) angekommen ist
      //aendert sich die Farbe
      if (point.y == 0 && point.x == 0) {
        endOfHorizontal = true;
        endOfVertical = true;

        if (point.color == "red") point.color = "yellow";
        else if (point.color == "yellow") point.color = "red";
      }
    }
  };

  //Alle 10 Millisekunden wird das Canvas gezeichnet
  let drawInterval = setInterval(draw, 10);

  //Das Canvas wird basierend auf der Browsergroesse gezeichnet. Bei Veraenderung der Groesse wird das Canvas neu berechnet
  frameCalc();
  window.addEventListener("resize", () => {
    clearInterval(drawInterval);
    point.x = 0;
    point.y = 0;
    point.color = "red";
    frameCalc();
  });
};

export default initCanvas;

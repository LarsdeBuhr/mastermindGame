"use strict";

import elements from "./elements.js";

//Dekl & Init der Variablen
let batteryPower = 100;
let countdown;

//Die Batterie verliert kontinuierlich Energie
const countDown = () => {
  batteryPower--;
  elements.elBatteryPower.innerText = `${batteryPower}%`;
  if (batteryPower == 0) {
    //Wenn die Batterie auf Null gelaufen ist, ist das Spiel verloren und der Game Over Bildschirm wird angezeigt
    clearInterval(countdown);
    elements.elGameOver.classList.remove("endeHidden");
    setTimeout(
      () => elements.elGameOverLastSentence.classList.toggle("gameOverVisible"),
      3000
    );
  }
};

//Batterie kann aufgeladen werden solange noch etwas Restenergie vorhanden ist. Also batteryPower > 0
//Der Maximale Stand ist 100% und kann nicht überschritten werden
const countUp = () => {
  if (batteryPower < 100 && batteryPower > 0) {
    batteryPower++;
    elements.elBatteryPower.innerText = `${batteryPower}%`;
  }
};

//Jede Sekunde wird die Batterie einen Prozentpunkt heruntergezählt
const battery = () => {
  countdown = setInterval(countDown, 1000);
  elements.elEnergyBtn.addEventListener("click", countUp);
};

export default battery;
export { batteryPower, countdown };

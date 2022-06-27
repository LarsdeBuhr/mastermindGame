"use strict";

import elements from "./elements.js";
import battery, { batteryPower, countdown } from "./battery.js";

//Dekl & Init
//Variablen zum einfachen Anpassen der Bedingungen
//Kombination hat vier Ziffern
const sizeOfCombination = 4;
//Die erlaubten Ziffern liegen zwischen null und neun
const minNumOfCombination = 0;
const maxNumOfCombination = 9;
//Die geheime Kombination, die der User erraten muss
let secretCombination;

let bombIsActive = true;

//Eingabefelder dekl. & init.
let inputNum1 = false;
let inputNum2 = false;
let inputNum3 = false;
let inputNum4 = false;

//Eingabe des Users
let currentUserNumber = [];

//Ermitteln einer zufälligen Nummer
const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

//Für eine neue Spielrunde eine neue geheime Nummer erzeugen
const createSecretNumber = () => {
  //Erstellen der Zufallszahlen
  secretCombination = [...new Array(sizeOfCombination)].map(() =>
    createNumber(minNumOfCombination, maxNumOfCombination)
  );
};

//Checken ob eine einstellige Zahl eingegeben wurde
let checkInput1 = () => {
  elements.elInputField1.value.length == 1 &&
  !isNaN(elements.elInputField1.value)
    ? (inputNum1 = true)
    : (inputNum1 = false);
};
let checkInput2 = () => {
  elements.elInputField2.value.length == 1 &&
  !isNaN(elements.elInputField2.value)
    ? (inputNum2 = true)
    : (inputNum2 = false);
};
let checkInput3 = () => {
  elements.elInputField3.value.length == 1 &&
  !isNaN(elements.elInputField3.value)
    ? (inputNum3 = true)
    : (inputNum3 = false);
};
let checkInput4 = () => {
  elements.elInputField4.value.length == 1 &&
  !isNaN(elements.elInputField4.value)
    ? (inputNum4 = true)
    : (inputNum4 = false);
};

//Zahlenkombination in Liste eintragen
const writeInList = () => {
  let newNotice = document.createElement("p");
  newNotice.innerText = `${elements.elInputField1.value} - ${elements.elInputField2.value} - ${elements.elInputField3.value} - ${elements.elInputField4.value}`;
  elements.elPNotices.append(newNotice);

  currentUserNumber[0] = Number(elements.elInputField1.value);
  currentUserNumber[1] = Number(elements.elInputField2.value);
  currentUserNumber[2] = Number(elements.elInputField3.value);
  currentUserNumber[3] = Number(elements.elInputField4.value);
};

//Input-Felder leeren
const clearInputFields = () => {
  elements.elInputField1.value = "";
  elements.elInputField2.value = "";
  elements.elInputField3.value = "";
  elements.elInputField4.value = "";
};

//Aktuelle Eingabewerte der Inputs vermischen um keine Rückschlüsse auf die LEDs zu geben
const shuffle = (data) => {
  data.forEach((el, i) => {
    let z = createNumber(0, data.length - 1);
    // Werte mittels Destructuring austauschen
    [data[i], data[z]] = [data[z], data[i]];
  });
  return data;
};

//LEDs zeigen an ob Zahlen korrekt waren
const checkLEDs = () => {
  let colorArray = [];

  for (let i = 0; i < currentUserNumber.length; i++) {
    if (secretCombination[i] == currentUserNumber[i]) colorArray.push("green");
    else if (
      secretCombination[i] != currentUserNumber[i] &&
      secretCombination.includes(currentUserNumber[i])
    )
      colorArray.push("yellow");
    else if (!secretCombination.includes(currentUserNumber[i]))
      colorArray.push("red");
  }

  let winSet = [...new Set(colorArray)];
  if (winSet.length == 1 && winSet[0] == "green") {
    elements.elBatteryPower.innerText = "defused";
    clearInterval(countdown);
    bombIsActive = false;
  }

  //Array durchmischen, damit die LEDs nicht die Position der Zahöen verraten
  let shuffeledColorArray = shuffle(colorArray);
  elements.elLED1.classList.add(shuffeledColorArray[0]);
  elements.elLED2.classList.add(shuffeledColorArray[1]);
  elements.elLED3.classList.add(shuffeledColorArray[2]);
  elements.elLED4.classList.add(shuffeledColorArray[3]);
};

//Alle LEDs von ihren Farbklassen befreien
const deleteColorClasses = () => {
  elements.elLED1.classList.remove("red", "green", "yellow");
  elements.elLED2.classList.remove("red", "green", "yellow");
  elements.elLED3.classList.remove("red", "green", "yellow");
  elements.elLED4.classList.remove("red", "green", "yellow");
};

//Solange die Bombe noch aktiv ist kann eine weitere Kombination eingegeben werden
const defuseTry = () => {
  if (inputNum1 && inputNum2 && inputNum3 && inputNum4 && bombIsActive) {
    deleteColorClasses();
    writeInList();
    clearInputFields();
    checkLEDs();
  }
};

//Eventlistener für jedes Inputfeld erstellen. Dieser wird nach jedem Input ausgefuehrt und prueft den Input
const initSecretNo = () => {
  createSecretNumber();
  elements.elInputField1.addEventListener("input", checkInput1);
  elements.elInputField2.addEventListener("input", checkInput2);
  elements.elInputField3.addEventListener("input", checkInput3);
  elements.elInputField4.addEventListener("input", checkInput4);

  elements.elInputFieldBtn.addEventListener("click", defuseTry);
};

export default initSecretNo;
export { secretCombination };

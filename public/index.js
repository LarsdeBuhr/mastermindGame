"use strict";

import battery from "./battery.js";
import initChat from "./chat.js";
import initSecretNo from "./secretCode.js";
import initCanvas from "./canvas.js";

//Von hier wird das komplette Programm gestartet und die Aufgaben an die Unterdateien verteilt
const init = () => {
  battery();
  initSecretNo();
  initChat();
  initCanvas();
};

init();

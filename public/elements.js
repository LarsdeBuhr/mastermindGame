"use strict";

/**
 * Hier werden die Elemente aus der HTML Datei für JS zugänglich gemacht, sodass
 * später auf diese im Programm zugegriffen werden kann.
 * Alle Elemente werden in dem Objekt "elements" gespeichert
 */

const elements = {};

//Chat
elements.elChatOutput = document.querySelector(".chatOutput");
elements.elChatOutputPrivate = document.querySelector(".chatOutputPrivate");
elements.elChatOutputPublic = document.querySelector(".chatOutputPublic");
elements.elChatInput = document.querySelector(".chatInputDiv input");
elements.elChatBtn = document.querySelector(".chatInputDiv button");
elements.elEmail1 = document.querySelector(".mail1");
elements.elEmail2 = document.querySelector(".mail2");
elements.elEmailText1 = document.querySelector(".mail1 p");
elements.elEmailText2 = document.querySelector(".mail2 p");
elements.elBtnPublicChat = document.querySelector(".publicBtn");
elements.elBtnPrivateChat = document.querySelector(".privateBtn");
elements.elBtnHome = document.querySelector(".homeBtn");
elements.elBtnChat = document.querySelector(".chatBtn");
elements.elTime = document.querySelector(".time");
elements.elHomeScreen = document.querySelector(".homeScreen");

//Bomb
//Display
elements.elBombDisplay = document.querySelector(".bombDisplay");
elements.elEnergyBtn = document.querySelector(".energyBtn");
elements.elBatteryPower = document.querySelector(".batteryPower");
//LEDs
elements.elLEDs = [...document.querySelectorAll(".led")];
elements.elLED1 = document.querySelector(".led1");
elements.elLED2 = document.querySelector(".led2");
elements.elLED3 = document.querySelector(".led3");
elements.elLED4 = document.querySelector(".led4");
//Input Fields
elements.elInputFields = [...document.querySelectorAll(".input")];
elements.elInputField1 = document.querySelector(".input1");
elements.elInputField2 = document.querySelector(".input2");
elements.elInputField3 = document.querySelector(".input3");
elements.elInputField4 = document.querySelector(".input4");
elements.elInputFieldBtn = document.querySelector(".enterBtn");

//Notices
elements.elPNotices = document.querySelector(".pNotices");

//Game Over
elements.elGameOver = document.querySelector(".end");
elements.elGameOverLastSentence = document.querySelector(
  ".gameOverLastSentence"
);

export default elements;

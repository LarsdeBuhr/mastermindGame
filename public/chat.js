"use strict";

import elements from "./elements.js";
import { secretCombination } from "./secretCode.js";

//Funktion um eine Zufallszahl zu erzeugen
const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

//Mit socket verbinden
let socket = io.connect();

//Nachricht vom User an den Server schicken
//Es wird mitgegeben ob die Nachricht aus dem Public oder Private Chat gekommen ist
const handleChange = () => {
  socket.emit("msgFromClient", {
    chatMsg: elements.elChatInput.value,
    chatroom: chatRoomIsPublic,
  });
  elements.elChatInput.value = "";
};

//Nachricht vom Server empfangen
socket.on("msgFromServer", (data) => {
  let newChatMessage = document.createElement("p");
  newChatMessage.innerText = data.chatMsg;
  newChatMessage.classList.add("eigeneMsg");
  if (data.chatroom) elements.elChatOutputPrivate.append(newChatMessage);
  if (socket.id == data.senderID && !data.chatroom)
    elements.elChatOutputPublic.append(newChatMessage);

  //Wenn Chatroom nicht public ist dann soll der Chatbot durch Iteration über chatData.json durchgeführt werden
  if (socket.id == data.senderID && !data.chatroom) {
    fetch("./chatData.json")
      .then((res) => res.json())
      .then((datas) =>
        datas.forEach((element) => {
          let newChatMessage = document.createElement("p");
          //Wenn "Idee" oder "Lösung" im Team Chat eingegeben werden kommt eine Ziffer oder alle 4 Ziffern der geheimen Zahl als Chatausgabe zurück
          if (data.chatMsg.includes(element.word) && element.word == "Idee") {
            newChatMessage.innerText =
              element.text.chatMsg + secretCombination[createNumber(0, 3)];
          } else if (
            data.chatMsg.includes(element.word) &&
            element.word == "Lösung"
          ) {
            newChatMessage.innerText = element.text.chatMsg + secretCombination;
          } else if (data.chatMsg.includes(element.word)) {
            newChatMessage.innerText = element.text.chatMsg;
          }

          //Nachricht vom Server farbig anders markieren und innerhalb von 1 bis 5 Sekunden ausliefern um einen realistischen Chatverlauf zu simulieren
          newChatMessage.classList.add("fremdMsg");
          setTimeout(
            () => elements.elChatOutputPublic.append(newChatMessage),
            createNumber(1000, 5000)
          );
        })
      )
      .catch(console.log);
  }
});

//Mails die nach einer bestimmten Zeit im Handy oben angezeigt werden
const eMail1 = () => {
  elements.elEmail1.classList.remove("mailHide");
  elements.elEmailText1.addEventListener("click", () => {
    elements.elEmail1.classList.add("mailHide");
  });
};

const eMail2 = () => {
  elements.elEmail2.classList.remove("mailHide");
  elements.elEmailText2.addEventListener("click", () => {
    elements.elEmail2.classList.add("mailHide");
  });
};

//Umschalten der Chatraeume auf dem Handy
let chatRoomIsPublic = true;
//auf privat
const toggleChatToPrivate = () => {
  if (chatRoomIsPublic) {
    elements.elChatOutputPrivate.classList.toggle("chatHidden");
    elements.elChatOutputPublic.classList.toggle("chatHidden");
    elements.elBtnPublicChat.classList.toggle("chatBtnColor");
    elements.elBtnPrivateChat.classList.toggle("chatBtnColor");
    chatRoomIsPublic = false;
  }
};
//auf oeffentlich
const toggleChatToPublic = () => {
  if (!chatRoomIsPublic) {
    elements.elChatOutputPrivate.classList.toggle("chatHidden");
    elements.elChatOutputPublic.classList.toggle("chatHidden");
    elements.elBtnPublicChat.classList.toggle("chatBtnColor");
    elements.elBtnPrivateChat.classList.toggle("chatBtnColor");
    chatRoomIsPublic = true;
  }
};
//auf den home screen
const toHomeScreen = () => {
  elements.elHomeScreen.classList.remove("chatHidden");
  elements.elChatOutputPrivate.classList.add("chatHidden");
  elements.elChatOutputPublic.classList.add("chatHidden");
  elements.elBtnHome.classList.remove("chatHidden");
  elements.elBtnHome.classList.add("chatBtnColor");
  elements.elBtnChat.classList.remove("chatHidden");
  elements.elBtnPrivateChat.classList.add("chatHidden");
  elements.elBtnPublicChat.classList.add("chatHidden");
  elements.elChatInput.classList.add("chatHidden");
  elements.elChatBtn.classList.add("chatHidden");
};
//auf den Chat screen
const toChatScreen = () => {
  elements.elHomeScreen.classList.add("chatHidden");
  elements.elChatOutputPrivate.classList.remove("chatHidden");
  elements.elBtnPublicChat.classList.add("chatBtnColor");
  elements.elBtnPrivateChat.classList.remove("chatBtnColor");
  elements.elBtnChat.classList.add("chatHidden");
  elements.elBtnHome.classList.remove("chatBtnColor");
  elements.elBtnPublicChat.classList.remove("chatHidden");
  elements.elBtnPrivateChat.classList.remove("chatHidden");
  elements.elChatInput.classList.remove("chatHidden");
  elements.elChatBtn.classList.remove("chatHidden");
  chatRoomIsPublic = true;
};

//Handy Uhrzeit ermitteln und einbinden
const time = () => {
  elements.elTime.innerText = new Date().toLocaleTimeString();
};

//Emails nach bestimmter Zeit sichtbar schalten
//Eventlistener für Buttons auf dem Handy
//Uhrzeit jede Sekunde aktualisieren
const initChat = () => {
  setTimeout(() => eMail2(), 10000);
  setTimeout(() => eMail1(), 15000);
  elements.elChatInput.addEventListener("change", handleChange);
  elements.elChatBtn.addEventListener("click", handleChange);
  elements.elBtnPrivateChat.addEventListener("click", toggleChatToPrivate);
  elements.elBtnPublicChat.addEventListener("click", toggleChatToPublic);
  elements.elBtnHome.addEventListener("click", toHomeScreen);
  elements.elBtnChat.addEventListener("click", toChatScreen);
  time();
  setInterval(time, 1000);
};

export default initChat;

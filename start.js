/*global c*/
window.addEventListener("load", function(eventObject){
  c.initialize(eventObject);
  [
    "load",
    "online",
    "offline",
    "mousemove",
    "mousedown",
    "mouseup",
    "resize",
    "touchstart",
    "touchmove",
    "touchend",
    "click",
    "input",
    "change",
    "keydown",
    "keyup",
    "offline",
    "online"
  ].forEach(function(eventType){
    window.addEventListener(eventType, c.updateModel, true);
  });  
});


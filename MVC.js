/*global L*/
//=========================//
//========| MODEL|=========//
//=========================//
let m = {};
m.eventObject = {};
m.type = "";
m.source = {};

m.pressed = false;
m.moved = false;
m.released = false;

m.footerVisible = false  ;

//=========================//
//========| VIEW |=========//
//=========================//
let v = {};
window.id = "window";
L.attachAllElementsById(v);

//=========================//
//=====| CONTROLLER|=======//
//=========================//
let c = {};

//----------------------------//
//------| UPDATE MODEL |------//
//----------------------------//
c.updateModel = function(eventObject){
  let e = eventObject;
  m.eventObject = e; 
  m.type = e.type;
  m.source = e.target;
  
  eventObject.stopPropagation();
  
  
  //combine key events: mouse and touch
  m.pressed = (m.type === 'mousedown'  || m.type === 'touchstart');
  m.moved = (m.type === 'mousemove' || m.type === 'touchmove');
  m.released = (m.type === 'mouseup' || m.type === 'touchend');
  

  
  
  //update the model, then ...
  c.updateView(eventObject);  
}

//----------------------------//
//------| UPDATE VIEW |-------//
//----------------------------//
c.updateView = function(eventObject){
  c.showEvent(eventObject);
  c.noPinchZoom(eventObject);
  c.showPressed();
  c.showReleased();
  c.toggleFooter();
}

//----------------------------//
//-------| INITIALIZE |-------//
//----------------------------//
c.initialize = function(eventObject){
  c.showEvent(eventObject);
  if(navigator.serviceWorker){
    let reg = navigator.serviceWorker.register('service-worker.js');
  }
}
//---------------------------//
//----| OTHER METHODS |------//
//---------------------------//
c.showEvent = function(eventObject){
  let id = eventObject.target.id;
  let type = eventObject.type;
  v.info.innerHTML = id  + ", " + type;
}

c.noPinchZoom = function(eventObject){
  let type = eventObject.type;
  let touches = eventObject.touches;
  if(type === "touchstart" && touches && touches.length > 1){
    eventObject.preventDefault();
  }
};

c.showPressed = function(){
  if(!m.pressed){return;}
  v.info.innerHTML += " pressed!";
}

c.showReleased = function(){
  if(!m.released){return;}
  v.info.innerHTML += " released!";  
}

c.toggleFooter = e =>{
  let invalidEvent = !(m.pressed && m.source === v.mavoFooter);
  if(invalidEvent){return;}
  
  m.footerVisible = (m.footerVisible) ? false : true;  
  
  if(m.footerVisible){
    L(v.mavoFooter)
      .styles
        ("opacity: 0")
        ('visibility: hidden')
    ;
  }  
  else{
    L(v.mavoFooter).styles("opacity: 1");    
  }
};
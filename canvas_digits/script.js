context1 = document.getElementById('canvas1').getContext("2d");
context2 = document.getElementById('canvas2').getContext("2d");

$(document).ready(function() {
  console.log("hmm")
});

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function addclick1(x, y, dragging)
{
  clickX1.push(x);
  clickY1.push(y);
  clickDrag1.push(dragging);
}

function addclick2(x, y, dragging)
{
  clickX2.push(x);
  clickY2.push(y);
  clickDrag2.push(dragging);
}

$('#submit').click(function(e) {
  var img1 = $('.ncanvas')[0].toDataURL('image/png');
  var img2 = $('.ncanvas')[1].toDataURL('image/png');
  console.log(img);
});

$('#canvas1').mousedown(function(e) {
  var mousex = getMousePos(this, e).x
  var mousey = getMousePos(this, e).y
  paint = true;
  addclick1(mousex, mousey);
  redraw();
});

$('#canvas2').mousedown(function(e) {
  var mousex = getMousePos(this, e).x
  var mousey = getMousePos(this, e).y
  paint = true;
  addclick2(mousex, mousey);
  redraw();
});

$('#canvas1').mousemove(function(e){
  if(paint){
    var mousex = getMousePos(this, e).x
    var mousey = getMousePos(this, e).y
    addclick1(mousex, mousey, true);
    redraw();
  }
});

$('#canvas2').mousemove(function(e){
  if(paint){
    var mousex = getMousePos(this, e).x
    var mousey = getMousePos(this, e).y
    addclick2(mousex, mousey, true);
    redraw();
  }
});

$('.ncanvas').mouseup(function(e){
  paint = false;
});

$('.ncanvas').mouseleave(function(e){
  paint = false;
});

var clickX1 = new Array();
var clickY1 = new Array();
var clickDrag1 = new Array();
var paint;
var clickX2 = new Array();
var clickY2 = new Array();
var clickDrag2 = new Array();

function redraw(){
  context1.clearRect(0, 0, context1.canvas.width, context1.canvas.height); // Clears the canvas
  
  context1.strokeStyle = "#df4b26";
  context1.lineJoin = "round";
  context1.lineWidth = 20;
  for(var i=0; i < clickX1.length; i++) {		
    context1.beginPath();
    if(clickDrag1[i] && i){
      context1.moveTo(clickX1[i-1], clickY1[i-1]);
     }else{
       context1.moveTo(clickX1[i]-1, clickY1[i]);
     }
     context1.lineTo(clickX1[i], clickY1[i]);
     context1.closePath();
     context1.stroke();
  }
  context2.clearRect(0, 0, context1.canvas.width, context1.canvas.height); // Clears the canvas
  
  context2.strokeStyle = "#df4b26";
  context2.lineJoin = "round";
  context2.lineWidth = 20;
  for(var i=0; i < clickX2.length; i++) {		
    context2.beginPath();
    if(clickDrag2[i] && i){
      context2.moveTo(clickX2[i-1], clickY2[i-1]);
     }else{
       context2.moveTo(clickX2[i]-1, clickY2[i]);
     }
     context2.lineTo(clickX2[i], clickY2[i]);
     context2.closePath();
     context2.stroke();
  }
}

context = document.getElementById('canvas').getContext("2d");

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

function addclick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

$('#submit').click(function(e) {
  var img = $('#canvas')[0].toDataURL('image/png');
  console.log(img);
});

$('#canvas').mousedown(function(e) {
  var mousex = getMousePos(this, e).x
  var mousey = getMousePos(this, e).y
  console.log(this);
  console.log($('#canvas'));
  paint = true;
  addclick(mousex, mousey);
  console.log(mousex + " " + mousey);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    var mousex = getMousePos(this, e).x
    var mousey = getMousePos(this, e).y
    addclick(mousex, mousey, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  console.log("liftoff");
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

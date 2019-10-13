$(document).ready(function() {
    setTimeout(function() {
        var ans = decbin(a, b);
        $("#classic").html(ans);
    }, 1000);

    $("#problem").html(a + " + " + b);

    $.get("quantum.php", {"a": str(a), "b": str(b)}, function(resp){
      console.log("quantum:");
      console.log(resp);
      $("#quantresp").html(resp);
    });
});

function str(a) {
  var aa = Number(a).toString(2);
  return "0000".substr(aa.length) + aa;
}

function submit() {
  var img1 = $('#canvas1')[0].toDataURL('image/png');
  var img2 = $('#canvas2')[0].toDataURL('image/png');
  $("#solveresp").html("<div class='loader'></div>");
  $.get("predict.php", {"leftimg": img1, "rightimg": img2}, function(resp){
    console.log("learning:");
    console.log(resp);
    $("#solveresp").html(resp);
  });
}


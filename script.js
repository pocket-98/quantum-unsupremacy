$(document).ready(function() {
    setTimeout(function() {
        var ans = decbin(a, b);
        $("#classic").html(ans);
    }, 1000);
});


function submit() {
  var img1 = $('.ncanvas')[0].toDataURL('image/png');
  var img2 = $('.ncanvas')[1].toDataURL('image/png');
  $.get("predict.php", {"leftimg": img1, "rightimg": img2}, function(resp){
    console.log("resp:");
    console.log(resp);
  });
}


var a = {};

window.addEventListener('input', function(e){
  a[e.target.name] = e.target.value;
  console.clear();
  console.log(  parseInt(a.number, a.base)  );
}, false);
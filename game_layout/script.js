function loadExample() {
  document.getElementById("text").value = "zeta(s) = sum_(n=1)^infty 1/n^s";
  Preview.update();
}

function showTextCopied() {
  var tmp = document.getElementById("text").value;
  document.getElementById("text").value = "Ascii Math Code Copied";
  setTimeout(function() {
    document.getElementById("text").value = tmp;
  }, 500);
}

var Preview = {
  delay: 50,
  preview: null,
  buffer: null,
  timeout: null,
  isRunning: false,
  isPending: false,
  oldText: null,

  init: function () {
    this.preview = document.getElementById("render");
    this.buffer = document.getElementById("buffer");
    this.update();
	MathJax.Hub.setRenderer("SVG");
  },

  swapBuffers: function () {
    var tmpbuffer = this.preview;
    var tmppreview = this.buffer;
    buffer = tmpbuffer;
    preview = tmppreview;

    tmpbuffer.style.visibility = "hidden";
    tmpbuffer.style.position = "absolute";
    tmppreview.style.visibility = "";
    tmppreview.style.position = "";
  },

  update: function () {
    if (this.timeout) {clearTimeout(this.timeout)}
    this.timeout = setTimeout(this.callback,this.delay);
  },

  CreatePreview: function () {
    Preview.timeout = null;
    if (this.isPending) return;
    var text = document.getElementById("text").value;
    if (text === this.oldtext) return;
    if (this.isRunning) {
      this.isPending = true;
      MathJax.Hub.Queue(["CreatePreview", this]);
    } else {
      this.buffer.innerHTML = "`"+text.replace(/\n/g,"`<br>`")+"`";
      this.isRunning = true;
      MathJax.Hub.Queue(
	["Typeset",MathJax.Hub,this.buffer],
	["PreviewDone",this]
      );
    }
  },

  PreviewDone: function () {
    this.isRunning = this.isPending = false;
    this.swapBuffers();
  }
};

Preview.callback = MathJax.Callback(["CreatePreview", Preview]);
Preview.callback.autoReset = true;

clip = new Clipboard("#copy-button", {
	text: function() {
		return document.getElementById("text").value;
	}
});

clip.on("success", function(e) {
	showTextCopied();
});


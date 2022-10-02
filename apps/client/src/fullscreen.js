const fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener("click", () => {
  if (document.fullscreenElement) {
    window.document
      .exitFullscreen()
      .then(() => console.log("Document Exited from Full screen mode"))
      .catch((err) => console.error(err));
    fullscreen.classList.add("rotate");
  } else {
    window.document.documentElement.requestFullscreen();
    window.screen.orientation
      .lock("landscape")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    fullscreen.classList.remove("rotate");
  }
});

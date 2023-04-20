window.addEventListener("load", (event) => {
  console.log("loaded");
  document.querySelector(".house").addEventListener("click", () => {
    window.location = "main.html";
  });
});

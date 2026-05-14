const UIService = {

  showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  },

  hideSplash() {
    const el = document.getElementById("splashScreen");
    if (el) el.style.display = "none";
  },

  setText(id, value) {
    document.getElementById(id).textContent = value || "Not provided";
  },

  setImage(id, url) {
    document.getElementById(id).src = url || "";
  },

  showError(msg) {
    alert(msg);
  }
};

const FB_APP_ID = "962740976398168";

/* =========================
   SPLASH SCREEN SAFETY CORE
========================= */

let splashHidden = false;

function hideSplashSafe(reason = "unknown") {
  if (splashHidden) return;
  splashHidden = true;

  const splash = document.getElementById("splashScreen");
  if (!splash) return;

  splash.style.opacity = "0";
  splash.style.transition = "opacity 0.4s ease";

  setTimeout(() => {
    splash.style.display = "none";
    console.log("Splash hidden:", reason);
  }, 400);
}

/* =========================
   UI HELPERS
========================= */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "Not provided";
}

function setImage(id, url) {
  const el = document.getElementById(id);
  if (el) el.src = url || "";
}

function showError(msg) {
  console.error(msg);
  alert(msg);
}

/* =========================
   FACEBOOK LOGIN FLOW
========================= */

function loadProfile() {
  FB.api(
    "/me",
    { fields: "id,name,email,picture" },
    function (res) {

      if (!res || res.error) {
        showError("Failed to fetch profile");
        return;
      }

      setText("profileName", res.name);
      setText("email", res.email);
      setText("id", res.id);
      setImage("profilePic", res.picture?.data?.url);

      showScreen("profileScreen");
    }
  );
}

/* =========================
   FB INIT (SAFE)
========================= */

window.fbAsyncInit = function () {

  try {
    FB.init({
      appId: FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v19.0"
    });

    FB.getLoginStatus(function (response) {

      hideSplashSafe("login-status-received");

      if (response.status === "connected") {
        loadProfile();
      }
    });

  } catch (err) {
    console.error("FB init failed:", err);
    hideSplashSafe("fb-init-error");
  }
};

/* =========================
   LOGIN BUTTON
========================= */

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("fbLoginBtn")?.addEventListener("click", function () {
    FB.login(function (res) {
      if (res.authResponse) {
        loadProfile();
      } else {
        showError("Login cancelled");
      }
    }, { scope: "public_profile" });
  });

  document.getElementById("logoutBtn")?.addEventListener("click", function () {
    FB.logout(function () {
      showScreen("loginScreen");
    });
  });

});

/* =========================
   FAILSAFE (NEVER STUCK)
========================= */

// If Facebook SDK is slow or fails → still hide splash
setTimeout(() => {
  hideSplashSafe("timeout-5s-fallback");
}, 5000);

// Catch unexpected runtime errors
window.addEventListener("error", function () {
  hideSplashSafe("global-error-catch");
});

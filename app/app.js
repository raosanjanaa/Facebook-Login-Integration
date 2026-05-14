const FB_APP_ID = "962740976398168";

/* ---------------- UI Helpers ---------------- */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function hideSplash() {
  const splash = document.getElementById("splashScreen");
  if (splash) splash.style.display = "none";
}

function setText(id, value) {
  document.getElementById(id).textContent = value || "Not provided";
}

/* ---------------- Error Handling Layer ---------------- */

function handleError(msg, err) {
  console.error(msg, err);
  alert(msg);
}

/* ---------------- Facebook Init ---------------- */

window.fbAsyncInit = function () {
  try {
    FB.init({
      appId: FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v19.0"
    });

    FB.getLoginStatus(handleLoginStatus);
  } catch (err) {
    handleError("SDK Init failed", err);
  } finally {
    hideSplash();
  }
};

/* ---------------- Login Flow ---------------- */

function handleLoginStatus(response) {
  if (response.status === "connected") {
    fetchProfile();
  }
}

function login() {
  FB.login(res => {
    if (res.authResponse) {
      fetchProfile();
    } else {
      handleError("Login cancelled");
    }
  }, { scope: "public_profile" });
}

/* ---------------- Fetch Data ---------------- */

function fetchProfile() {
  FB.api(
    "/me",
    { fields: "id,name,email,picture,gender,birthday" },
    function (res) {
      if (!res || res.error) {
        handleError("Profile fetch failed", res?.error);
        return;
      }

      setText("profileName", res.name);
      setText("fieldEmail", res.email);
      setText("fieldId", res.id);
      setText("fieldGender", res.gender);
      setText("fieldBirthday", res.birthday);

      document.getElementById("profilePic").src =
        res.picture?.data?.url || "";

      showScreen("profileScreen");
    }
  );
}

/* ---------------- Logout ---------------- */

function logout() {
  FB.logout(() => {
    showScreen("loginScreen");
  });
}

/* ---------------- Events ---------------- */

document.getElementById("fbLoginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", logout);

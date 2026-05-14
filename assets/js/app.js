window.fbAsyncInit = function () {

  FacebookService.init();

  FB.getLoginStatus(res => {

    UIService.hideSplash();

    if (res.status === "connected") {
      loadProfile();
    }
  });
};


/* LOGIN */
document.getElementById("fbLoginBtn").addEventListener("click", () => {
  FacebookService.login(success => {
    if (success) loadProfile();
    else UIService.showError("Login failed");
  });
});


/* LOGOUT */
document.getElementById("logoutBtn").addEventListener("click", () => {
  FacebookService.logout(() => {
    StorageService.clear();
    UIService.showScreen("loginScreen");
  });
});


/* LOAD PROFILE */
function loadProfile() {

  const cached = StorageService.getUser();
  if (cached) renderProfile(cached);

  FacebookService.getProfile(user => {

    if (!user || user.error) {
      UIService.showError("Failed to load profile");
      return;
    }

    StorageService.saveUser(user);
    renderProfile(user);
  });
}


/* RENDER */
function renderProfile(user) {
  UIService.setText("profileName", user.name);
  UIService.setText("email", user.email);
  UIService.setText("id", user.id);

  UIService.setImage("profilePic",
    user.picture?.data?.url
  );

  UIService.showScreen("profileScreen");
}

window.fbAsyncInit = function () {

  try {
    FacebookService.init();

    FB.getLoginStatus(function (response) {

      // ALWAYS hide splash after status check
      const splash = document.getElementById("splashScreen");
      if (splash) splash.style.display = "none";

      if (response.status === "connected") {
        loadProfile();
      }
    });

  } catch (err) {
    console.error(err);

    // IMPORTANT fallback
    document.getElementById("splashScreen").style.display = "none";
  }
};

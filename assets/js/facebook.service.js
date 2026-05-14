const FacebookService = {

  init() {
    FB.init({
      appId: CONFIG.FB_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v19.0"
    });
  },

  login(callback) {
    FB.login(res => {
      if (res.authResponse) callback(true);
      else callback(false);
    }, { scope: CONFIG.FB_SCOPES });
  },

  logout(callback) {
    FB.logout(() => callback());
  },

  getProfile(callback) {
    FB.api(
      "/me",
      { fields: "id,name,email,picture" },
      callback
    );
  }
};

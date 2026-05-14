const StorageService = {
  saveUser(user) {
    localStorage.setItem("fb_user", JSON.stringify(user));
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem("fb_user"));
    } catch {
      return null;
    }
  },

  clear() {
    localStorage.removeItem("fb_user");
  }
};

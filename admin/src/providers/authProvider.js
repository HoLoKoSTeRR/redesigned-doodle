export default {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request(
      "https://arcane-anchorage-00164.herokuapp.com/api/admin/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    const response = await fetch(request)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        }
        const auth = res;
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  signup: async ({ username, password }) => {
    const request = new Request(
      "https://arcane-anchorage-00164.herokuapp.com/api/admin/signup",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    const response = await fetch(request)
      .then((response) => response.json())
      .then((res) => {
        if (res.message !== "User created!") {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  // called when the API returns an error
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.resolve("guest");
  },
};

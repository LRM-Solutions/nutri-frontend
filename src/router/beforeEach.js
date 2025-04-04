export default async (to) => {
  document.title = `${to.name} - FitTrack`;

  const token = localStorage.getItem("token-auth");

  if (to.name === "login" && token) {
    return { path: `/` };
  }

  if (to.meta.requiresAuth) {
    if (!token) {
      return { name: "Login" };
    }

    return true;
  }

  return true;
};

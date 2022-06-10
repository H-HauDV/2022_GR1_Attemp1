export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefiend"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};

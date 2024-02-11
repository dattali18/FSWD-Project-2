function getUserById(id) {
  const users = getUsers();
  return users.filter((user) => (user.id = id))[0];
}

function getUserByUserName(username) {
  const users = getUsers();
  return users.filter((user) => user.name == username)[0];
}

function createUser(name, email, password) {
  let users = getUsers();
  if (getUserByUserName(name) != null) {
    return false;
  }

  let user = {
    id: users.length,
    name: name,
    email: email,
    password: password,
    score: 0,
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  return true;
}

function getUsers() {
  const users = localStorage.getItem("users");
  if (users == null) {
    return [];
  }
  return JSON.parse(users);
}

function setCurrentUser(user) {
  localStorage.setItem("current-user", JSON.stringify(user));
}

function getCurrentUser() {
  return localStorage.getItem("current-user");
}

function signOutCurrentUser() {
  localStorage.removeItem("current-user");
}

export {
  getUsers,
  getUserByUserName,
  getUserById,
  createUser,
  setCurrentUser,
  getCurrentUser,
  signOutCurrentUser,
};

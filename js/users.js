// Function to get a user by their ID
function getUserById(id) {
  const users = getUsers();
  // Filter users array to find user with matching ID and return it
  return users.filter((user) => user.id === id)[0];
}

// Function to get a user by their username
function getUserByUserName(username) {
  const users = getUsers();
  // Filter users array to find user with matching username and return it
  return users.filter((user) => user.name === username)[0];
}

// Function to create a new user
function createUser(name, email, password) {
  let users = getUsers();
  // Check if username already exists
  if (getUserByUserName(name) !== undefined) {
    return false; // Return false if username already exists
  }

  // Create new user object
  let user = {
    id: users.length, // Assign user ID
    name: name,
    email: email,
    password: password,
    score: 0, // Initialize score to 0
  };

  // Add new user to users array
  users.push(user);

  // Save updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  return true; // Return true to indicate successful user creation
}

// Function to retrieve users from localStorage
function getUsers() {
  const users = localStorage.getItem("users");
  // If no users in localStorage, return an empty array
  if (users === null) {
    return [];
  }
  // Parse and return users array
  return JSON.parse(users);
}

// Function to set the current user in localStorage
function setCurrentUser(user) {
  localStorage.setItem("current-user", JSON.stringify(user));
}

// Function to get the current user from localStorage
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("current-user"));
}

// Function to sign out the current user
function signOutCurrentUser() {
  localStorage.removeItem("current-user");
}

// Export all functions for use in other modules
export {
  getUsers,
  getUserByUserName,
  getUserById,
  createUser,
  setCurrentUser,
  getCurrentUser,
  signOutCurrentUser,
};

//Once the user is in the Resume page restrict the user from going back to the login page
window.history.forward();
function noback() {
  window.history.forward();
}
// username and password storage in Map
const userCredentials = new Map([
  ["user1", "pass1"],
  ["user2", "pass2"],
  ["user3", "pass3"],
]);
console.log(userCredentials);
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let user = [username, password];
  console.log(user);
  // to store user details in local Storage
  localStorage.setItem("user", JSON.stringify(user));
  // If username, password match show resume page
  if (userCredentials.has(username)) {
    if (userCredentials.get(username) === password) {
      window.location = "resumes.html";
      return;
    } else {
      alert("Invalid Password");
      return;
    }
  } else {
    alert("Invalid User");
    return;
  }
});

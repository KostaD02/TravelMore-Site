if (localStorage[`usertype`] == "Admin") {
  document.getElementById("displayType").innerHTML = `
    Your account type is <i style="color:red;font-style:normal;">${localStorage["usertype"]}</i>
`;
} else {
  document.getElementById("displayType").innerHTML = `
    Your account type is <i style="color:#007bff;font-style:normal;">${localStorage["usertype"]}</i> `;
}

function Newcheckpassword(newPassword) {
  if (newPassword == "") return true;
  else false;
}

function checkCorrectPassword(password) {
  if (password == localStorage["password"]) return true;
  else false;
}

function updateUserFirebase() {
  let name = $("#inputName").val();
  let lastname = $("#inputLastname").val();
  let mail = $("#inputEmail").val();
  let date = $("#inputDate").val();
  let password = $("#inputPassword").val();
  let passwordConfirm = $("#inputPasswordConfirm").val();
  if (checkCorrectPassword(password)) {
    if (Newcheckpassword(passwordConfirm)) {
      updateUser(
        "Users",
        localStorage["userid"],
        name,
        lastname,
        mail,
        date,
        password
      );
      Swal.fire({
        showConfirmButton: false,
        icon: "success",
        text: "Your details has changed , please re-login",
        timer: 2000,
      });
    } else {
      updateUser(
        "Users",
        localStorage["userid"],
        name,
        lastname,
        mail,
        date,
        passwordConfirm
      );
      Swal.fire({
        showConfirmButton: false,
        icon: "success",
        text: "Your details has changed , please re-login",
        timer: 2000,
      });
    }
    setTimeout(() => {
      localStorage["currentAppartmentArray"] = [];
      localStorage["currentUserArray"] = [];
      localStorage["password"] = undefined;
      localStorage["userid"] = undefined;
      localStorage["usertype"] = "undefined";
      window.location.href = "./index.html";
    }, 1000);
  } else {
    Swal.fire({
      showConfirmButton: false,
      icon: "error",
      text: "Password is incorrect",
      timer: 2000,
    });
    $("#inputName").val(`${myCurrentUserArray[0]}`);
    $("#inputLastname").val(`${myCurrentUserArray[1]}`);
    $("#inputEmail").val(`${myCurrentUserArray[2]}`);
    $("#inputDate").val(`${myCurrentUserArray[3]}`);
    $("#inputPassword").val(``);
    $("#inputPasswordConfirm").val("");
  }
}
let myCurrentUserArray = JSON.parse(
  window.localStorage.getItem("currentUserArray")
);

$("#inputName").val(`${myCurrentUserArray[0]}`);
$("#inputLastname").val(`${myCurrentUserArray[1]}`);
$("#inputEmail").val(`${myCurrentUserArray[2]}`);
$("#inputDate").val(`${myCurrentUserArray[3]}`);
$("#inputPassword").val(``);
$("#inputPasswordConfirm").val("");

function DeleteUser() {
  let ID = localStorage["userid"];
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "User has been deleted.", "success");
      firebase.database().ref(`Users/${ID}`).remove();
      setTimeout(() => {
        localStorage["currentAppartmentArray"] = [];
        localStorage["currentUserArray"] = [];
        localStorage["password"] = undefined;
        localStorage["userid"] = undefined;
        localStorage["usertype"] = "undefined";
        window.location.href = "./index.html";
      }, 1000);
    }
  });
}

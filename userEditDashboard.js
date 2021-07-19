function updateUserFirebase() {
  let name = $("#inputName").val();
  let lastname = $("#inputLastname").val();
  let mail = $("#inputEmail").val();
  let date = $("#inputDate").val();
  let password = $("#inputPassword").val();
  let passwordConfirm = $("#inputPasswordConfirm").val();
  if (passwordConfirm !== "") password = passwordConfirm;
  let userType = $("#selectUserType").val();
  firebase.database().ref(`Users/${myCurrentUserArray[6]}`).update({
    name: name,
    surname: lastname,
    password: password,
    email: mail,
    age: date,
    userType: userType,
  });
  Swal.fire({
    showConfirmButton: false,
    icon: "success",
    text: "User successfully updated",
    timer: 2000,
  });
  setTimeout(() => {
    window.location.href = "./systemManager.html";
  }, 1000);
}

let myCurrentUserArray = JSON.parse(
  window.localStorage.getItem("userTempArray")
);

$("#inputName").val(`${myCurrentUserArray[0]}`);
$("#inputLastname").val(`${myCurrentUserArray[1]}`);
$("#inputEmail").val(`${myCurrentUserArray[3]}`);
$("#inputDate").val(`${myCurrentUserArray[2]}`);
$("#inputPassword").val(`${myCurrentUserArray[4]}`);
$("#inputPasswordConfirm").val("");
$("#selectUserType").val(`${myCurrentUserArray[5]}`);

if (myCurrentUserArray[5] == "Admin") {
  document.getElementById("displayType").innerHTML = `
    Currently user type is <i style="color:red;font-style:normal;">${myCurrentUserArray[5]}</i>
`;
} else {
  document.getElementById("displayType").innerHTML = `
    Currently user type is <i style="color:#007bff;font-style:normal;">${myCurrentUserArray[5]}</i> `;
}

function DeleteUser() {
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
      firebase.database().ref(`Users/${myCurrentUserArray[6]}`).remove();
      setTimeout(() => {
        window.location.href = "./systemManager.html";
      }, 1000);
    }
  });
}

if (localStorage[`usertype`] != "Admin") {
  window.location.href = "./index.html";
}
let counteForUsers = 1;
let counterForPosts = 1;
setTimeout(() => {
  document.getElementById("userCounter").innerHTML += `
     Currently ${usersArray.length} user are in database
  `;
  usersArray.forEach((element) => {
    document.getElementById("displayTable").innerHTML += `
    <tr>
      <th scope="row">${counteForUsers}</th>
      <td>${element.data.name}</td>
      <td>${element.data.surname}</td>
      <td>${element.data.age}</td>
      <td>${element.data.email}</td>
      <td>${element.data.password}</td>
      <td>${element.data.userType}</td>
      <td><button type="button" onclick="updateUserFromDashboard('${element.userid}')" class="btn btn-info">Edit</button></td>
      <td><button type="button" onclick="deleteUserFromDashboard('${element.userid}')"class="btn btn-danger">Delete</button></td>
    </tr>
  `;
    counteForUsers++;
  });
  $("#postCounter").html(`Currently there are ${postsArray.length} post :`);
  postsArray.forEach((element) => {
    document.getElementById("displayTablePost").innerHTML += `
    <tr>
      <th scope="row">${counterForPosts}</th>
      <td>${element.data.title}</td>
      <td>${element.data.date}</td>
      <td>
      <button type="button" class="btn btn-primary" onclick="viewPostDashboard('${element.userid}')">View</button>
      <button type="button" class="btn btn-info mr-2 ml-2" onclick="editPostDashboard('${element.userid}')">Edit</button>
      <button type="button" class="btn btn-danger" onclick="deletePostDashboard('${element.userid}')">Delete</button>
      </td>
    </tr>
    `;
    counterForPosts++;
  });
}, 1000);

function updateUserFromDashboard(id) {
  let userTempArray = [];
  usersArray.forEach((element) => {
    if (element.userid == id) {
      userTempArray.push(
        element.data.name,
        element.data.surname,
        element.data.age,
        element.data.email,
        element.data.password,
        element.data.userType,
        element.userid
      );
    }
  });
  window.localStorage.setItem("userTempArray", JSON.stringify(userTempArray));
  window.location.href = "./userEditDashboard.html";
}

function createNewPost() {
  window.location.href = "./createNewPost.html";
}

function deleteUserFromDashboard(id) {
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
      firebase.database().ref(`Users/${id}`).remove();
      setTimeout(() => {
        window.location.href = "./systemManager.html";
      }, 1000);
    }
  });
}
function viewPostDashboard(id) {
  let tempArray = [];
  postsArray.forEach((element) => {
    if (element.userid == id) {
      tempArray.push(
        element.data.date,
        element.data.imageURL,
        element.data.text,
        element.data.title
      );
    }
  });
  Swal.fire({
    title: `${tempArray[3]}`,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    html: `<img style="width:100%" src="${tempArray[1]}">
    <p>${tempArray[2]}</p>
    <P>Date:${tempArray[0]}</P>
    `,
  });
}
function editPostDashboard(id) {
  let postsTempArray = [];
  postsArray.forEach((element) => {
    if (element.userid == id) {
      postsTempArray.push(
        element.data.date,
        element.data.imageURL,
        element.data.text,
        element.data.title,
        element.userid
      );
    }
  });
  window.localStorage.setItem("postsTempArray", JSON.stringify(postsTempArray));
  window.location.href = "./editPost.html";
}
function deletePostDashboard(id) {
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
      Swal.fire("Deleted!", "Post has been deleted.", "success");
      firebase.database().ref(`Posts/${id}`).remove();
      setTimeout(() => {
        window.location.href = "./systemManager.html";
      }, 1000);
    }
  });
}

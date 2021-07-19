let postsTempArray = JSON.parse(window.localStorage.getItem("postsTempArray"));
$("#inputTitlePost").val(`${postsTempArray[3]}`);
$("#inputDatePost").val(`${postsTempArray[0]}`);
$("#inputTextPost").val(`${postsTempArray[2]}`);
$("#imageUploadPost").val(`${postsTempArray[1]}`);
function uploadEditedPost() {
  let title = $("#inputTitlePost").val();
  let date = $("#inputDatePost").val();
  let text = $("#inputTextPost").val();
  let URL = $("#imageUploadPost").val();
  if (title == "" || date == "" || text == "") {
    displayMessage(5);
    $("#inputTitlePost").val("");
    $("#inputDatePost").val("");
    $("#inputTextPost").val("");
    $("#imageUploadPost").val("");
  } else {
    if (URL == "" || URL.length < 10)
      URL =
        "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png";
    let id = postsTempArray[4];
    firebase
      .database()
      .ref(`Posts/${id}`)
      .update({ date: date, imageURL: URL, text: text, title: title });
    Swal.fire({
      showConfirmButton: false,
      icon: "success",
      text: "Post successfuly edited",
      timer: 1000,
    });
    setTimeout(() => {
      window.location.href = "./systemManager.html";
    }, 1000);
  }
}

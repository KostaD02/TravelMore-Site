function updateAppartemntFirebase() {
  let title = $("#inputTitle").val();
  let length = $("#inputLength").val();
  let date = $("#inputDate").val();
  let price = $("#inputPrice").val();
  let rooms = $("#inputRooms").val();
  let number = $("#inputRooms").val();
  let text = $("#inputText").val();
  let location = $("#inputLocation").val();
  let imageURL = $("#imageUpload").val();
  if (
    title == "" ||
    length == "" ||
    date == "" ||
    price == "" ||
    rooms == "" ||
    number == "" ||
    text == "" ||
    location == ""
  ) {
    displayMessage(5);
    setTimeout(() => {
      $("#inputTitle").val(`${myAppartmentObject[0]}`);
      $("#inputLength").val(`${myAppartmentObject[4]}`);
      $("#inputDate").val(`${myAppartmentObject[7]}`);
      $("#inputPrice").val(`${myAppartmentObject[5]}`);
      $("#inputRooms").val(`${myAppartmentObject[3]}`);
      $("#inputNumber").val(`${myAppartmentObject[6]}`);
      $("#inputText").val(`${myAppartmentObject[1]}`);
      $("#inputLocation").val(`${myAppartmentObject[2]}`);
    }, 1000);
  } else {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", "Your appartment has been updated.", "success");
        firebase
          .database()
          .ref(`Appartment/${currentAppartmentID}`)
          .update(
            createAppartment(
              title,
              length,
              rooms,
              text,
              price,
              number,
              date,
              imageURL,
              location
            )
          );
        setTimeout(() => {
          window.location.href = "./apartments.html";
        }, 2000);
      }
    });
  }
}
let myAppartmentObject = JSON.parse(
  window.localStorage.getItem("currentAppartmentArray")
);
let currentAppartmentID = myAppartmentObject[8];
$("#inputTitle").val(`${myAppartmentObject[0]}`);
$("#inputLength").val(`${myAppartmentObject[4]}`);
$("#inputDate").val(`${myAppartmentObject[7]}`);
$("#inputPrice").val(`${myAppartmentObject[5]}`);
$("#inputRooms").val(`${myAppartmentObject[3]}`);
$("#inputNumber").val(`${myAppartmentObject[6]}`);
$("#inputText").val(`${myAppartmentObject[1]}`);
$("#inputLocation").val(`${myAppartmentObject[2]}`);

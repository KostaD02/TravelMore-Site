const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste aliquid tempore delectus. Deleniti numquam nulla sint nam minus ad excepturi expedita reiciendis architecto totam molestiae impedit earum, repellat maiores.";
let config = {
  apiKey: "AIzaSyAlQFWo3_0ANDQ5DwKbYeWQufRTfO259n0",
  authDomain: "front-end-web-appp.firebaseapp.com",
  databaseURL: "https://front-end-web-appp-default-rtdb.firebaseio.com/",
  storageBucket: "gs://front-end-web-appp.appspot.com",
};
firebase.initializeApp(config);
let usersArray = [];
let postsArray = [];
let appartentsArray = [];
let userAuthorized = false;
let currentUserID = "";
let currentUserArray = [];
let UserType = "StandartUser";
function registerUser(name, surname, email, age, password) {
  return {
    name: name,
    surname: surname,
    email: email,
    age: age,
    password: password,
    userType: UserType,
  };
}
function createAppartment(
  Title,
  Length,
  Rooms,
  Text,
  price,
  number,
  Date,
  ImageURL,
  location
) {
  if (ImageURL == "" || ImageURL.length > 5)
    ImageURL =
      "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png";
  return {
    title: Title,
    length: Length,
    rooms: Rooms,
    text: Text,
    prices: price,
    number: number,
    date: Date,
    imageURL: ImageURL,
    userID: localStorage[`userid`],
    counter: 0,
    location: location,
  };
}
function createPost(imageURL, Title, Text, Date) {
  return {
    imageURL: imageURL,
    title: Title,
    text: Text,
    date: Date,
  };
}
function generateFirebaseItem(ID, value) {
  return {
    userid: ID,
    data: value,
  };
}

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function createPostFirebase(imageURL, Title, Text, Date) {
  firebase
    .database()
    .ref("Posts/" + randomID())
    .set(createPost(imageURL, Title, Text, Date));
}
function createAppartmentFirebase(
  Title,
  Length,
  Rooms,
  Text,
  price,
  number,
  Date,
  ImageURL,
  location
) {
  firebase
    .database()
    .ref("Appartment/" + randomID())
    .set(
      createAppartment(
        Title,
        Length,
        Rooms,
        Text,
        price,
        number,
        Date,
        ImageURL,
        location
      )
    );
}
function registerUserFirebase(name, surname, email, age, password) {
  firebase
    .database()
    .ref("Users/" + randomID())
    .set(registerUser(name, surname, email, age, password));
}

let ref = firebase
  .database()
  .ref("Users")
  .on("value", (response) => {
    response.forEach((item) => {
      usersArray.push(generateFirebaseItem(item.key, item.val()));
    });
  });

let REF = firebase
  .database()
  .ref("Posts")
  .on("value", (response) => {
    response.forEach((item) => {
      postsArray.push(generateFirebaseItem(item.key, item.val()));
    });
  });

let href = firebase
  .database()
  .ref("Appartment")
  .on("value", (response) => {
    response.forEach((item) => {
      appartentsArray.push(generateFirebaseItem(item.key, item.val()));
    });
  });

function checkUserInDataBase(email) {
  let userInDataBase = false;
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].data.email == `${email}`) userInDataBase = true;
  }
  return userInDataBase;
}

function displayMessage(option) {
  switch (option) {
    case 1: {
      Swal.fire({
        showConfirmButton: false,
        icon: "error",
        title: "Error",
        text: "User already registered",
        timer: 2000,
      });
      break;
    }
    case 2: {
      Swal.fire({
        showConfirmButton: false,
        icon: "success",
        text: "User successfuly registered",
        timer: 2000,
      });
      break;
    }
    case 3: {
      Swal.fire({
        showConfirmButton: false,
        icon: "error",
        title: "Error",
        timer: 2000,
        text: "Input information is wrong",
      });
      break;
    }
    case 4: {
      Swal.fire({
        showConfirmButton: false,
        icon: "success",
        timer: 2000,
        text: "User succsessfuly logined",
      });
      break;
    }
    case 5: {
      Swal.fire({
        showConfirmButton: false,
        icon: "error",
        text: "You must fill every input",
        timer: 2000,
      });
      break;
    }
    case 6: {
      Swal.fire({
        showConfirmButton: false,
        icon: "warning",
        text: `Please contact support`,
        footer:
          '<a href="mailto: kdautinishvili@gmail.com">Support email address</a>',
        timer: 5000,
      });
      break;
    }
    case 7: {
      Swal.fire({
        showConfirmButton: false,
        icon: "success",
        text: "Your appartment successfuly uploaded",
        timer: 2000,
      });
      break;
    }
    default: {
      Swal.fire({
        showConfirmButton: false,
        icon: "question",
        text: "Unexpected error",
        footer:
          '<a href="mailto: kdautinishvili@gmail.com">Please write us to what happend</a>',
        timer: 10000,
      });
      break;
    }
  }
}

function register(name, surname, email, age, password) {
  setTimeout(() => {
    if (checkUserInDataBase(email)) {
      displayMessage(1);
      window.location.href = "./index.html";
    } else {
      registerUserFirebase(name, surname, email, age, password);
      displayMessage(2);
    }
  }, 1000);
}

function checkLogin() {
  let userEmail = $("#InputEmail1").val();
  let userPassword = $("#InputPassword1").val();
  let userEmailCorrect = false;
  let userPasswordCorrect = false;
  let userChoose = false;
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].data.email == `${userEmail}`) {
      userEmailCorrect = true;
      currentUserID = usersArray[i].userid;
      currentUserArray.push(
        usersArray[i].data.name,
        usersArray[i].data.surname,
        usersArray[i].data.email,
        usersArray[i].data.age,
        usersArray[i].data.userType
      );
    }
    if (usersArray[i].data.password == `${userPassword}`)
      userPasswordCorrect = true;
    if (usersArray[i].data.userType == UserType) userChoose = true;
  }
  if (userEmailCorrect & userPasswordCorrect & userChoose) {
    userAuthorized = true;
    displayMessage(4);
    setTimeout(() => {
      localStorage["userid"] = currentUserID;
      localStorage["usertype"] = currentUserArray[4];
      localStorage["password"] = userPassword;
      window.localStorage.setItem(
        "currentUserArray",
        JSON.stringify(currentUserArray)
      );
      window.location.href = "/index.html";
    }, 1000);
  } else {
    displayMessage(3);
    $("#InputEmail1").val("");
    $("#InputPassword1").val("");
    currentUserArray = [];
  }
}

function helpLogin() {
  displayMessage(6);
}

function checkRegister() {
  let name = $("#InputName1").val();
  let surname = $("#InputSurname").val();
  let email = $("#InputEmail1").val();
  let password = $("#InputPassword1").val();
  let againPaasword = $("#InputPassword2").val();
  let age = $("#age").val();
  let checkPasswords = false;
  if (password == againPaasword) checkPasswords = true;
  if (
    name != false &&
    surname != false &&
    email != false &&
    checkPasswords != false &&
    age != false
  ) {
    register(name, surname, email, age, password);
    displayMessage(2);
    $("#InputName1").val("");
    $("#InputSurname").val("");
    $("#InputEmail1").val("");
    $("#InputPassword1").val("");
    $("#InputPassword2").val("");
    $("#age").val("");
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  } else {
    displayMessage(5);
  }
}
function logOut() {
  localStorage.clear();
  window.location.href = "./index.html";
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

function updateUser(userLocation, userID, name, surname, email, age, password) {
  firebase
    .database()
    .ref(`${userLocation}/${userID}`)
    .update(registerUser(name, surname, email, age, password));
}
function deleteUser(userLocation, userID) {
  firebase.database().ref(`${userLocation}/${userID}`).remove();
}

function registrationChoose(option) {
  if (option == "left") {
    UserType = "StandartUser";
    document.getElementById("left").style.background = "#007bff";
    document.getElementById("left").style.color = "white";
    document.getElementById("right").style.background = "white";
    document.getElementById("right").style.color = "black";
  } else {
    UserType = "Admin";
    document.getElementById("left").style.background = "white";
    document.getElementById("left").style.color = "black";
    document.getElementById("right").style.background = "#007bff";
    document.getElementById("right").style.color = "white";
  }
}

function Contact() {
  Swal.fire({
    title: "Contact information",
    width: 600,
    html: `<img style="width:200px;height:300px;margin-bottom:10px" src="https://img.favpng.com/0/19/3/customer-service-computer-icons-technical-support-png-favpng-EdwahhNBuBRXGwrAsnKbhn9X5.jpg">
    <br> Dont'be shy , ask the TravelMore anything! <br> Mondey - Sunday 7:00am - 5:00pm`,
    padding: "3em",
    footer: `<a style="padding-right:5px" href="mailto: kdautinishvili@gmail.com">Write us </a> or call us 555-55-55-55`,
    background: "#fff",
    backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `,
    showConfirmButton: false,
    timer: 5000,
  });
}

function information() {
  Swal.fire({
    icon: "info",
    html: `TravelMore is a website where you <br> can <a href="./apartments.html">booking</a> a hotel <br>
           or <a href="./apartments.html">rent</a> your hotel for free <br>
           You can <a href="./register.html">register</a> with out any fee <br> and use our website <i style="color:red" class="fas fa-heart"></i>
           `,
    footer: `Already registered ? then <a style="padding-left:3px" href="./login.html"> log in</a>`,
    showConfirmButton: false,
    timer: 5000,
  });
}

function uploadAppartemnt() {
  let Title = $("#inputTitle").val();
  let Length = $("#inputLength").val();
  let Date = $("#inputDate").val();
  let Price = $("#inputPrice").val();
  let Rooms = $("#inputRooms").val();
  let PhoneNumber = $("#inputNumber").val();
  let Text = $("#inputText").val();
  let ImageURL = $("#imageUpload").val();
  let location = $("#inputLocation").val();
  if (
    Title == "" ||
    Length == "" ||
    Date == "" ||
    Price == "" ||
    Rooms == "" ||
    PhoneNumber == "" ||
    Text == "" ||
    location == ""
  ) {
    displayMessage(5);
    $("#inputTitle").val("");
    $("#inputLength").val("");
    $("#inputDate").val("");
    $("#inputPrice").val("");
    $("#inputRooms").val("");
    $("#inputNumber").val("");
    $("#inputText").val("");
    $("#imageUpload").val("");
    $("#inputLocation").val("");
  } else {
    if (ImageURL == "" || ImageURL.length < 10)
      ImageURL =
        "https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png";
    createAppartmentFirebase(
      Title,
      Length,
      Rooms,
      Text,
      Price,
      PhoneNumber,
      Date,
      ImageURL,
      location
    );
    displayMessage(7);
    $("#inputTitle").val("");
    $("#inputLength").val("");
    $("#inputDate").val("");
    $("#inputPrice").val("");
    $("#inputRooms").val("");
    $("#inputNumber").val("");
    $("#inputText").val("");
    $("#imageUpload").val("");
    $("#inputLocation").val("");
  }
}

function gotoAppartmentPage() {
  window.location.href = "./apartments.html";
}

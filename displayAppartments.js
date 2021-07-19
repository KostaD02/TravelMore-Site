function displayAppartmentsCounter() {
  $("#displayApparmentsCounter").html(`
  Currently there is ${appartentsArray.length} appartments
  `);
}

function updateUserBook(userID, Counter) {
  Swal.fire({
    showConfirmButton: false,
    icon: "success",
    text: "You booked appartment successfuly",
    timer: 2000,
  });
  firebase
    .database()
    .ref(`Appartment/${userID}`)
    .update({ counter: +Counter + 1 });
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

function editAppartment(
  title,
  text,
  location,
  rooms,
  length,
  prices,
  number,
  date,
  userid
) {
  let currentAppartmentArray = [];
  currentAppartmentArray.push(
    title, //0
    text, //1
    location, //2
    rooms, //3
    length, //4
    prices, //5
    number, //6
    date, //7
    userid //8
  );
  window.localStorage.setItem(
    "currentAppartmentArray",
    JSON.stringify(currentAppartmentArray)
  );
  window.location.href = "./updateAppartment.html";
}

function deleteAppartmentFromFirebase(id) {
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
      Swal.fire("Deleted!", "Your appartment has been deleted.", "success");
      console.log(id);
      firebase.database().ref(`Appartment/${id}`).remove();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
}

function check(counter) {
  return counter > 0 ? "success" : "primary";
}

function displayCards() {
  if (localStorage[`usertype`] == "Admin") {
    appartentsArray.forEach((element) => {
      document.getElementById("cardsDisplayAppartments").innerHTML += `
      <div class="card border-${check(
        element.data.counter
      )} mb-3" style="max-width: 900px;" >
        <div class="row no-gutters">
          <div class="col-md-4">
            <img style="padding:10px" src="${element.data.imageURL}" alt="">
          </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><i style="color:#007bff;font-style:normal;font-weight: bold;">${
              element.data.title
            }</i></h5>
            <p class="card-text">${element.data.text}</p>
            <p class="card-text"><i style="color:#007bff;font-style:normal;font-weight: bold;">Location</i>: ${
              element.data.location
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Rooms</i> : ${
              element.data.rooms
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Appartment length </i>: ${
              element.data.length
            }(M)<sup>2</sup>
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Price </i> : ${
              element.data.prices
            }<i style="color:green;font-style:normal;font-weight: bold;"> $ </i> 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Phone Number </i> : ${
              element.data.number
            } 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Avalvaible before: </i> ${
              element.data.date
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Currently booked by : </i> ${
              element.data.counter
            } <i style="color:green;font-style:normal;font-weight: bold;"> user </i>
            </p>
            <p class="card-text"><button type="button" class="btn btn-success" onclick="updateUserBook('${
              element.userid
            }','${
        element.data.counter
      }')">Book</button> <button type="button" onclick="editAppartment('${
        element.data.title
      }','${element.data.text}','${element.data.location}','${
        element.data.rooms
      }','${element.data.length}','${element.data.prices}','${
        element.data.number
      }','${element.data.date}','${
        element.userid
      }')" class="btn btn-warning">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteAppartmentFromFirebase('${
              element.userid
            }')">Delete</button>
            </p>
          </div>
        </div>
        </div>
      </div>
      `;
    });
  } else if (localStorage[`usertype`] == "StandartUser") {
    appartentsArray.forEach((element) => {
      if (element.data.userID == localStorage["userid"]) {
        document.getElementById("cardsDisplayAppartments").innerHTML += `
            <div class="card border-${check(
              element.data.counter
            )} mb-3" style="max-width: 900px;" >
        <div class="row no-gutters">
          <div class="col-md-4">
            <img style="padding:10px" src="${element.data.imageURL}" alt="">
          </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><i style="color:#007bff;font-style:normal;font-weight: bold;">${
              element.data.title
            }</i></h5>
            <p class="card-text">${element.data.text}</p>
            <p class="card-text"><i style="color:#007bff;font-style:normal;font-weight: bold;">Location</i>: ${
              element.data.location
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Rooms</i> : ${
              element.data.rooms
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Appartment length </i>: ${
              element.data.length
            }(M)<sup>2</sup>
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Price </i> : ${
              element.data.prices
            }<i style="color:green;font-style:normal;font-weight: bold;"> $ </i> 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Phone Number </i> : ${
              element.data.number
            } 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Avalvaible before: </i> ${
              element.data.date
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Currently booked by : </i> ${
              element.data.counter
            } <i style="color:green;font-style:normal;font-weight: bold;"> user </i>
            </p>
            <p class="card-text"><button type="button" onclick="editAppartment('${
              element.data.title
            }','${element.data.text}','${element.data.location}','${
          element.data.rooms
        }','${element.data.length}','${element.data.prices}','${
          element.data.number
        }','${element.data.date}','${
          element.userid
        }')" class="btn btn-warning">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteAppartmentFromFirebase('${
              element.userid
            }')">Delete</button>
            </p>
          </div>
        </div>
        </div>
      </div>
      `;
      } else {
        document.getElementById("cardsDisplayAppartments").innerHTML += `
            <div class="card border-${check(
              element.data.counter
            )} mb-3" style="max-width: 900px;" >
        <div class="row no-gutters">
          <div class="col-md-4">
            <img style="padding:10px" src="${element.data.imageURL}" alt="">
          </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><i style="color:#007bff;font-style:normal;font-weight: bold;">${
              element.data.title
            }</i></h5>
            <p class="card-text">${element.data.text}</p>
            <p class="card-text"><i style="color:#007bff;font-style:normal;font-weight: bold;">Location</i>: ${
              element.data.location
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Rooms</i> : ${
              element.data.rooms
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Appartment length </i>: ${
              element.data.length
            }(M)<sup>2</sup>
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Price </i> : ${
              element.data.prices
            }<i style="color:green;font-style:normal;font-weight: bold;"> $ </i> 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Phone Number </i> : ${
              element.data.number
            } 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Avalvaible before: </i> ${
              element.data.date
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Currently booked by : </i> ${
              element.data.counter
            } <i style="color:green;font-style:normal;font-weight: bold;"> user </i></p>
            <p class="card-text"><button type="button" class="btn btn-success" onclick="updateUserBook('${
              element.userid
            }','${element.data.counter}')">Book</button>
            </p>
          </div>
        </div>
        </div>
      </div>
      `;
      }
    });
  } else {
    appartentsArray.forEach((element) => {
      document.getElementById("cardsDisplayAppartments").innerHTML += `
            <div class="card border-${check(
              element.data.counter
            )} mb-3" style="max-width: 900px;" >
        <div class="row no-gutters">
          <div class="col-md-4">
            <img style="padding:10px" src="${element.data.imageURL}" alt="">
          </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><i style="color:#007bff;font-style:normal;font-weight: bold;">${
              element.data.title
            }</i></h5>
            <p class="card-text">${element.data.text}</p>
            <p class="card-text"><i style="color:#007bff;font-style:normal;font-weight: bold;">Location</i>: ${
              element.data.location
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Rooms</i> : ${
              element.data.rooms
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Appartment length </i>: ${
              element.data.length
            }(M)<sup>2</sup>
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Price </i> : ${
              element.data.prices
            }<i style="color:green;font-style:normal;font-weight: bold;"> $ </i> 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Phone Number </i> : ${
              element.data.number
            } 
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Avalvaible before: </i> ${
              element.data.date
            }
            <br><i style="color:#007bff;font-style:normal;font-weight: bold;">Currently booked by : </i> ${
              element.data.counter
            } <i style="color:green;font-style:normal;font-weight: bold;"> user </i></p>
            </p>
          </div>
        </div>
        </div>
      </div>
      `;
    });
  }
}
//////////////////////////////////////////////////////////////
setTimeout(() => {
  displayAppartmentsCounter();
  displayCards();
}, 1000);

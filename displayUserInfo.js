function goMainPage() {
  window.location.href = "./index.html";
}
if (
  localStorage[`usertype`] == undefined ||
  localStorage["userid"].length == 9 ||
  localStorage["usertype"] == "undefined"
) {
  //not logined
  $("#displaySideBar").html(`
    <div class="sidebar-container">
         <div class="sidebar-logo" onclick="goMainPage()">
            Travel More
        </div>
        <ul class="sidebar-navigation">
            <li class="header">Navigation</li>
            <li>
                <a href="./index.html">
                    <i class="fa fa-home" aria-hidden="true"></i> Homepage
                </a>
            </li>
            <li>
                <a href="./news.html">
                    <i class="fa fa-file-alt" aria-hidden="true"></i> News
                </a>
            </li>
            <li>
                <a style="font-size:15px" href="./apartments.html">
                    <i class="fa fa-building" aria-hidden="true"></i> View Appartments
                </a>
            </li>
            <li class="header">Information</li>
            <li>
                <a onclick="Contact()">
                    <i class="fa fa-address-book" aria-hidden="true"></i> Contact
                </a>
            </li>
            <li>
                <a onclick="information()">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Information
                </a>
            </li>
            <li class="header">User detail</li>
            <div class="user-face" id="user-face">
                <i class="fas fa-user"></i>
                <p>Currently you are not <br> authorized in page</p>
            </div>
            <li class="header">Authorization</li>
            <li>
                <a href="./login.html">
                    <i class="fa fa-sign-in-alt" aria-hidden="true"></i> Log in
                </a>
            </li>
            <li>
                <a href="./register.html">
                    <i class="fa fa-book-open" aria-hidden="true"></i> Register
                </a>
            </li>
            <li class="header bigger">You found it</li>
            <div class="copyright">
                <p>Copyright ©2021 <br> All rights reserved</p>
            </div>
            
        </ul>
    </div>
    `);
} else if (localStorage[`usertype`] == "StandartUser") {
  //standart user
  let myObject = JSON.parse(window.localStorage.getItem("currentUserArray"));
  let name = myObject[0];
  let surname = myObject[1];
  $("#displaySideBar").html(`
    <div class="sidebar-container">
        <div class="sidebar-logo" onclick="goMainPage()">
            Travel More
        </div>
        <ul class="sidebar-navigation">
            <li class="header">Navigation</li>
            <li>
                <a href="./index.html">
                    <i class="fa fa-home" aria-hidden="true"></i> Homepage
                </a>
            </li>
            <li>
                <a href="./news.html">
                    <i class="fa fa-file-alt" aria-hidden="true"></i> News
                </a>
            </li>
            <li>
                <a style="font-size:15px" href="./uploadAppartment.html">
                    <i class="fa fa-file-upload" aria-hidden="true"></i> Upload Appartment
                </a>
            </li>
            <li>
                <a style="font-size:15px" href="./apartments.html">
                    <i class="fa fa-building" aria-hidden="true"></i> View Appartments
                </a>
            </li>
            <li class="header">Information</li>
            <li>
                <a onclick="Contact()">
                    <i class="fa fa-address-book" aria-hidden="true"></i> Contact
                </a>
            </li>
            <li>
                <a onclick="information()">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Information
                </a>
            </li>
            <li class="header">User detail</li>
            <div class="user-face" id="user-face">
                <i class="fas fa-user"></i>
                <p>${name}<br>${surname}<br>Account Type: <span style="color:#2574a9">Client</span></p>
            </div>
            <li class="header">Authorization</li>
            <li>
                <a href="./settings.html">
                    <i class="fa fa-cog" aria-hidden="true"></i> Settings
                </a>
            </li>
            <li>
                <a onclick="logOut()">
                    <i class="fa fa-outdent" aria-hidden="true"></i> Log Out
                </a>
            </li>
            <li class="header bigger">You found it</li>
            <div class="copyright">
                <p>Copyright ©2021 <br> All rights reserved</p>
            </div>
        </ul>
    </div>
    `);
} else {
  //admin
  let myObject = JSON.parse(window.localStorage.getItem("currentUserArray"));
  let name = myObject[0];
  let surname = myObject[1];
  $("#displaySideBar").html(`
    <div class="sidebar-container">
        <div class="sidebar-logo" onclick="goMainPage()">
            Travel More
        </div>
        <ul class="sidebar-navigation">
            <li class="header">Navigation</li>
            <li>
                <a href="./index.html">
                    <i class="fa fa-home" aria-hidden="true"></i> Homepage
                </a>
            </li>
            <li>
                <a href="./news.html">
                    <i class="fa fa-file-alt" aria-hidden="true"></i> News
                </a>
            </li>
            <li>
                <a style="font-size:15px" href="./uploadAppartment.html">
                    <i class="fa fa-file-upload" aria-hidden="true"></i> Upload Appartment
                </a>
            </li>
            <li>
                <a style="font-size:15px" href="./apartments.html">
                    <i class="fa fa-building" aria-hidden="true"></i> View Appartments
                </a>
            </li>
            <li class="header">Information</li>
            <li>
                <a onclick="Contact()">
                    <i class="fa fa-address-book" aria-hidden="true"></i> Contact
                </a>
            </li>
            <li>
                <a onclick="information()">
                    <i class="fa fa-info-circle" aria-hidden="true"></i> Information
                </a>
            </li>
            <li class="header">User detail</li>
            <div class="user-face" id="user-face">
                <i class="fas fa-user"></i>
                <p>${name}<br>${surname}<br>Account Type: <span style="color:red">Admin</span></p>
            </div>
            <li class="header">Authorization</li>
            <li>
                <a href="./settings.html">
                    <i class="fa fa-cog" aria-hidden="true"></i> Settings
                </a>
            </li>
            <li>
                <a href="./systemManager.html">
                    <i class="fa fa-tachometer-alt" aria-hidden="true"></i> Dashboard
                </a>
            </li>
            <li>
                <a onclick="logOut()">
                    <i class="fa fa-outdent" aria-hidden="true"></i> Log Out
                </a>
            </li>
            <div class="copyright">
                <p>Copyright ©2021 <br> All rights reserved</p>
            </div>
        </ul>
    </div>
    `);
}

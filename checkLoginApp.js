if (
  localStorage[`usertype`] == "StandartUser" ||
  localStorage[`usertype`] == "Admin"
) {
} else {
  window.location.href = "./index.html";
}

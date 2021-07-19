function writePostCounter() {
  setTimeout(() => {
    $("#Counter").html(`Currently there are ${postsArray.length} post :`);
    writeCardPost();
  }, 1000);
}

function writeCardPost() {
  postsArray.forEach((element) => {
    document.getElementById(`displayPost`).innerHTML += `
    <div class="card mb-3" style="max-width: 800px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${element.data.imageURL}" alt="Photo not found">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element.data.title}</h5>
            <p class="card-text">${element.data.text}</p>
            <p class="card-text"><small class="text-muted">${element.data.date}</small></p>
          </div>
        </div>
      </div>
    </div>
    `;
  });
}

///////////////////////////////////////////
writePostCounter();

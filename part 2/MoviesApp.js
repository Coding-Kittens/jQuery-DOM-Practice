class Rating {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
    this.tr;
  }

  addToTable() {
    let nameTd = $("<td>").text(this.name);
    let rateTd = $("<td>").text(this.rating);
    let xTd = $("<td>").text("X");
    let newTr = $("<tr>").append(nameTd).append(rateTd).append(xTd);
    this.tr = newTr;
    xTd.on("click", this.removeFromTable.bind(this, this.name));
    $("table tbody").append(newTr);
  }

  removeFromTable(movieName) {
    this.tr.remove();
    currentUser.ratingNames.delete(movieName);
  }
}

if (localStorage.SavedUsers !== undefined) {
  changeSignIN("signOut");
  load();
}

$(".ratingForm").submit((event) => {
  event.preventDefault();
  let mName = $('input[name ="movName"]').val();
  let rNum = +$('input[name ="ratingNum"]').val();

  if (rNum > 10) {
    rNum = 10;
  }

  if (rNum < 0 || Number.isNaN(rNum)) {
    rNum = 0;
  }

  if (currentUser.ratingNames.has(mName)) {
    alert(
      "This movie already has a rating. If you would like to change it, please remove the existing one first!"
    );
  } else {
    currentUser.ratingNames.add(mName);
    newRating = new Rating(mName, rNum);
    newRating.addToTable();
    currentUser.ratings.push(newRating);
  }

  $('input[name ="movName"]').val("");
  $('input[name ="ratingNum"]').val("");
});

$(".settings").on("click", "button", (event) => {
  if (event.target.className === "settingBtn") {
    changeSignIN(event.target.name);
  }
});

$(".extraSettings").on("click", "button", (event) => {
  if (event.target.name === "deleteU") {
    userNamesList.delete(currentUser.name);
    userList.splice(getindexByUserName(currentUser.name), 1);
    currentUser = null;
    if (userList.length > 0) {
      changeSignIN("signOut");
    } else {
      changeSignIN("addNew");
    }
  }
  if (event.target.name === "sortR") {
    currentUser.sortByRating();
  }
  if (event.target.name === "sortA") {
    currentUser.sortByName();
  }
  if (event.target.name === "savelist") {
    save();
    load();
  }
});

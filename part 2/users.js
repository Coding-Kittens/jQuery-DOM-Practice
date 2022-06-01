let userList = [];
let userNamesList = new Set();
let currentUser;
let isSigningIn = false;

// localStorage.clear();

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.ratings = [];
    this.ratingNames = new Set();
    this.isLeastToGreatest = false;
  }

  resetRatingboard() {
    let trs = $("tbody tr").get();

    for (let i = 1; i < trs.length; i++) {
      trs[i].remove();
    }

    for (let rate of this.ratings) {
      rate.addToTable();
    }
  }

  sortByName() {
    let orderList = [];
    let tempArr = [...this.ratings];
    this.ratings = [];

    for (let rate of tempArr) {
      orderList.push(rate.name);
    }

    orderList.sort();

    for (let rate of orderList) {
      for (let arr of tempArr) {
        if (arr.name === rate) {
          this.ratings.push(arr);
          break;
        }
      }
    }

    this.resetRatingboard();
  }

  sortByRating() {
    this.isLeastToGreatest = !this.isLeastToGreatest;
    let ratingNums = [];
    let tempArr = [...this.ratings];
    this.ratings = [];

    for (let rate of tempArr) {
      ratingNums.push(rate.rating);
    }

    if (this.isLeastToGreatest) {
      ratingNums.sort(function (a, b) {
        return a - b;
      });
    } else {
      ratingNums.sort(function (a, b) {
        return b - a;
      });
    }

    for (let rate of ratingNums) {
      for (let arr of tempArr) {
        if (arr.rating === rate) {
          this.ratings.push(arr);
          break;
        }
      }
    }

    this.resetRatingboard();
  }
}

const getUserByUserName = (name) => userList.find((user) => user.name === name);
const getindexByUserName = (name) =>
  userList.findIndex((user) => user.name === name);
const checkIfCorrectPassword = (user, password) =>
  user.password === password ? true : false;

$(".userForm").submit((event) => {
  event.preventDefault();
  let userName = $('input[name ="userName"]').val();
  let userPassword = $('input[name ="password"]').val();

  if (userNamesList.has(userName)) {
    if (isSigningIn) {
      if (checkIfCorrectPassword(getUserByUserName(userName), userPassword)) {
        currentUser = getUserByUserName(userName);

        currentUser.resetRatingboard();

        $(".ratingForm header").text(`${userName}'s Movie Ratings`);
        $(".settings h2").text(`Signed in as ${userName}`);
        $(".userForm").addClass("hiddenObj");
        $(".ratingForm").removeClass("hiddenObj");
      } else {
        alert("Wrong password, try agian");
      }
    } else {
      alert("This Username already exists, please pick a different one.");
    }
  } else {
    let newUser = new User(userName, userPassword);
    userList.push(newUser);
    currentUser = newUser;

    currentUser.resetRatingboard();

    $(".ratingForm header").text(`${userName}'s Movie Ratings`);
    $(".settings h2").text(`Signed in as ${userName}`);
    $(".userForm").addClass("hiddenObj");
    $(".ratingForm").removeClass("hiddenObj");
  }

  $('input[name ="userName"]').val("");
  $('input[name ="password"]').val("");
  save();
  load();
});

function load() {
  userList = [];
  userNamesList.clear();
  let arr = JSON.parse(localStorage.SavedUsers);
  for (let a of arr) {
    let tempUser = new User(a.name, a.password);

    tempUser.ratingNames = new Set(a.ratingNames);

    for (let r of a.ratings) {
      tempUser.ratings.push(new Rating(r.name, r.rating));
    }
    userList.push(tempUser);
    userNamesList.add(a.name);
  }
  if (currentUser) {
    currentUser = getUserByUserName(currentUser.name);
  }
}

function save() {
  let tempList = [...userList];
  for (let user of tempList) {
    user.ratingNames = [...user.ratingNames];
  }
  let stringList = JSON.stringify(tempList);
  localStorage.setItem("SavedUsers", stringList);
}

$("window").on("unload", () => {
  save();
});

function changeSignIN(name) {
  switch (name) {
    case "signOut":
      isSigningIn = true;
      $(".userForm button").text("Sign in");
      break;
    case "change":
      isSigningIn = true;
      $(".userForm button").text("Change User");
      break;
    case "addNew":
      isSigningIn = false;
      $(".userForm button").text("Add New User");
      break;
    default:
      break;
  }

  $(".userForm").removeClass("hiddenObj");
  $(".ratingForm").addClass("hiddenObj");
}

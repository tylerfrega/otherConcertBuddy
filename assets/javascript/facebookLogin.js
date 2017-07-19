var config = {
    apiKey: "AIzaSyBC3mucjEhRSpJekVleIkecZdjSQGw0lMw",
    authDomain: "otherconcertbuddy.firebaseapp.com",
    databaseURL: "https://otherconcertbuddy.firebaseio.com",
    projectId: "otherconcertbuddy",
    storageBucket: "otherconcertbuddy.appspot.com",
    messagingSenderId: "791490040251"
};
firebase.initializeApp(config);


var concertBuddy = null; 
var signedIn = false;




function signIn(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  getInfo();
  replaceLogin();
  // ...
}).catch(function(error) {
  console.log(error);
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  });
}
function makeUser(name, email, photo, id){
	var user = {
		name: name,
		email: email,
		photo: photo,
		id: id
	}
	return user;
  console.log(user);
}

function getInfo(){
	var user = firebase.auth().currentUser;
  if (user != null) {
  	concertBuddy = makeUser(user.displayName, user.email, user.photoURL, user.uid);
  }

}

function signOut(){
	firebase.auth().signOut().then(function(){
		console.log("signed out");
		concertBuddy = null;
		provider = null;
	}).catch(function(error){
		console.log(error.code);
	});
}

function replaceLogin(){
  $("#login").hide();
 
  var pic = $("<img>").attr("src", concertBuddy.photo)
                      .attr("data-name", concertBuddy.name)
                      .addClass("img-responsive")
                      .addClass("profile-pic");
  var userPic = $("<li>").append(pic);
  var userName = $("<li>").append(concertBuddy.name);
  $("#signInOut").append(userPic)
                .append(userName);
}

$(document).ready(function(){
  $("#login").on("click", function(){
    if(concertBuddy === null && signedIn === false){
      signIn();
    }

  });
});
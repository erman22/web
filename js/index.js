firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    document.getElementById("navbar_div").style.display = "block";
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

        var email_id = user.email;
        document.getElementById("user_para").innerHTML = email_id;

    }

    } else {
    // No user is signed in.
    document.getElementById("navbar_div").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

    }
});

function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
    window.alert("Regsitrasi success" + data);
    window.location.href = "../pages/index.html";
    
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Regsistrasi failled!!")
    });
}

function login(){

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
    });

}

function logout(){
    firebase.auth().signOut();
}

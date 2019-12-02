var Name;
firebase.auth().onAuthStateChanged(function(user, displayName, photoURL) {
    if (user) {
        //get the current user
        var user = firebase.auth().currentUser;

    }
    //if the user does NOT equal null
    if (user != null) {
        if (window.location.href.indexOf("Dash") != -1) {
            var label = document.getElementById('label');
            var welcome = document.getElementById('welcome');
            var message = document.getElementById('message');
            var email = document.getElementById('Email');
            var partyname = document.getElementById('name');
            var name = user.displayName;
            Name = name;
            var title = name + " Feed";
            partyname.innerHTML = name;
            email.innerHTML = user.email;
            welcome.innerHTML = "Welcome " + name;
            label.innerHTML = title;
            message.innerHTML = "Post a new Gweet";
        }
        var icon = document.getElementById('icon');
        console.log("ok boomer");
        if (window.location.href.indexOf("Grades") != -1) {
        	history();
        }
        if (window.location.href.indexOf("Dash") != -1 || window.location.href.indexOf("Settings") != -1 || window.location.href.indexOf("Grades") != -1) {
            if (user.photoURL == null || user.photoURL == " ") {
                console.log("no image");
                console.log(user.photoURL);
                icon.src = "img/logo.png"
            } else {
                console.log(user.photoURL);
                console.log("image uploaded");
                document.getElementById('icon').src = firebase.auth().currentUser.photoURL
                console.log(icon.src);
            }
        }
        if (window.location.href.indexOf("Settings") != -1) {
            document.getElementById("label").innerHTML = user.displayName + "Settings";

            if (user.photoURL == null || user.photoURL == " ") {
                console.log("no image");
                document.getElementById('display').src = "img/logo.png"
            } else {
                document.getElementById('display').src = firebase.auth().currentUser.photoURL
            }
        }

    } else {

    }
});

function IsOnIN() {
    var form = document.getElementById('signform');
    var signin = document.getElementById('signin');
    var signinbutton = document.getElementById('signIn')
    var title = document.getElementById('title');
    var back = document.getElementById('back');
    var main = document.getElementById('main');
    if (form.style.display == 'none') {
        form.style.display = 'block';
        signin.style.display = 'block';
        main.style.display = 'none';
        signinbutton.style.display = 'block';
        back.style.display = 'block';
        title.innerHTML = "Sign In";

    } else {
        form.style.display = 'none'
    }
    // body...
}

function IsOnUP() {
    var form = document.getElementById('signform');
    var signin = document.getElementById('signin');
    var signup = document.getElementById('signup');
    var signupbutton = document.getElementById('signUp');
    var title = document.getElementById('title');
    var back = document.getElementById('back');
    var main = document.getElementById('main');
    var admin = document.getElementById("admin");
    if (form.style.display == 'none') {
        form.style.display = 'block';
        signup.style.display = 'block';
        signin.style.display = 'block';
        main.style.display = 'none';
        signupbutton.style.display = 'block';
        back.style.display = 'block';
        title.innerHTML = "Sign Up";

    } else {
        form.style.display = 'none'
    }

    // body...
}

function back() {
    window.location = "index.html";
}

function login() {
    var addUser = firebase.database().ref().child("Admin");
    var s = "Dash.html";
    var int = null;
    var userEmail = document.getElementById('email').value;
    var userPass = document.getElementById('pass').value;
    addUser.on('value',snap=>{

        snap.forEach(dash=>{
            dash.forEach(free=>{
            console.log(dash.val());
            if(free.val()==userEmail){
                s = "Admin.html";
            }
        });
        });
    

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert('Incorrect username or password.');

        // ...
    });
    setTimeout(function() { window.location = s; }, 1000);
    });

    if (int == null) {
        return;
    }
}

function signup() {
    console.log("oof");
    var code = document.getElementById('code').value;
    var party = document.getElementById('party').value;
    var pass = document.getElementById('pass').value;
    var email = document.getElementById('email').value;
    if (code === "" || code === null || code === " ") {
        alert("Enter a code");
        return;
    }
    if (party === "" || party === null || party === " ") {
        alert("Enter a party");
        return;
    }
    if (!email.includes("@")) {
        alert("Enter a valid email");
        return;
    }
    if (pass === "" || pass === null || pass === " ") {
        alert("Enter a password");
        return;
    }

    if (!party.includes("party") || !party.includes("Party")) {
        console.log(party);
        party = party + " party";
        console.log(party);

    }

    const codes = firebase.database().ref("Codes");
    codes.on('value', snap => {
        console.log(snap.val());
        var valid = false;
        snap.forEach(child => {
            if (child.key == code) {
                console.log(code);
                valid = true;
                var addUser = firebase.database().ref().child("User");
                var addparty = addUser.child(party);
                var addinfo = addparty.child(child.key);
                var add = addinfo.set(child.val());
            }

        });
    });
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {
        var user = firebase.auth().currentUser;
        logUser(user); // Optional
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });

    function logUser(user, displayName) {
        user.updateProfile({
            displayName: party

        }).then(function(user) {
            window.location = "Dash.html";

        }).catch(function(error) {

            console.log("OOOF")
        })
    }

}
function Asignup(){
    console.log("oof");
    var code = document.getElementById('code').value;
    var party = document.getElementById('party').value;
    var pass = document.getElementById('pass').value;
    var email = document.getElementById('email').value;
    if (code != "") {
        alert("Admin does not need a code");
        return;
    }
    if (party === "" || party === null || party === " ") {
        alert("Enter a party");
        return;
    }
    if (!email.includes("@")) {
        alert("Enter a valid email");
        return;
    }
    if (pass === "" || pass === null || pass === " ") {
        alert("Enter a password");
        return;
    }


        party = party;
        console.log(party);

    
           
                console.log(code);
                valid = true;
                var addUser = firebase.database().ref().child("Admin");
                var addparty = addUser.child(party);
                var addinfo = addparty.child("email").set(email);
            
            

    
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {
        var user = firebase.auth().currentUser;
        logUser(user); // Optional
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });

    function logUser(user, displayName) {
        user.updateProfile({
            displayName: party

        }).then(function(user) {
            window.location = "Dash.html";

        }).catch(function(error) {

            console.log("OOOF")
        })
    }

}

function logout() {
    firebase.auth().signOut();
    window.location = "index.html"


}
var post = []
if (window.location.href.indexOf("Dash") != -1) {
    window.onload = setTimeout(function() { getMessages() }, 2000);
}

function getMessages(user, photoURL, displayName) {

    var user = firebase.auth().currentUser;
    var database = firebase.database().ref('Messages').limitToLast(50)
    console.log(user.displayName, 1111);
    var datar = firebase.database().ref("User").child(user.displayName);
    database.on('value', snap => {
        var counter = 0;

        snap.forEach(bless => {
            datar.on("value", snap => {
                snap.forEach(chill => {
                    if (bless.key == chill.key) {
                        bless.forEach(tee => {
                            tee.forEach(mess => {
                                console.log(counter);
                                var element = document.getElementById(counter);

                                //If it isn't "undefined" and it isn't "null", then it exists.
                                if (typeof(element) != 'undefined' && element != null) {
                                    console.log("exists");
                                    counter++;
                                } else {

                                    console.log("Already here");

                                    var node = document.createElement("div");
                                    var h2 = document.createElement("h2");
                                    var img = document.createElement("img");
                                    var p = document.createElement("p");
                                    var div = document.createElement("div");
                                    var textarea = document.createElement("textarea");
                                    var a = document.createElement("a");
                                    var br = document.createElement("br");

                                    if (user.photoURL === null || user.photoURL === " ") {

                                        console.log("no image");
                                        console.log(user.photoURL);
                                        img.src = "img/logo.png"
                                    } else {
                                        console.log(user.photoURL);
                                        console.log("image uploaded");
                                        img.src = firebase.auth().currentUser.photoURL
                                        console.log(icon.src);
                                    }
                                    var message = document.createTextNode(mess.val()); // Create a <li> node
                                    var textnode = document.createTextNode(mess.key); // Create a text node
                                    var blank;

                                    p.appendChild(message);
                                    if (counter == 0) {
                                        blank = -100;
                                    } else {
                                        blank = (-counter);
                                    }
                                    h2.classList.add("titlel");
                                    img.setAttribute("width", "20%");
                                    img.setAttribute("height", "20%");
                                    a.setAttribute("onclick", "gweetr(document.getElementById(" + counter + ").value,document.getElementById(" + blank + ").innerText)");
                                    a.setAttribute("uk-icon", "play");
                                    textarea.setAttribute("placeholder", "Reply...");
                                    h2.setAttribute("id", blank);
                                    textarea.setAttribute("id", counter);
                                    p.classList.add("type");
                                    img.classList.add("imgset");
                                    img.classList.add("circle");
                                    node.classList.add("uk-card");
                                    node.classList.add("uk-card-body");
                                    node.classList.add("uk-width-1-8@m");
                                    node.classList.add("uk-card-default");
                                    node.classList.add("round");
                                    node.setAttribute("uk-scrollspy", "cls:uk-animation-fade; delay: 200; repeat: true")
                                    div.classList.add("move");
                                    h2.appendChild(img);
                                    h2.appendChild(textnode);
                                    div.appendChild(h2);
                                    node.appendChild(div);
                                    node.appendChild(p);
                                    node.appendChild(textarea);
                                    node.appendChild(br);
                                    node.appendChild(a); // Append the text to <li>
                                    document.getElementById("messages").appendChild(node);
                                    counter++;

                                }



                            });
                        });
                    }
                })
            })

        });
    });



}
if (window.location.href.indexOf("Admin") != -1) {
    window.onload = setTimeout(function() { getcodes() }, 2000);
}
function getcodes(){
 var access = firebase.database().ref("Codes");
 // var counter = 0;
 access.on("value", snap=>{
    
    var counter = 0;
    snap.forEach(bless=>{
        var element = document.getElementById(counter);
        console.log(counter)
        if(typeof(element) != 'undefined' && element != null) {
           console.log("exists");
           counter++;
        }
        else{
        var node = document.createElement("div");
        var h2 = document.createElement("h2");
        h2.setAttribute("id", counter);
        var textnode = document.createTextNode(bless.key);
        h2.appendChild(textnode);
        node.appendChild(h2);
        document.getElementById("link").appendChild(node);
        counter++

    }
    });
 });

}
function addcode(){
 var access = firebase.database().ref("Codes");
 var input = document.getElementById("coded").value;
 if(input == "" || input == null || input == " "){
    alert("no code has been entered")
    return;
 }
 else{
    var worker = access.child(input).set(1);
 }

}
function remcode(){
var access = firebase.database().ref("Codes");
var input = document.getElementById("coded").value;
var btnd = document.getElementById("btnd");
 if(input == "" || input == null || input == " "){
    alert("no code has been entered")
    return;
 }
  else{
    var worker = access.child(input).set(null);
    btnd.innerHTML = "Removing...";
    setTimeout(function() {window.location = "Admin.html"}, 2000);
 }
}

function gweetr(mesage, name) {
    var user = firebase.auth().currentUser;
    console.log(mesage, user.displayName);
    if (mesage === null || mesage === " " || mesage == "") {
        return;
    }
    var d = new Date();

    var b = 1 * d.getHours()
    if (d.getSeconds() < 10) {
        var s = -d.getSeconds() * 10;
    } else {
        var s = -d.getSeconds();
    }
    var m = d.getMinutes()

    console.log(b);
    const date = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear() + "," + b + ":" + m + ":" + s
    var data = firebase.database().ref("User").child(user.displayName);
    data.on("value", snap => {

        var base = firebase.database().ref("Messages").child(snap.key);
        var database = base.child(date);
        var e = database.child(user.displayName).set("@" + name + " " + mesage);
    });
    // setTimeout(function() {window.location = "Dash.html"}, 300);





}

function gweet(mesage) {
    var user = firebase.auth().currentUser;
    console.log(mesage, user.displayName);
    if (mesage === null || mesage === " " || mesage == "" || mesage == "undefined") {
        return;
    }
    var d = new Date();

    var b = 1 * d.getHours()
    if (d.getSeconds() < 10) {
        var s = -d.getSeconds() * 10;
    } else {
        var s = -d.getSeconds();
    }
    var m = d.getMinutes()

    console.log(b);
    const date = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear() + "," + b + ":" + m + ":" + s
    var data = firebase.database().ref("User").child(user.displayName);
    data.on("value", snap => {
        snap.forEach(chill => {
            var base = firebase.database().ref("Messages").child(chill.key);
            var database = base.child(date);
            var e = database.child(user.displayName).set(mesage);
        });
        window.location = "Dash.html"
    });







}

function updateimage(user, photoURL) {
    var phototype = document.getElementById('typer').value;
    var user = firebase.auth().currentUser;
    user.updateProfile({

        photoURL: phototype
    }).then(function() {

    }).catch(function(error) {
        // An error happened.
        console.log("uhoh");
    });
    // console.log("Ok");
    //  var icon = document.getElementById('icon');
    //  icon.src = user.photoURL.src;
    console.log("image is updated");
    document.getElementById('display').src = phototype;
    document.getElementById('icon').src = phototype;
    tom = 0;

}

function updateimagefile(user, photoURL) {
    var user = firebase.auth().currentUser;

    var url = ""
    const file = document.querySelector('#updat').files[0];
    console.log(file.name);
    const ref = firebase.storage().ref();
    ref.child(user.uid).put(file);
    ref.child(user.uid).getDownloadURL().then(function(ur) {
        url = ur;
        document.getElementById('display').src = url;
        document.getElementById('icon').src = url;
        user.updateProfile({

            photoURL: url
        }).then(function() {

        }).catch(function(error) {
            // An error happened.
            console.log("uhoh");
        });
        tom = 1;
    });




}
// if (window.location.href.indexOf("Grades") != -1) {
// 	var user = firebase.auth().currentUser;
	
//     window.onload = function bob() {
//     	while(user === null){
//     	var user = firebase.auth().currentUser;
//     	console.log("i");
//     }
//     history(user,user.photoURL)
// }
// }

function history(user,photoURL,displayName) {
	console.log("bruh");
	var user = firebase.auth().currentUser;
var datar = firebase.database().ref("User").child(user.displayName);
    var database = firebase.database().ref('Messages').limitToLast(50)
    database.on('value', snap => {
        var counter = 0;

        snap.forEach(bless => {
            datar.on("value", snap => {
                snap.forEach(chill => {
                    if (bless.key == chill.key) {
                        bless.forEach(tee => {

            var guides = tee.key; 
            tee.forEach(mess => {
                console.log(counter);
                var element = document.getElementById(counter);

                //If it isn't "undefined" and it isn't "null", then it exists.
                if (typeof(element) != 'undefined' && element != null) {
                    console.log("exists");
                    counter++;
                } else {

                    console.log("Already here");

                    var node = document.createElement("div");
                    var h2 = document.createElement("h2");
                    var img = document.createElement("img");
                    var p = document.createElement("p");
                    var div = document.createElement("div");
                    var textarea = document.createElement("textarea");
                    var a = document.createElement("a");
                    var h6 = document.createElement("h6");
                    var br = document.createElement("br");
                    var user = firebase.auth().currentUser;
                    if (user.photoURL === null || user.photoURL === " ") {

                        console.log("no image");
                        console.log(user.photoURL);
                        img.src = "img/logo.png"
                    } else {
                        console.log(user.photoURL);
                        console.log("image uploaded");
                        img.src = firebase.auth().currentUser.photoURL
                        console.log(icon.src);
                    }
                    var message = document.createTextNode(mess.val());
                    var messge = document.createTextNode(guides); // Create a <li> node
                    var textnode = document.createTextNode(mess.key);
                    if (mess.key == user.displayName) { // Create a text node
                        var blank;
                        h6.appendChild(messge);
                        p.appendChild(message);
                        if (counter == 0) {
                            blank = -100;
                        } else {
                            blank = (-counter);
                        }
                        h2.classList.add("titlel");
                        img.setAttribute("width", "20%");
                        img.setAttribute("height", "20%");
                        a.setAttribute("onclick", "gweetr(document.getElementById(" + counter + ").value,document.getElementById(" + blank + ").innerText)");
                        a.setAttribute("uk-icon", "play");
                        textarea.setAttribute("placeholder", "Reply...");
                        h2.setAttribute("id", blank);
                        textarea.setAttribute("id", counter);
                        p.classList.add("type");
                        img.classList.add("imgset");
                        img.classList.add("circle");
                        node.classList.add("uk-card");
                        node.classList.add("uk-card-body");
                        node.classList.add("uk-width-1-8@m");
                        node.classList.add("uk-card-default");
                        node.classList.add("round");
                        node.setAttribute("uk-scrollspy", "cls:uk-animation-fade; delay: 200; repeat: true")
                        div.classList.add("move");
                        h2.appendChild(img);
                        h2.appendChild(textnode);
                        div.appendChild(h2);
                        node.appendChild(div);
                        node.appendChild(p);
                        node.appendChild(h6);
                        node.appendChild(br);
                        // Append the text to <li>
                        document.getElementById("messages").appendChild(node);
                        counter++;

                    }
                }

                if (counter == 0) {
                    document.getElementById('ww').innerHTML = "No messages sent"
                }

            })


			})

};})});
        });
    });


}
// var checkref = firebase.database().ref('Messages');
// checkref.on('child_added', fix=>{

// });
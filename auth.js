/* 
 * requires: 
 * - firebase-auth 
 * - jquery
 */

function Auth(cfg) {
  this.onSignIn = cfg.onSignIn;
  this.onSignOut = cfg.onSignOut;
  this.userInfo = null
  this.init();
}

/**
 * init sets up UI event listeners and registers Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: called when the user is signed in or
 *    out, and that is where we update the UI.
 *  TODO:
 *  - add user name https://stackoverflow.com/questions/43509021/how-to-add-username-with-email-and-password-in-firebase
 */
Auth.prototype.init = function() {
  var auth = this;
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      auth.userInfo = {
        'displayName': user.displayName,
        'email': user.email,
        'emailVerified': user.emailVerified,
        'photoURL': user.photoURL,
        'isAnonymous': user.isAnonymous,
        'uid': user.uid,
        'providerData': user.providerData,
      };

      user.getIdToken().then(function(token) {
        auth.userInfo['token'] = token;
        auth.onSignIn();
      });
    } else {
      // User is signed out.
      auth.onSignOut();
    }
  });
}

/**
 * Handles the sign in button press.
 */
Auth.prototype.toggleSignIn = function(email, password)  {
  var auth = this;

  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    if (email.length < 4) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a longer password.');
      return;
    }
    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (errorCode === 'auth/user-not-found') {
        // auto-create new account
        auth.handleSignUp(email, password);
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}

/**
 * Handles the sign up button press.
 */
Auth.prototype.handleSignUp = function(email, password) {
  if (email.length < 4) {
    alert('Please enter a valid email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a longer password.');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * Sends an email verification to the user.
 */
Auth.prototype.sendEmailVerification = function() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    alert('Email Verification Sent!');
  });
}

Auth.prototype.sendPasswordReset = function(email) {
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alert('Password Reset Email Sent!');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

Auth.prototype.httpGet = function(url, cb) {
  var auth = this;

  $.ajax(url, {
    // Set header for the XMLHttpRequest to get data
    // from the web server for userIdToken
    headers: {
      //'Authorization': 'Bearer ' + auth.userInfo.token,
      'AuthToken': auth.userInfo.token
    }
  }).then(function(data){
    if (cb)
      cb(data);
  });
}

Auth.prototype.httpPost = function(url, data, cb) {
  var auth = this;

  $.ajax(url, {
    headers: {
      //'Authorization': 'Bearer ' + auth.userInfo.token,
      'AuthToken': auth.userInfo.token
    },
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
  }).then(function(data){
    if (cb)
      cb(data);
  });
}

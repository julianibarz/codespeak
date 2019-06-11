
export function createAuthentification() {
  function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('IDV: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/verifyUser');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onerror = function () {
      console.log("** An error occurred during the transaction");
    };
    xhr.onload = function () {
      console.log("Load completed.");
    };
    var serialized_json = JSON.stringify({'id_token': id_token});
    console.log('json: ' + serialized_json);
    xhr.send(serialized_json);
  }
  function onFailure(error) {
    console.log(error);
  }
  gapi.signin2.render('g-signin', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
  $("#g-signout").click(function() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function() {
     console.log('User signed out.');
   });
  });
}


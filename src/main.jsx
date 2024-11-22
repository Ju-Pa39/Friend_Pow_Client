import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function loadFacebookSDK() {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
      resolve();
    };

    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.onload = window.fbAsyncInit;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}

// Initialize Facebook SDK
loadFacebookSDK().then(() => {
  console.log("Facebook SDK loaded and initialized.");
});
ReactDOM.createRoot(document.getElementById('root')).render(

  <App />

)

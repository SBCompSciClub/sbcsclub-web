import firebase from "firebase/app";
import "firebase/auth";
import updateData from "./updateData.js";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export default function signInWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);

      const user = res.user;
      const reg = /@sbstudents.org$/;
      if (reg.test(user.email)) {
        let id = user.uid,
          name = user.displayName,
          email = user.email,
          photoURL = user.photoURL;

        cookies.set("fuid", id);
        const data = {
          id: id,
          name: name,
          email: email,
          photoURL: photoURL,
        };

        updateData(data);
      }
    })
    .catch((error) => {});
}

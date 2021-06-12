import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9DnCkGnCqrD6E5fNDpBx5e2tgmEICH4E",
  authDomain: "clubwebsite-b8644.firebaseapp.com",
  databaseURL: "https://clubwebsite-b8644-default-rtdb.firebaseio.com",
  projectId: "clubwebsite-b8644",
  storageBucket: "clubwebsite-b8644.appspot.com",
  messagingSenderId: "241694672931",
  appId: "1:241694672931:web:5109007c9b87676de70996",
  measurementId: "G-60PEQQ64X9",
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
export default function updateData(data) {
  return new Promise((resolve, rej) => {
    database
      .ref("admins")
      .set([
        "10021258@sbstudents.org",
        "10015337@sbstudents.org",
        "10019773@sbstudents.org",
        "10017054@sbstudents.org",
        "10017699@sbstudents.org",
        "10018360@sbstudents.org",
        "10016796@sbstudents.org",
        "10015630@sbstudents.org",
        "10017109@sbstudents.org",
        "10017013@sbstudents.org",
        "10018114@sbstudents.org",
        "10020485@sbstudents.org",
        "10021348@sbstudents.org",
        "10015635@sbstudents.org",
        "alexandria.robles@sbschools.org",
        "steven.schiff@sbschools.org",
      ]);
    database
      .ref("users/")
      .child(data.id)
      .once("value")
      .then((snapshot) => {
        let v = snapshot.val();

        if (!v) {
          database
            .ref("members/")
            .child(data.id)
            .set({
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            })
            .then(() => {
              resolve(200);
            });
        }
      });
  });
}

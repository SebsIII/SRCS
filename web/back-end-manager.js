import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, get, child, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyBQwBv0BO2bRitUFJtOIhgmC3l7lQBzIeI",
    authDomain: "srcs-db.firebaseapp.com",
    databaseURL: "https://srcs-db-default-rtdb.firebaseio.com",
    projectId: "srcs-db",
    storageBucket: "srcs-db.firebasestorage.app",
    messagingSenderId: "46496797062",
    appId: "1:46496797062:web:bf60bf1caa6fcf37f3dc07",
    measurementId: "G-TVVV1JRY1X",
    databaseURL: "https://srcs-db-default-rtdb.firebaseio.com/",
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function checkUserPsw(attemptedPsw, attemptedUser) {
  const dbRef = ref(database);
  try {
      const snapshot = await get(child(dbRef, `user-data/`));
      if (snapshot.exists()) {
          const data = snapshot.val();
          return attemptedPsw == data["psw"] && attemptedUser == data["user"];
      } else {
          console.log("No data available");
          return false;
      }
  } catch (error) {
      console.error(error);
      return false;
  }
}

export {checkUserPsw}
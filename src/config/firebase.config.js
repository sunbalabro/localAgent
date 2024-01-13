import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCeKmZhwis545rb0NrgfPOpFQzOpjcwqcg",
  authDomain: "localagent-1.firebaseapp.com",
  projectId: "localagent-1",
  storageBucket: "localagent-1.appspot.com",
  messagingSenderId: "66647178254",
  appId: "1:66647178254:web:0c5882aace68758bd7d05f",
  measurementId: "G-RQBBH66TSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
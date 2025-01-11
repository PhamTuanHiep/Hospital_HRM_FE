import "./App.scss";
import "./common/common.scss";
import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhMIdurDimKDsqM1Qqw6LSZD5q3-nSUg8",
  authDomain: "hospital-hrm.firebaseapp.com",
  projectId: "hospital-hrm",
  storageBucket: "hospital-hrm.firebasestorage.app",
  messagingSenderId: "857203554395",
  appId: "1:857203554395:web:d8e98db9b6ee94ca90a77e",
  measurementId: "G-HDS42S8GZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("analytics:", analytics);
function App() {
  return (
    <div>
      <>
        <Flex vertical id="hhrm-ui">
          <HeaderComponent />
          <div id="container">
            <div id="content">
              <Outlet />
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <FooterComponent />
        </Flex>
      </>
    </div>
  );
}

export default App;

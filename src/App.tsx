import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Outlet } from "react-router-dom";
import { Flex, Layout } from "antd";
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";
import HomePage from "./components/homepage/HomePage";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div>
      <>
        <Flex vertical>
          <HeaderComponent />
          <Outlet />
          <FooterComponent />
        </Flex>
      </>
      {/* <ToastContainer
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
      /> */}
    </div>
  );
}

export default App;

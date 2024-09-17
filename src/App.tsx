import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Flex } from "antd";
import { Footer } from "antd/es/layout/layout";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <>
        <Flex vertical>
          <Header />
          <Outlet />
          <Footer />
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

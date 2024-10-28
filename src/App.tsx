import "./App.scss";
import "./common/common.scss";
import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const { Header, Content, Footer, Sider } = Layout;

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

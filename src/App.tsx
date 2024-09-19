import "./App.scss";
import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <div>
      <>
        <Flex vertical>
          <HeaderComponent />
          <Outlet />
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

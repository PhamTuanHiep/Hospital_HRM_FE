import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import "./CustomBreadcrumb.scss";
import { ReactNode } from "react";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";

interface CustomBreadcrumbProps {
  breadcrumbItems?: BreadcrumbItemType[];
  buttonGroup?: ReactNode;
}
const CustomBreadcrumb = ({
  breadcrumbItems,
  buttonGroup,
}: CustomBreadcrumbProps) => {
  const location = useLocation();
  const urlSegments = location.pathname.split("/");
  const isManagementScreen = urlSegments[1] === "manager" ? true : false;

  const menuItems = [
    {
      title: (
        <div>
          <a href="/">
            <HomeOutlined />
            <span>Homepage</span>
          </a>
        </div>
      ),
    },
  ];
  const newMenuItems =
    breadcrumbItems && breadcrumbItems.length !== 0
      ? [...menuItems, ...breadcrumbItems]
      : menuItems;

  // const menuItems = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.alipay.com/"
  //       >
  //         General
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.taobao.com/"
  //       >
  //         Layout
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.tmall.com/"
  //       >
  //         Navigation
  //       </a>
  //     ),
  //   },
  // ];
  return (
    <>
      {isManagementScreen && menuItems ? (
        <div id="custom-breadcrumb">
          <Breadcrumb items={newMenuItems} />
          <div>{buttonGroup}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default CustomBreadcrumb;

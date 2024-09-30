import { useTranslation } from "react-i18next";

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useMemo } from "react";

const Language = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (language: any) => {
    i18n.changeLanguage(language);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => handleChangeLanguage("en")}>English</div>,
    },
    {
      key: "2",
      label: <div onClick={() => handleChangeLanguage("vi")}>Vietnam</div>,
    },
  ];

  const isVN = useMemo(() => i18n.language === "vi", [i18n.language]);
  return (
    <>
      <Dropdown
        className="language"
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: [isVN ? "2" : "1"],
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space className="language-space">
            {isVN ? "Việt Nam" : "English"}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};
export default Language;

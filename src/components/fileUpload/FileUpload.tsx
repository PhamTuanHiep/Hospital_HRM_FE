import { useState } from "react";
import { Upload, Button, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload";
interface FileUploadProps {
  apiUrl?: string;
  fileList: UploadFile[];
  setFileList: Function;
}
//This project uses Upload Antd to upload only 1 file
//so it will not use all the files in fileList but only the first file.
//Because of the limit of uploading 1 file
const FileUpload = ({ apiUrl, fileList, setFileList }: FileUploadProps) => {
  // Kiểm tra loại file và kích thước trước khi upload
  console.log("apiUrl:", apiUrl);
  const [isValid, setIsValid] = useState<boolean>(true);

  const beforeUpload = (file: RcFile) => {
    console.log("file-beforeUpload:", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      setIsValid(false);
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
      console.log("isJpgOrPng:", isJpgOrPng);

      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      setIsValid(false);
      message.error("File phải nhỏ hơn 2MB!");
      console.log("isLt2M:", isLt2M);

      return false;
    }

    return false;
  };

  // Xử lý thay đổi khi người dùng chọn file
  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    console.log("info-handleChange:", info);
    isValid ? setFileList(info.fileList) : setFileList([]);
    // formInstance.setFieldValue("image", info.fileList[0].originFileObj);
  };

  // Tùy chỉnh hành vi xóa file
  const handleRemove = (file: UploadFile) => {
    setFileList((prevFileList: UploadFile[]) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };
  console.log("fileList:", fileList);
  return (
    <div>
      <Upload
        // action={apiUrl} // Địa chỉ API để upload (bạn sẽ thay bằng API thật)
        beforeUpload={beforeUpload} // Kiểm tra file trước khi upload
        onChange={handleChange} // Xử lý thay đổi file list
        onRemove={handleRemove} // Xử lý khi file bị xóa
        fileList={fileList} // Danh sách file đã chọn
        showUploadList={{ showRemoveIcon: true }} // Hiển thị nút xóa
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Chọn File</Button>
      </Upload>
    </div>
  );
};

export default FileUpload;

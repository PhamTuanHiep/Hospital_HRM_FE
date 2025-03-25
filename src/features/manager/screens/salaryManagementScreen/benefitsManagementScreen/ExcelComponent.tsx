import React from "react";
import * as XLSX from "xlsx";

interface ExcelData {
  [key: string]: any;
}
interface ExcelComponentProps {
  setExcelData: Function;
}
const ExcelComponent = ({ setExcelData }: ExcelComponentProps) => {
  // const [data, setData] = useState<ExcelData[]>([]);

  // Hàm đọc file Excel và chuyển đổi thành JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file:", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (typeof binaryStr === "string") {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          // setData(jsonData as ExcelData[]);
          setExcelData(jsonData as ExcelData[]);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  // Hàm xuất dữ liệu thành file Excel
  // const exportToExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, "ExportedData.xlsx");
  // };
  // console.log("data:", data);

  return (
    <div>
      {/* Chọn file để tải lên */}
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".xlsx, .xls, .csv"
      />

      {/* <button onClick={exportToExcel}>Export to Excel</button> */}

      {/* Hiển thị dữ liệu dưới dạng bảng */}
      {/* <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ExcelComponent;

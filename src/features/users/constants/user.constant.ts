import {
  addSuffix,
  getFormatNumberToString,
} from "../../../common/common.helper";

const insuranceIndex = {
  insuranceId: "insuranceId",
  insuranceName: "insuranceName",
  insuranceType: "insuranceType",
  monthlyPercentage: "monthlyPercentage",
  note: "note",
};
export const INSURANCES_COLUMNS = [
  {
    title: "Mã bảo hiểm",
    dataIndex: insuranceIndex.insuranceId,
    key: insuranceIndex.insuranceId,
  },
  {
    title: "Tên bảo hiểm",
    dataIndex: insuranceIndex.insuranceName,
    key: insuranceIndex.insuranceName,
  },
  {
    title: "Loại",
    dataIndex: insuranceIndex.insuranceType,
    key: insuranceIndex.insuranceType,
  },
  {
    title: "Phần trăm",
    dataIndex: insuranceIndex.monthlyPercentage,
    key: insuranceIndex.monthlyPercentage,
    render: (value: number) => addSuffix(value, "%"),
  },
  {
    title: "Trạng thái",
    dataIndex: insuranceIndex.note,
    key: insuranceIndex.note,
  },
];

const allowanceIndex = {
  allowanceId: "allowanceId",
  allowanceName: "allowanceName",
  allowanceType: "allowanceType",
  allowanceRate: "allowanceRate",
  allowanceFee: "allowanceFee",
  note: "note",
};
export const ALLOWANCE_COLUMNS = [
  {
    title: "Mã trợ cấp",
    dataIndex: allowanceIndex.allowanceId,
    key: allowanceIndex.allowanceId,
  },
  {
    title: "Tên trợ cấp",
    dataIndex: allowanceIndex.allowanceName,
    key: allowanceIndex.allowanceName,
  },
  {
    title: "Loại",
    dataIndex: allowanceIndex.allowanceType,
    key: allowanceIndex.allowanceType,
  },
  {
    title: "Theo tỷ lệ",
    dataIndex: allowanceIndex.allowanceRate,
    key: allowanceIndex.allowanceRate,
  },
  {
    title: "Theo mức",
    dataIndex: allowanceIndex.allowanceFee,
    key: allowanceIndex.allowanceFee,
    render: (value: number) => getFormatNumberToString(value, ","),
  },
];

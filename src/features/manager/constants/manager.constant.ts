import { SelectProps } from "antd";
import {
  addSuffix,
  getFormatNumberToString,
} from "../../../common/common.helper";
import { roleName } from "../../../common/common.constant";
import { DefaultOptionType } from "antd/es/select";

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

// const assignmentByRegulationIndex = {
//   order: "order",
//   fullName: "fullName",
//   positionName: "positionName",
//   jobDescription: "jobDescription",
// };

// export const ASSIGNMENT_BY_REGULATION_COLUMNS = [
//   {
//     title: "Stt",
//     dataIndex: assignmentByRegulationIndex.order,
//     key: assignmentByRegulationIndex.order,
//     className: "title_content-center",
//   },
//   {
//     title: "Ho va ten",
//     dataIndex: assignmentByRegulationIndex.fullName,
//     key: assignmentByRegulationIndex.fullName,
//   },
//   {
//     title: "Chuc vu",
//     dataIndex: assignmentByRegulationIndex.positionName,
//     key: assignmentByRegulationIndex.positionName,
//   },
//   {
//     title: "Noi dung",
//     dataIndex: assignmentByRegulationIndex.jobDescription,
//     key: assignmentByRegulationIndex.jobDescription,
//   },
// ];

// const overtimeScheduleIndex = {
//   order: "order",
//   departmentName: "departmentName",
//   monday: "monday",
//   tuesday: "positionName",
//   wednesday: "wednesday",
//   thursday: "thursday",
//   friday: "friday",
//   saturday: "saturday",
//   sunday: "sunday",
// };
// export const OVERTIME_SCHEDULE_COLUMNS = [
//   {
//     title: "Stt",
//     dataIndex: overtimeScheduleIndex.order,
//     key: overtimeScheduleIndex.order,
//     className: "title_content-center",
//   },
//   {
//     title: "Ten khoa phong",
//     dataIndex: overtimeScheduleIndex.departmentName,
//     key: overtimeScheduleIndex.departmentName,
//   },
//   {
//     title: "Thu 2",
//     dataIndex: overtimeScheduleIndex.monday,
//     key: overtimeScheduleIndex.monday,
//   },
//   {
//     title: "Thu 3",
//     dataIndex: overtimeScheduleIndex.tuesday,
//     key: overtimeScheduleIndex.tuesday,
//   },
//   {
//     title: "Thu 4",
//     dataIndex: overtimeScheduleIndex.wednesday,
//     key: overtimeScheduleIndex.wednesday,
//   },
//   {
//     title: "Thu 5",
//     dataIndex: overtimeScheduleIndex.thursday,
//     key: overtimeScheduleIndex.thursday,
//   },
//   {
//     title: "Thu 6",
//     dataIndex: overtimeScheduleIndex.friday,
//     key: overtimeScheduleIndex.friday,
//   },
//   {
//     title: "Thu 7",
//     dataIndex: overtimeScheduleIndex.saturday,
//     key: overtimeScheduleIndex.saturday,
//   },
//   {
//     title: "Chu nhat",
//     dataIndex: overtimeScheduleIndex.sunday,
//     key: overtimeScheduleIndex.sunday,
//   },
// ];

export const SALARY_BASE = 2340000;

export enum ContractType {
  FIXED_TERM_EMPLOYMENT_CONTRACT = "CT01",
  INDEFINITE_TERM_EMPLOYMENT_CONTRACT = "CT02",
  FIXED_TERM_LABOR_CONTRACT = "CT03",
  INDEFINITE_TERM_LABOR_CONTRACT = "CT04",
  COLLABORATION_CONTRACT = "CT05",
  PROBATIONARY_CONTRACT = "CT06",
}

export const contractTypeNameVI = {
  [ContractType.FIXED_TERM_EMPLOYMENT_CONTRACT]:
    "Hợp đồng làm việc xác định thời hạn",
  [ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT]:
    "Hợp đồng làm việc không xác định thời hạn",
  [ContractType.FIXED_TERM_LABOR_CONTRACT]:
    "Hợp đồng lao động xác định thời hạn",
  [ContractType.INDEFINITE_TERM_LABOR_CONTRACT]:
    "Hợp đồng lao động không xác định thời hạn",
  [ContractType.COLLABORATION_CONTRACT]: "Hợp đồng cộng tác viên",
  [ContractType.PROBATIONARY_CONTRACT]: "Hợp đồng thử việc",
};

export const optionContractType: SelectProps["options"] = Object.entries(
  contractTypeNameVI
).map(([key, value]): DefaultOptionType => {
  return {
    label: value,
    value: key,
  };
});

export enum ContractModalType {
  EXTEND = 1,
  TERMINATE,
  CANCEL,
  DELETE,
}

export enum UpdateContractStatus {
  ACTIVE = 1, //có hiệu lực.
  SUSPENDED = 4, //tạm thời đình do sự cố
  TERMINATED = 5, //Chấm dứt-bị kết thúc trước thời hạn
  TRANSFERRED = 7, //nhân viên chuyển sang cơ sở khác
}

export const updateContractStatus = {
  [UpdateContractStatus.ACTIVE]: "Active",
  [UpdateContractStatus.SUSPENDED]: "Suspended",
  [UpdateContractStatus.TERMINATED]: "Terminated",
  [UpdateContractStatus.TRANSFERRED]: "Transferred",
};

export const optionContractStatusType: SelectProps["options"] = Object.entries(
  updateContractStatus
).map(([key, value]): DefaultOptionType => {
  return {
    label: value,
    value: Number(key),
  };
});

export const optionRoleType: SelectProps["options"] = Object.entries(
  roleName
).map(([key, value]): DefaultOptionType => {
  return {
    label: value,
    value: key,
  };
});

import {
  addSuffix,
  getFormatNumberToString,
} from "../../../common/common.helper";

const userInfoIndex = {
  selfInfo: "selfInfo",
  parentInfo: "parentInfo",
};
export const USER_INFO_COLUMNS = [
  {
    title: "",
    dataIndex: userInfoIndex.selfInfo,
    key: userInfoIndex.selfInfo,
  },
  {
    title: "",
    dataIndex: userInfoIndex.parentInfo,
    key: userInfoIndex.parentInfo,
  },
];

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

const assignmentByRegulationIndex = {
  order: "order",
  fullName: "fullName",
  positionName: "positionName",
  jobDescription: "jobDescription",
};

export const ASSIGNMENT_BY_REGULATION_COLUMNS = [
  {
    title: "Stt",
    dataIndex: assignmentByRegulationIndex.order,
    key: assignmentByRegulationIndex.order,
    className: "content-center",
  },
  {
    title: "Ho va ten",
    dataIndex: assignmentByRegulationIndex.fullName,
    key: assignmentByRegulationIndex.fullName,
  },
  {
    title: "Chuc vu",
    dataIndex: assignmentByRegulationIndex.positionName,
    key: assignmentByRegulationIndex.positionName,
  },
  {
    title: "Noi dung",
    dataIndex: assignmentByRegulationIndex.jobDescription,
    key: assignmentByRegulationIndex.jobDescription,
  },
];

const overtimeScheduleIndex = {
  order: "order",
  departmentName: "departmentName",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
};

export const OVERTIME_SCHEDULE_COLUMNS = [
  {
    title: "Stt",
    dataIndex: overtimeScheduleIndex.order,
    key: overtimeScheduleIndex.order,
    className: "content-center",
  },
  {
    title: "Ten khoa phong",
    dataIndex: overtimeScheduleIndex.departmentName,
    key: overtimeScheduleIndex.departmentName,
  },
  {
    title: "Thu 2",
    dataIndex: overtimeScheduleIndex.monday,
    key: overtimeScheduleIndex.monday,
  },
  {
    title: "Thu 3",
    dataIndex: overtimeScheduleIndex.tuesday,
    key: overtimeScheduleIndex.tuesday,
  },
  {
    title: "Thu 4",
    dataIndex: overtimeScheduleIndex.wednesday,
    key: overtimeScheduleIndex.wednesday,
  },
  {
    title: "Thu 5",
    dataIndex: overtimeScheduleIndex.thursday,
    key: overtimeScheduleIndex.thursday,
  },
  {
    title: "Thu 6",
    dataIndex: overtimeScheduleIndex.friday,
    key: overtimeScheduleIndex.friday,
  },
  {
    title: "Thu 7",
    dataIndex: overtimeScheduleIndex.saturday,
    key: overtimeScheduleIndex.saturday,
  },
  {
    title: "Chu nhat",
    dataIndex: overtimeScheduleIndex.sunday,
    key: overtimeScheduleIndex.sunday,
  },
];

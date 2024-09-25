export const INIT_ACCOUNT = {
  accountId: 0,
  email: "",
  password: "",
  roleId: "",
  userId: 0,
};

export const INIT_USER = {
  userId: 1,
  fullName: "-",
  gender: "-",
  address: "-",
  phoneNumber: "-",
  nation: "-",
  nationality: "-",
  hometown: "-",
  positionId: "-",
  birthday: "-",
  image: "-",
  fatherFullName: "-",
  fatherBirthday: "-",
  motherFullName: "-",
  motherBirthday: "-",
  departmentId: "-",
  weeklySchedule: [0],
  insuranceIds: ["-"],
  allowances: [""],
  allowanceIds: [0],
  evaluateId: 1,
  jobDescription: [""],
  otherDescription: "-",
  status: "-",
};

export const INIT_ROLE = {
  roleId: "user",
  roleName: "User",
};

export const INIT_POSITION = {
  positionId: "",
  positionName: "",
  salaryCoefficient: 0,
  leaveId: "",
};

export const INIT_LEAVE = {
  leaveId: "",
  leaveTypes: "",
  MaxLeaveEntitlement: 0,
};

export const INIT_INSURANCE = {
  insuranceId: "-",
  insuranceName: "-",
  insuranceType: "-",
  monthlyPercentage: 0,
  note: "-",
};

export const INIT_EVALUATE = {
  evaluateId: 0,
  userId: 0,
  workLoad: 0,
  quanlityOfWork: 0,
  capacityOfWork: 0,
  quantityOfScientificWorks: 0,
  workInitiatives: 0,
  professionalEthics: 0,
  workingStyle: 0,
  responsibilityForWork: 0,
  workAttitude: 0,
  workSpirit: 0,
  workResult: 0,
};

export const INIT_DEPARTMENT = {
  departmentId: "",
  departmentName: "",
};

export const INIT_ALLOWANCE = {
  allowanceId: 0,
  allowanceAcronym: "-",
  allowanceName: "-",
  allowanceType: "-",
  allowanceRate: 0,
  allowanceFee: 0,
  note: "-",
};

export const INIT_OVERTIME = {
  overtimeId: "",
  overtimeName: "",
  overtimePay: 0,
  note: [""],
};

export const INIT_OVERTIME_HISTORY = {
  overtimeHistoryId: 1,
  userId: 0,
  overtimeId: "",
  departmentId: "",
  days: "",
  note: "",
};

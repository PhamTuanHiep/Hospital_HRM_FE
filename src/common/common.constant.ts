import dayjs from "dayjs";
import {
  AccountDetail,
  AllowanceDetail,
  AnnouncementPostDetail,
  ContractDetail,
  ContractHistoryDetail,
  DepartmentDetail,
  EvaluateDetail,
  InsuranceDetail,
  LeaveDetail,
  LeaveHistoryDetail,
  MedicalTrainingResultsDetail,
  NursingTrainingResults,
  OvertimeDetail,
  OvertimeHistoryDetail,
  Pagination,
  PositionAllowanceDetail,
  PositionDetail,
  CommonQueryParams,
  RecruitmentPostDetail,
  RoleDetail,
  SalaryHistoryDetail,
  UserDetail,
  UserInsuranceDetail,
  PageResponse,
} from "./common.type";

export const INIT_QUERY_PARAMS: CommonQueryParams = {
  page: 1,
  items_per_page: 4,
};

export const INIT_PAGINATION: Pagination = {
  current: 1,
  pageSize: 4,
  total: 8,
};

export const INIT_PAGE_RESPONSE: PageResponse = {
  currentPage: null,
  lastPage: null,
  nextPage: null,
  perPage: null,
  prevPage: null,
  total: null,
};
export enum QueryParamsWithListPosts {
  DEFAULT_CURRENT_PAGE = 1,
  PER_PAGE = 5,
}

export const INIT_ACCOUNT: AccountDetail = {
  accountId: 0,
  email: "",
  password: "",
  avatar: "",
  role: null,
  user: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_USER: UserDetail = {
  userId: 1,
  fullName: "-",
  gender: 1,
  address: "-",
  phoneNumber: "-",
  nation: "-",
  nationality: "-",
  hometown: "-",
  birthday: "-",
  fatherFullName: "-",
  fatherBirthday: "-",
  motherFullName: "-",
  motherBirthday: "-",
  weeklySchedule: [2, 3, 4, 5, 6],
  jobDescription: [""],
  otherDescription: "-",
  account: null,
  department: null,
  leaveHistories: [],
  overtimeHistories: [],
  userInsurances: [],
  position: null,
  evaluateHistories: [],
  contractHistories: [],
  salaryHistories: [],
  status: "-",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_ROLE: RoleDetail = {
  roleId: "user",
  roleName: "User",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_POSITION_ALLOWANCE_DETAIL: PositionAllowanceDetail = {
  id: 0,
  position: null,
  allowance: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_POSITION: PositionDetail = {
  positionId: "",
  positionName: "",
  salaryCoefficient: 0,
  users: [],
  positionAllowances: [],
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_LEAVE_HISTORY_DETAIL: LeaveHistoryDetail = {
  leaveHistoryId: 0,
  month: "",
  year: "",
  numOfDaysOff: 0,
  dayOffList: [],
  user: null,
  leave: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_LEAVE: LeaveDetail = {
  leaveId: "",
  leaveTypes: "",
  maxLeaveEntitlement: 0,
  unit: "day",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_USER_INSURANCE_DETAIL: UserInsuranceDetail = {
  id: 0,
  user: null,
  insurance: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_INSURANCE: InsuranceDetail = {
  insuranceId: "-",
  insuranceName: "-",
  insuranceType: "-",
  monthlyPercentage: 0,
  note: "-",
  userInsurances: [],
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_EVALUATE: EvaluateDetail = {
  evaluateId: 0,
  user: null,
  workLoad: 0,
  capacityOfWork: 0,
  quantityOfScientificWorks: 0,
  workInitiatives: 0,
  workingStyle: 0,
  responsibilityForWork: 0,
  workSpirit: 0,
  workResult: 0,
  averageScore: 0,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_DEPARTMENT: DepartmentDetail = {
  departmentId: "",
  departmentName: "",
  location: "",
  funcDescription: "",
  users: [],
  overtimeHistories: [],
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_OVERTIME: OvertimeDetail = {
  overtimeId: "",
  overtimeName: "",
  overtimePay: 0,
  note: [""],
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_OVERTIME_HISTORY: OvertimeHistoryDetail = {
  overtimeHistoryId: 1,
  note: "",
  startDay: "",
  endDay: "",
  user: null,
  department: null,
  overtime: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_ALLOWANCE: AllowanceDetail = {
  allowanceId: 0,
  allowanceAcronym: "-",
  allowanceName: "-",
  allowanceType: "-",
  allowanceRate: 0,
  allowanceFee: 0,
  note: "-",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_MEDICAL_TRAINING_RESULTS: MedicalTrainingResultsDetail = {
  trainingResultsId: 1,
  user: null,
  understandingOfMedicalTheory: 1,
  knowledgeOfTreatmentProtocols: 1,
  abilityToLearnNewKnowledge: 1,
  diagnosticSkills: 1,
  treatmentSkills: 1,
  decisionMakingSkills: 1,
  communicationSkillsWithPatientsAndTheirFamilies: 1,
  communicationSkillsWithColleagues: 1,
  patientMonitoringAndCare: 1,
  participationInMedicalResearch: 1,
  averageScore: 1,
};

export const INIT_NURSING_TRAINING_RESULTS: NursingTrainingResults = {
  trainingResultsId: 1,
  userId: 1,
  understandingOfNursingTheory: 1,
  clinicalSkills: 1,
  medicationAndTreatmentManagementSkills: 1,
  basicCareSkills: 1,
  communicationSkillsWithPatientsAndTheirFamilies: 1,
  patientRecordManagementSkills: 1,
  patientMonitoringAndAssessmentSkills: 1,
  abilityToAdaptToTheWorkEnvironment: 1,
  averageScore: 1,
};

export const INIT_CONTRACT: ContractDetail = {
  contractId: "",
  contractNameVI: "",
  contractNameEN: "",
  note: [],
  contractHistories: [],
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};
export const INIT_CONTRACT_HISTORY: ContractHistoryDetail = {
  contractHistoryId: 0,
  startDay: "",
  endDay: "",
  note: "",
  user: null,
  contract: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_SALARY_HISTORY: SalaryHistoryDetail = {
  salaryHistoryId: 0,
  userId: 0,
  month: "",
  year: "",
  attendance: 0,
  paidLeave: 0,
  unpaidLeave: 0,
  numOfDaysOff: 0,
  standardWorkDays: 0,
  bonus: 0,
  allowance: 0,
  salary: 0,
};

export const INIT_RECRUITMENT_POST_DETAIL: RecruitmentPostDetail = {
  recruitmentPostId: 0,
  title: "",
  subtitle: "",
  generalRequirements: "",
  benefits: "",
  requiredDocuments: "",
  contact: "",
  image: "",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
  user: null,
};

export const INIT_ANNOUNCEMENT_POST_DETAIL: AnnouncementPostDetail = {
  announcementPostId: 0,
  title: "",
  abstract: "",
  notificationType: "",
  contentDetail: "",
  contact: "",
  image: "",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
  user: null,
};

export enum RoleName {
  USER = "User",
  MANAGER = "Manager",
  ADMIN = "Admin",
}

export const enum RoleId {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export const enum GenderId {
  FEMALE = 0,
  MALE,
}

export const enum GenderName {
  FEMALE = "Female",
  MALE = "Male",
}

export enum DayOfWeek {
  MONDAY = 2,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export const dayOfWeek = {
  [DayOfWeek.MONDAY]: "Monday",
  [DayOfWeek.TUESDAY]: "Tuesday",
  [DayOfWeek.WEDNESDAY]: "Wednesday",
  [DayOfWeek.THURSDAY]: "Thursday",
  [DayOfWeek.FRIDAY]: "Friday",
  [DayOfWeek.SATURDAY]: "Saturday",
  [DayOfWeek.SUNDAY]: "Sunday",
};

export const dayOfWeekVN = {
  [DayOfWeek.MONDAY]: "Thứ hai",
  [DayOfWeek.TUESDAY]: "Thứ ba",
  [DayOfWeek.WEDNESDAY]: "Thứ tư",
  [DayOfWeek.THURSDAY]: "Thứ năm",
  [DayOfWeek.FRIDAY]: "Thứ sáu",
  [DayOfWeek.SATURDAY]: "Thứ bảy",
  [DayOfWeek.SUNDAY]: "Chủ nhật",
};

export enum DepartmentId {
  D001 = "D001",
  D002 = "D002",
  D003 = "D003",
  D004 = "D004",
  D005 = "D005",
  D006 = "D006",
  D007 = "D007",
  D008 = "D008",
  D009 = "D009",
  D010 = "D010",
  D011 = "D011",
  D012 = "D012",
  D013 = "D013",
  D014 = "D014",
  D015 = "D015",
  D016 = "D016",
  D017 = "D017",
  D018 = "D018",
  D019 = "D019",
  D020 = "D020",
  D021 = "D021",
  D022 = "D022",
  D023 = "D023",
}

export const departmentName = {
  [DepartmentId.D001]: "Phòng giám đốc",
  [DepartmentId.D002]: "Phòng phó giám đốc",
  [DepartmentId.D003]: "Khoa phòng khám",
  [DepartmentId.D004]: "Khoa nội tổng hợp",
  [DepartmentId.D005]: "Khoa hồi sức chống độc",
  [DepartmentId.D006]: "Khoa lão khoa",
  [DepartmentId.D007]: "Khoa nhi",
  [DepartmentId.D008]: "Khoa châm cứu",
  [DepartmentId.D009]: "Khoa phục hồi chấn thương",
  [DepartmentId.D010]: "Khoa ngũ quan",
  [DepartmentId.D011]: "Khoa ngoại",
  [DepartmentId.D012]: "Khoa sản",
  [DepartmentId.D013]: "Khoa phòng mổ",
  [DepartmentId.D014]: "Khoa xét nghiệm",
  [DepartmentId.D015]: "Chuẩn đoán hình ảnh",
  [DepartmentId.D016]: "Khoa dược",
  [DepartmentId.D017]: "Khoa dinh dưỡng",
  [DepartmentId.D018]: "Khoa kiểm soát nhiễm khuẩn",
  [DepartmentId.D019]: "Phòng tổ chức hành chính",
  [DepartmentId.D020]: "Phòng kế hoạch tổng hợp",
  [DepartmentId.D021]: "Phòng tài chính kế toán",
  [DepartmentId.D022]: "Phòng đào tạo",
  [DepartmentId.D023]: "Phòng điều dưỡng",
};

export enum PositionId {
  P001 = "P001",
  P002 = "P002",
  P003 = "P003",
  P004 = "P004",
  P005 = "P005",
  P006 = "P006",
  P007 = "P007",
  P008 = "P008",
  P009 = "P009",
  P010 = "P010",
}

export const positionName = {
  [PositionId.P001]: "Bác sĩ cao cấp",
  [PositionId.P002]: "Bác sĩ chính",
  [PositionId.P003]: "Bác sĩ",
  [PositionId.P004]: "Bác sĩ y học dự phòng cao cấp",
  [PositionId.P005]: "Bác sĩ y học dự phòng chính",
  [PositionId.P006]: "Bác sĩ y học dự phòng",
  [PositionId.P007]: "Y sĩ",
  [PositionId.P008]: "Y tá cao cấp",
  [PositionId.P009]: "Y tá chính",
  [PositionId.P010]: "Y tá",
};

export enum NotificationType {
  N001 = "N001",
  N002 = "N002",
  N003 = "N003",
  N004 = "N004",
  N005 = "N005",
  N006 = "N006",
}

export const notificationName = {
  [NotificationType.N001]: "Tin đào tạo",
  [NotificationType.N002]: "Tin tức y học",
  [NotificationType.N003]: "Sự kiện",
  [NotificationType.N004]: "Tin tức bệnh viện",
  [NotificationType.N005]: "Quy định",
  [NotificationType.N006]: "Tin tức nhà nước",
};

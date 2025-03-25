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
  PositionDetail,
  CommonQueryParams,
  RecruitmentPostDetail,
  RoleDetail,
  SalaryHistoryDetail,
  UserDetail,
  UserInsuranceDetail,
  PageResponse,
  UserShortInfo,
  DepartmentShortInfo,
  PositionShortInfo,
  ContractShortInfo,
  DepartmentUserShortInfo,
  UserInfo,
} from "./common.type";
import { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
export const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]{2,}(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/g;
const DEFAULT_CREATED_AT = dayjs("2000-01-01").toDate();
const DEFAULT_UPDATED_AT = dayjs("2000-01-01").toDate();
export const TIME_FORMATS = [
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DD HH:mm:ss.SSSSS",
  "DD/MM/YYYY",
  "YYYY-MM-DD",
  "YYYY-M-DD",
  "YYYY-MM-D",
  "YYYY-M-D",

  "DD-MM-YYYY",
];
export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";

export const INIT_QUERY_PARAMS: CommonQueryParams = {
  page: 1,
  items_per_page: 5,
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
  total: 1,
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
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_DEPARTMENT_USER_SHORT_INFO: DepartmentUserShortInfo = {
  address: "",
  fullName: "",
  gender: 1,
  userId: 0,
  note: [],
};

export const INIT_DEPARTMENT_SHORT_INFO: DepartmentShortInfo = {
  departmentId: "",
  departmentName: "",
  location: "",
  funcDescription: "",
  users: [],
  allowanceRelationship: null,
  overtimeHistories: [],
};

export const INIT_POSITION_SHORT_INFO: PositionShortInfo = {
  positionId: "",
  positionName: "",
  users: [],
  allowanceRelationship: null,
};

export const INIT_USER_SHORT_INFO: UserShortInfo = {
  userId: 0,
  fullName: "",
};

export const INIT_USER_INFO: UserInfo = {
  userId: 0,
  fullName: "",
  department: INIT_DEPARTMENT_SHORT_INFO,
  position: INIT_POSITION_SHORT_INFO,
};

export const INIT_CONTRACT_SHORT_INFO: ContractShortInfo = {
  contractId: "",
  contractNameVI: "",
  contractNameEN: "",
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
  salaryCoefficient: 0,
  leaveHistories: [],
  overtimeHistories: [],
  userInsurances: [],
  position: null,
  evaluateHistories: [],
  contractHistories: [],
  salaryHistories: [],
  medicalTrainingResults: [],
  nursingTrainingResults: [],
  status: "-",
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_ROLE: RoleDetail = {
  roleId: "user",
  roleName: "User",
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_ALLOWANCE_DETAIL: AllowanceDetail = {
  allowanceId: "",
  allowanceType: "",
  allowanceNameVI: "",
  allowanceNameEN: "",
  allowanceRate: 0,
  allowanceFee: 0,
  note: "",
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};
export const INIT_POSITION: PositionDetail = {
  positionId: "",
  positionName: "",
  users: [],
  allowanceRelationship: null,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_LEAVE_HISTORY_DETAIL: LeaveHistoryDetail = {
  leaveHistoryId: 0,
  month: "",
  year: "",
  numOfDaysOff: 0,
  dayOffList: [],
  user: null,
  leave: null,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_LEAVE: LeaveDetail = {
  leaveId: "",
  leaveTypes: "",
  maxLeaveEntitlement: 0,
  unit: "day",
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_USER_INSURANCE_DETAIL: UserInsuranceDetail = {
  id: 0,
  user: null,
  insurance: null,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_INSURANCE: InsuranceDetail = {
  insuranceId: "-",
  insuranceName: "-",
  insuranceType: "-",
  monthlyPercentage: 0,
  note: "-",
  userInsurances: [],
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
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
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_DEPARTMENT: DepartmentDetail = {
  departmentId: "",
  departmentName: "",
  location: "",
  funcDescription: "",
  users: [],
  overtimeHistories: [],
  allowanceRelationship: null,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_OVERTIME: OvertimeDetail = {
  overtimeId: "",
  overtimeName: "",
  overtimePay: 0,

  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_OVERTIME_HISTORY: OvertimeHistoryDetail = {
  overtimeHistoryId: 1,
  note: [""],
  startDay: "",
  endDay: "",
  user: null,
  department: null,
  overtime: null,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};

export const INIT_ALLOWANCE: AllowanceDetail = {
  allowanceId: "",
  allowanceType: "-",
  allowanceNameVI: "-",
  allowanceNameEN: "-",
  allowanceRate: 0,
  allowanceFee: 0,
  note: "-",
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
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
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
};
export const INIT_CONTRACT_HISTORY: ContractHistoryDetail = {
  contractHistoryId: 0,
  startDay: "",
  endDay: "",
  note: "",
  suspensionTime: 0,
  status: 0,
  user: INIT_USER_INFO,
  contract: INIT_CONTRACT_SHORT_INFO,
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
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
  overtimeCost: 0,
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
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
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
  createdAt: DEFAULT_CREATED_AT,
  updatedAt: DEFAULT_UPDATED_AT,
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

export const roleName = {
  [RoleId.ADMIN]: "Admin",
  [RoleId.MANAGER]: "Manager",
  [RoleId.USER]: "User",
};

export const enum GenderId {
  FEMALE = 0,
  MALE = 1,
}

export const enum GenderName {
  FEMALE = "Female",
  MALE = "Male",
}

export const genderName = {
  [GenderId.FEMALE]: "Female",
  [GenderId.MALE]: "Male",
};

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
  P011 = "P011",
  P012 = "P012",
  P013 = "P013",
  P014 = "P014",
  P015 = "P015",
  P016 = "P016",
  P017 = "P017",
  P018 = "P018",
  P019 = "P019",
  P020 = "P020",
  P021 = "P021",
  P022 = "P022",
  P023 = "P023",
  P024 = "P024",
  P025 = "P025",
  P026 = "P026",
  P027 = "P027",
  P028 = "P028",
  P029 = "P029",
  P030 = "P030",
  P031 = "P031",
  P032 = "P032",
  P033 = "P033",
  P034 = "P034",
  P035 = "P035",
  P036 = "P036",
  P037 = "P037",
  P038 = "P038",
  P039 = "P039",
  P040 = "P040",
  P041 = "P041",
  P042 = "P042",
  P043 = "P043",
  P044 = "P044",
  P045 = "P045",
  P046 = "P046",
  P047 = "P047",
  P048 = "P048",
  P049 = "P049",
  P050 = "P050",
  P051 = "P051",
  P052 = "P052",
  P053 = "P053",
  P054 = "P054",
  P055 = "P055",
  P056 = "P056",
  P057 = "P057",
  P058 = "P058",
  P059 = "P059",
  P060 = "P060",
  P061 = "P061",
  P062 = "P062",
  P063 = "P063",
  P064 = "P064",
  P065 = "P065",
  P066 = "P066",
  P067 = "P067",
}

export const positionName = {
  [PositionId.P001]: "Giám đốc bệnh viện",
  [PositionId.P002]: "Phó giám đốc",
  [PositionId.P003]: "Trưởng khoa khám bệnh",
  [PositionId.P004]: "Trưởng khoa nội tổng hợp",
  [PositionId.P005]: "Trưởng khoa hồi sức chống độc",
  [PositionId.P006]: "Trưởng khoa lão khoa",
  [PositionId.P007]: "Trưởng khoa nhi",
  [PositionId.P008]: "Trưởng khoa châm cứu",
  [PositionId.P009]: "Trưởng khoa phục hồi chấn thương",
  [PositionId.P010]: "Trưởng khoa ngũ quan",
  [PositionId.P011]: "Trưởng khoa ngoại",
  [PositionId.P012]: "Trưởng khoa sản",
  [PositionId.P013]: "Trưởng khoa phòng mổ",
  [PositionId.P014]: "Trưởng khoa xét nghiệm",
  [PositionId.P015]: "Trưởng khoa chẩn đoán hình ảnh",
  [PositionId.P016]: "Trưởng khoa dược",
  [PositionId.P017]: "Trưởng khoa dinh dưỡng",
  [PositionId.P018]: "Trưởng khoa kiểm soát nhiễm khuẩn",
  [PositionId.P019]: "Phó trưởng khoa khám bệnh",
  [PositionId.P020]: "Phó trưởng khoa nội tổng hợp",
  [PositionId.P021]: "Phó trưởng khoa hồi sức chống độc",
  [PositionId.P022]: "Phó trưởng khoa lão khoa",
  [PositionId.P023]: "Phó trưởng khoa nhi",
  [PositionId.P024]: "Phó trưởng khoa châm cứu",
  [PositionId.P025]: "Phó trưởng khoa phục hồi chấn thương",
  [PositionId.P026]: "Phó trưởng khoa ngũ quan",
  [PositionId.P027]: "Phó trưởng khoa ngoại",
  [PositionId.P028]: "Phó trưởng khoa sản",
  [PositionId.P029]: "Phó trưởng khoa phòng mổ",
  [PositionId.P030]: "Phó trưởng khoa xét nghiệm",
  [PositionId.P031]: "Phó trưởng khoa chẩn đoán hình ảnh",
  [PositionId.P032]: "Phó trưởng khoa dược",
  [PositionId.P033]: "Phó trưởng khoa dinh dưỡng",
  [PositionId.P034]: "Phó trưởng khoa kiểm soát nhiễm khuẩn",
  [PositionId.P035]: "Trưởng phòng tổ chức hành chính",
  [PositionId.P036]: "Trưởng phòng kế hoạch tổng hợp",
  [PositionId.P037]: "Trưởng phòng tài chính kế toán",
  [PositionId.P038]: "Trưởng phòng đào tạo",
  [PositionId.P039]: "Trưởng phòng điều dưỡng",
  [PositionId.P040]: "Phó trưởng phòng tổ chức hành chính",
  [PositionId.P041]: "Phó trưởng phòng kế hoạch tổng hợp",
  [PositionId.P042]: "Phó trưởng phòng tài chính kế toán",
  [PositionId.P043]: "Phó trưởng phòng đào tạo",
  [PositionId.P044]: "Phó trưởng phòng điều dưỡng",
  [PositionId.P045]: "Bác sĩ đa khoa hạng I",
  [PositionId.P046]: "Bác sĩ đa khoa hạng II",
  [PositionId.P047]: "Bác sĩ đa khoa hạng III",
  [PositionId.P048]: "Bác sĩ chuyên khoa hạng I",
  [PositionId.P049]: "Bác sĩ chuyên khoa hạng II",
  [PositionId.P050]: "Bác sĩ chuyên khoa hạng III",
  [PositionId.P051]: "Bác sĩ nội trú hạng I",
  [PositionId.P052]: "Bác sĩ nội trú hạng II",
  [PositionId.P053]: "Bác sĩ nội trú hạng III",
  [PositionId.P054]: "Bác sĩ phẫu thuật hạng I",
  [PositionId.P055]: "Bác sĩ phẫu thuật hạng II",
  [PositionId.P056]: "Bác sĩ phẫu thuật hạng III",
  [PositionId.P057]: "Bác sĩ dinh dưỡng",
  [PositionId.P058]: "Điều dưỡng viên hạng II",
  [PositionId.P059]: "Điều dưỡng viên hạng III",
  [PositionId.P060]: "Kỹ thuật viên",
  [PositionId.P061]: "Dược sĩ lâm sàng",
  [PositionId.P062]: "Dược sĩ kiểm soát thuốc",
  [PositionId.P063]: "Chuyên viên dinh dưỡng",
  [PositionId.P064]: "Nhân viên hành chính nhân sự",
  [PositionId.P065]: "Nhân viên thống kê y tế",
  [PositionId.P066]: "Nhân viên kế toán",
  [PositionId.P067]: "Nhân viên phụ trách đào tạo",
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

export enum ContractStatus {
  ACTIVE = 1, //có hiệu lực.
  RENEWAL_PENDING, //sắp hết hạn và đang chờ phê duyệt gia hạn
  EXPIRED, //đã hết hạn
  SUSPENDED, //tạm thời đình do sự cố
  TERMINATED, //Chấm dứt-bị kết thúc trước thời hạn
  CANCELLED, //bị hủy trước khi có hiệu lực
  TRANSFERRED, //nhân viên chuyển sang cơ sở khác
}

export const contractStatus = {
  [ContractStatus.ACTIVE]: "Active",
  [ContractStatus.RENEWAL_PENDING]: "Renewal-Pending",
  [ContractStatus.EXPIRED]: "Expired",
  [ContractStatus.SUSPENDED]: "Suspended",
  [ContractStatus.TERMINATED]: "Terminated",
  [ContractStatus.CANCELLED]: "Cancelled",
  [ContractStatus.TRANSFERRED]: "Transferred",
};

export enum UserStatus {
  WORKING = "1",
  RETIRED = "2",
  CURRENTLY_IN_TRAINING = "3",
}

export const userStatus = {
  [UserStatus.WORKING]: "Đang làm",
  [UserStatus.RETIRED]: "Đã nghỉ",
  [UserStatus.CURRENTLY_IN_TRAINING]: "Đang tham gia đào tạo",
};

export const optionUserStatus: SelectProps["options"] = Object.entries(
  userStatus
).map(([key, value]): DefaultOptionType => {
  return {
    label: value,
    value: key,
  };
});

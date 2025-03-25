import { useTranslation } from "react-i18next";
import {
  PageResponse,
  UserDetail,
  UsersQueryParams,
} from "../../../../../../common/common.type";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GenderId,
  GenderName,
  INIT_PAGE_RESPONSE,
  INIT_USER,
  QueryParamsWithListPosts,
  UserStatus,
} from "../../../../../../common/common.constant";
import { getUsers, putUser } from "../../../../../../api/apiServices";
import { EmployeeTrainingColumnType } from "../../../../constants/manager.type";
import {
  filterDepartmentOptions,
  filterPositionOptions,
  getAverageScoreToObject,
} from "../../../../constants/manager.help";
import { Button, Card, Flex, List, Tag } from "antd";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../../components/tableComponent/TableComponent";
import dayjs from "dayjs";
import TrainingResultsEvaluationModal from "../trainingResultsEvaluationModal/TrainingResultsEvaluationModal";

interface EmployeesTrainingTableProps {
  reset: boolean;
  setReset: Function;
}
const EmployeesTrainingTable = ({
  reset,
  setReset,
}: EmployeesTrainingTableProps) => {
  const { t } = useTranslation();

  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [employeesTrainingQueryParams, setEmployeesTrainingQueryParams] =
    useState<UsersQueryParams>({
      page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
      items_per_page: QueryParamsWithListPosts.PER_PAGE,
      userStatus: UserStatus.CURRENTLY_IN_TRAINING,
    });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [employeesTraining, setEmployeesTraining] = useState<UserDetail[]>([
    INIT_USER,
  ]);

  const [employee, setEmployee] = useState<UserDetail>(INIT_USER);

  const fetchEmployeesTraining = useCallback(async () => {
    const res = await getUsers(employeesTrainingQueryParams);
    if (res) {
      const { data: employeesApi, ...pageResponse } = res.data;
      setEmployeesTraining(employeesApi);
      setCustomPageParam(pageResponse);
      setReset(false);
    }
  }, [employeesTrainingQueryParams, setReset]);

  const employeesData: EmployeeTrainingColumnType[] = useMemo(() => {
    return employeesTraining.map((employee) => {
      return {
        rowId: employee.userId,
        email: employee.account?.email || "",
        fullName: employee.fullName,
        gender: employee.gender || 1,
        departmentName: employee.department?.departmentName || "",
        positionName: employee.position?.positionName || "",
        averageScore: getAverageScoreToObject(employee).map((object) => {
          return (
            <List.Item>
              <Tag>
                Năm {object.year}: {object.averageScore ?? "Chưa có đánh giá"}
              </Tag>
            </List.Item>
          );
        }),
        createdAt: dayjs(employee.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(employee.updatedAt).format("DD-MM-YYYY") || "",
        actions: employee,
      };
    });
  }, [employeesTraining]);

  const EMPLOYEE_COLUMNS: ColumnDataCustom<EmployeeTrainingColumnType>[] = [
    {
      title: t("content.info.FullName"),
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      prioritySort: 6,
      isSearch: true,
    },
    {
      title: t("content.info.Email"),
      dataIndex: "email",
      key: "email",
      width: 100,
      prioritySort: 5,
    },
    {
      title: t("content.info.Gender"),
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (value) => {
        return value === GenderId.MALE
          ? t(`content.common.${GenderName.MALE}`)
          : t(`content.common.${GenderName.FEMALE}`);
      },
    },
    {
      title: t("content.info.DepartmentName"),
      dataIndex: "departmentName",
      key: "departmentName",
      width: 200,
      prioritySort: 4,
      filterObjects: filterDepartmentOptions,
    },
    {
      title: t("content.info.PositionName"),
      dataIndex: "positionName",
      key: "positionName",
      width: 130,
      prioritySort: 3,
      filterObjects: filterPositionOptions,
    },
    {
      title: t("content.info.AverageScore"),
      dataIndex: "averageScore",
      key: "averageScore",
      width: 220,
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
      prioritySort: 2,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 130,
      prioritySort: 1,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      className: "title_content-center",
      render: (value) => {
        return (
          <Flex justify="space-between" align="center" gap={8}>
            <Button
              onClick={() => handleFinishTraining(value)}
              type="primary"
              className="btn-wide"
            >
              {t("content.recruitmentPost.FinishTraining")}
            </Button>
            <Button
              onClick={() => handleUpdateResultEmployee(value)}
              type="primary"
              // style={{ width: "130px", whiteSpace: "normal", height: "46px" }}
              className="btn-wide"
            >
              {t("content.recruitmentPost.EvaluateTheResults")}
            </Button>
          </Flex>
        );
      },
    },
  ];
  const handleFinishTraining = async (value: UserDetail) => {
    const res = await putUser(value.userId, { status: UserStatus.WORKING });
    if (res) {
      setReset(true);
    }
  };

  const handleUpdateResultEmployee = (value: UserDetail) => {
    setEmployee(value);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  useEffect(() => {
    fetchEmployeesTraining();
  }, [fetchEmployeesTraining, reset]);

  return (
    <div>
      <Card title="Nhân viên đã tham gia đào tạo">
        <TableComponent<EmployeeTrainingColumnType>
          columnData={EMPLOYEE_COLUMNS}
          tableData={employeesData}
          itemTotal={customPageParam.total}
          paginationQueryParams={employeesTrainingQueryParams}
          setPaginationQueryParams={setEmployeesTrainingQueryParams}
        />
      </Card>

      <TrainingResultsEvaluationModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        reset={reset}
        setReset={setReset}
        employee={employee}
        confirmLoading={!employee}
      />
    </div>
  );
};
export default EmployeesTrainingTable;

import { Button, Flex, Tag } from "antd";

import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { PositionColumnType } from "../../../constants/manager.type";
import {
  PageResponse,
  PositionDetail,
  UsersQueryParams,
} from "../../../../../common/common.type";
import {
  INIT_PAGE_RESPONSE,
  INIT_POSITION,
  QueryParamsWithListPosts,
} from "../../../../../common/common.constant";
import { getPositions } from "../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";

import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";
import { useTranslation } from "react-i18next";
import TableComponent, {
  ColumnDataCustom,
} from "../../../../../components/tableComponent/TableComponent";
import DeletePositionModal from "./deletePositionModal/DeletePositionModal";
import HinderDeletePositionModal from "./hinderDeletePositionModal/HinderDeletePositionModal";
import UpdatePositionModal from "./updatePositionModal/UpdatePositionModal";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";

const PositionManagementTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [customPageParam, setCustomPageParam] =
    useState<PageResponse>(INIT_PAGE_RESPONSE);

  const [queryParams, setQueryParams] = useState<UsersQueryParams>({
    page: QueryParamsWithListPosts.DEFAULT_CURRENT_PAGE,
    items_per_page: QueryParamsWithListPosts.PER_PAGE,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isHinderDeleteModalOpen, setIsHinderDeleteModalOpen] =
    useState<boolean>(false);

  const [reset, setReset] = useState<boolean>(false);

  const [positions, setPositions] = useState<PositionDetail[]>([INIT_POSITION]);
  const [position, setPosition] = useState<PositionDetail>(INIT_POSITION);

  useEffect(() => {
    fetchPositions();
  }, [reset]);

  const fetchPositions = async () => {
    const res = await getPositions();
    console.log("res:", res);

    if (res) {
      const { data: positionsApi, ...pageResponse } = res.data;
      setPositions(positionsApi);
      setCustomPageParam(pageResponse);
      setReset(false);
    }
  };

  const positionData: PositionColumnType[] = useMemo(() => {
    return positions.map((position) => {
      return {
        rowId: position.positionId,
        positionId: position.positionId,
        positionName: position.positionName,
        users:
          position.users && position.users.length > 0 ? (
            <Flex gap="4px 0" wrap>
              {position.users.map((user) => (
                <Tag color="default">{user.fullName}</Tag>
              ))}
            </Flex>
          ) : (
            <div className="null-cell_content-center">-</div>
          ),
        allowanceRelationship: position.allowanceRelationship ? (
          <Flex gap="4px 0" wrap>
            <Tag>
              {position.allowanceRelationship.allowance.allowanceNameEN}
            </Tag>
          </Flex>
        ) : (
          <div className="null-cell_content-center">-</div>
        ),
        createdAt: dayjs(position.createdAt).format("DD-MM-YYYY") || "",
        updatedAt: dayjs(position.updatedAt).format("DD-MM-YYYY") || "",
        actions: position,
      };
    });
  }, [positions]);

  const POSITION_COLUMNS: ColumnDataCustom<PositionColumnType>[] = [
    {
      title: t("content.position.PositionId"),
      dataIndex: "positionId",
      prioritySort: 4,
    },
    {
      title: t("content.position.PositionName"),
      dataIndex: "positionName",
      prioritySort: 3,
      isSearch: true,
    },
    {
      title: t("content.position.Users"),
      dataIndex: "users",
      width: 250,
    },
    {
      title: t("content.position.PositionAllowances"),
      dataIndex: "allowanceRelationship",
      width: 250,
    },
    {
      title: t("content.common.CreatedAt"),
      dataIndex: "createdAt",
      prioritySort: 2,
    },
    {
      title: t("content.common.UpdatedAt"),
      dataIndex: "updatedAt",
      prioritySort: 1,
    },
    {
      dataIndex: "actions",
      className: "title_content-center",
      render: (value: PositionDetail) => {
        return (
          <Flex justify="space-between" gap={8}>
            <Button onClick={() => handleUpdatePosition(value)} type="primary">
              {t("content.position.Update")}
            </Button>
            <Button
              onClick={() => handleDeletePosition(value)}
              type="primary"
              danger
            >
              {t("content.position.Delete")}
            </Button>
          </Flex>
        );
      },
    },
  ];

  const isDelete = useMemo(
    () => (position.users && position.users?.length > 0 ? false : true),
    [position]
  );

  const handleUpdatePosition = (positionDetail: PositionDetail) => {
    setPosition(positionDetail);
    setIsUpdateModalOpen(true);
    setReset(false);
  };

  const handleDeletePosition = (positionDetail: PositionDetail) => {
    setPosition(positionDetail);
    if (isDelete) {
      setIsDeleteModalOpen(true);
      setReset(false);
    } else {
      setIsHinderDeleteModalOpen(true);
    }
  };
  const handleAddPosition = () => {
    navigate(managerChildPaths.ADD_POSITION);
  };

  return (
    <div id="department-management">
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.POSITION_MANAGEMENT}`}>
                  {t("content.feature.PositionManagement")}
                </a>
              </div>
            ),
          },
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => handleAddPosition()}
          >
            {t("content.position.CreatePosition")}
          </Button>
        }
      />

      <TableComponent<PositionColumnType>
        columnData={POSITION_COLUMNS}
        tableData={positionData}
        itemTotal={customPageParam.total}
        paginationQueryParams={queryParams}
        setPaginationQueryParams={setQueryParams}
      />
      <UpdatePositionModal
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        setReset={setReset}
        position={position}
        confirmLoading={!position}
      />
      {isDelete ? (
        <DeletePositionModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          setReset={setReset}
          position={position}
          confirmLoading={!position}
        />
      ) : (
        <HinderDeletePositionModal
          isModalOpen={isHinderDeleteModalOpen}
          setIsModalOpen={setIsHinderDeleteModalOpen}
          confirmLoading={!position}
        />
      )}
    </div>
  );
};
export default PositionManagementTable;

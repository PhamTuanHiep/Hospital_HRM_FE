import { Button, Card, Flex } from "antd";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";
import EmployeesTrainingTable from "./employeesTrainingTable/EmployeesTrainingTable";
import EmployeesWorkingTable from "./employeesWorkingTable/EmployeesWorkingTable";
import { useNavigate } from "react-router-dom";

const TrainingManagementScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [reset, setReset] = useState(false);

  console.log("reset:", reset);
  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={`${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}`}>
                  {t("content.recruitmentPost.RecruitmentManagement")}
                </a>
              </div>
            ),
          },
          {
            title: (
              <a
                href={`${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}/${managerChildPaths.TRAINING_MANAGEMENT}`}
              >
                {t("content.recruitmentPost.TrainingManagement")}
              </a>
            ),
            // menu: {
            //   items: [
            //     {
            //       key: "1",
            //       label: (
            //         <a
            //           href={`${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}`}
            //         >
            //           {t("content.contract.SignedContract")}
            //         </a>
            //       ),
            //     },
            //     {
            //       key: "2",
            //       label: (
            //         <a
            //           href={`${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}/${managerChildPaths.TRAINING_MANAGEMENT}`}
            //         >
            //           {t("content.contract.AddContractHistory")}
            //         </a>
            //       ),
            //     },
            //     {
            //       key: "3",
            //       label: (
            //         <a
            //           href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.CANCELLED_CONTRACT}`}
            //         >
            //           {t("content.contract.CancelledContract")}
            //         </a>
            //       ),
            //     },
            //   ],
            // },
          },
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => {
              navigate(`${managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT}`);
            }}
          >
            {t("content.common.Back")}
          </Button>
        }
      />

      <Flex vertical gap={12}>
        <Card id="employee-table">
          <EmployeesWorkingTable reset={reset} setReset={setReset} />
          <EmployeesTrainingTable reset={reset} setReset={setReset} />
        </Card>
      </Flex>
    </div>
  );
};
export default TrainingManagementScreen;

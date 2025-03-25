import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import {
  getContractHistories,
  getContracts,
  putContractHistories,
} from "../../../../../api/apiServices";
import {
  ContractDetail,
  ContractHistoryDetail,
} from "../../../../../common/common.type";
import {
  INIT_CONTRACT,
  INIT_CONTRACT_HISTORY,
} from "../../../../../common/common.constant";

import { useTranslation } from "react-i18next";
import "./ContractHistoryTables.scss";

import { ContractType } from "../../../constants/manager.constant";
import SignedContractTable from "./signedContractTable/SignedContractTable";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";
import { useNavigate } from "react-router-dom";
import { updateStatusInContractHistories } from "../../../constants/manager.help";

interface ContractHistoryTablesProps {
  isCancelledContractList?: boolean;
}
const ContractHistoryTables = ({
  isCancelledContractList = false,
}: ContractHistoryTablesProps) => {
  const { t } = useTranslation();

  const [contracts, setContracts] = useState<ContractDetail[]>([INIT_CONTRACT]);
  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);

  const [resetApi, setResetApi] = useState<boolean>(false);

  const fetchContracts = async () => {
    const res = await getContracts();
    if (res) {
      const contractsApi = res.data.data;
      setContracts(contractsApi);
    }
  };

  const fetchContractHistories = async () => {
    const res = await getContractHistories();

    if (res) {
      const contractHistoriesApi = res.data.data;
      setContractHistories(contractHistoriesApi);
    }
  };
  const updateStatusContractHistories = async () => {
    const updatedContractHistories =
      updateStatusInContractHistories(contractHistories);
    const res = await putContractHistories(updatedContractHistories);
    console.log("res:", res);
    if (res) {
      setResetApi(true);
      const contractsApi = res.data.data;
      setContracts(contractsApi);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
    fetchContractHistories();
  }, [resetApi]);

  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={managerPaths.CONTRACT_MANAGEMENT}>
                  {t("content.contract.ContractManagement")}
                </a>
              </div>
            ),
          },
          {
            title: (
              <span>
                {isCancelledContractList
                  ? t("content.contract.CancelledContract")
                  : t("content.contract.SignedContract")}
              </span>
            ),
            menu: {
              items: [
                {
                  key: "1",
                  label: (
                    <a
                      // target="_blank"
                      // rel="noopener noreferrer"
                      href={`${managerPaths.CONTRACT_MANAGEMENT}`}
                    >
                      {t("content.contract.SignedContract")}
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a
                      // target="_blank"
                      // rel="noopener noreferrer"
                      href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.ADD_CONTRACT}`}
                    >
                      {t("content.contract.AddContractHistory")}
                    </a>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <a
                      // target="_blank"
                      // rel="noopener noreferrer"
                      href={`${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.CANCELLED_CONTRACT}`}
                    >
                      {t("content.contract.CancelledContract")}
                    </a>
                  ),
                },
              ],
            },
          },
        ]}
        buttonGroup={
          <Flex>
            <Button
              type="primary"
              className="btn-add-object"
              onClick={() => updateStatusContractHistories()}
            >
              {t("content.contract.UpdateStatusOfContracts")}
            </Button>
            <Button
              type="primary"
              className="btn-add-object"
              onClick={() => {
                navigate(
                  `${managerPaths.CONTRACT_MANAGEMENT}/${managerChildPaths.ADD_CONTRACT}`
                );
              }}
            >
              {t("content.contract.AddContractHistory")}
            </Button>
          </Flex>
        }
      />
      {contracts && contracts.length !== 0 && contracts[0].contractId != "" ? (
        <Flex id="table-card-list" vertical gap={12}>
          <SignedContractTable
            contractType={ContractType.FIXED_TERM_EMPLOYMENT_CONTRACT}
            contractTypeTitle={contracts[0].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractType={ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT}
            contractTypeTitle={contracts[1].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractType={ContractType.FIXED_TERM_LABOR_CONTRACT}
            contractTypeTitle={contracts[2].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractType={ContractType.INDEFINITE_TERM_LABOR_CONTRACT}
            contractTypeTitle={contracts[3].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractType={ContractType.COLLABORATION_CONTRACT}
            contractTypeTitle={contracts[4].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractType={ContractType.PROBATIONARY_CONTRACT}
            contractTypeTitle={contracts[5].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
        </Flex>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ContractHistoryTables;

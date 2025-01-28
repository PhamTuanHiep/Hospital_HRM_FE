import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { getContracts } from "../../../../../api/apiServices";
import { ContractDetail } from "../../../../../common/common.type";
import { INIT_CONTRACT } from "../../../../../common/common.constant";

import { useTranslation } from "react-i18next";
import "./ContractHistoryTables.scss";

import { ContractType } from "../../../constants/manager.constant";
import SignedContractTable from "./signedContractTable/SignedContractTable";
import CustomBreadcrumb from "../../../../../components/customBreadcrumb/CustomBreadcrumb";
import {
  managerChildPaths,
  managerPaths,
} from "../../../constants/constant.path";

interface ContractHistoryTablesProps {
  isCancelledContractList?: boolean;
}
const ContractHistoryTables = ({
  isCancelledContractList = false,
}: ContractHistoryTablesProps) => {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState<ContractDetail[]>([INIT_CONTRACT]);

  const fetchContracts = async () => {
    const res = await getContracts();
    if (res) {
      const contractsApi = res.data.data;
      setContracts(contractsApi);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  console.log("contracts:", contracts);
  return (
    <div>
      <CustomBreadcrumb
        breadcrumbItems={[
          {
            title: (
              <div>
                <a href={managerPaths.CONTRACT_MANAGEMENT}>
                  Contract Management
                </a>
              </div>
            ),
          },
          {
            title: (
              <span>
                {isCancelledContractList
                  ? "Cancelled Contract"
                  : "Signed Contract"}
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
                      Signed Contract
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
                      Add User
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
                      Cancelled Contract
                    </a>
                  ),
                },
              ],
            },
          },
        ]}
        buttonGroup={
          <Button
            type="primary"
            className="btn-add-object"
            onClick={() => {
              // navigate(-1);
            }}
          >
            Lập hợp đồng
          </Button>
        }
      />
      {contracts.length !== 0 && contracts[0].contractId != "" ? (
        <Flex id="table-card-list" vertical gap={12}>
          <SignedContractTable
            contractTypeText={ContractType.FIXED_TERM_EMPLOYMENT_CONTRACT}
            contractTypeTitle={contracts[0].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractTypeText={ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT}
            contractTypeTitle={contracts[1].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractTypeText={ContractType.FIXED_TERM_LABOR_CONTRACT}
            contractTypeTitle={contracts[2].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractTypeText={ContractType.INDEFINITE_TERM_LABOR_CONTRACT}
            contractTypeTitle={contracts[3].contractNameVI}
            isCancelledContractList={isCancelledContractList}
          />
          <SignedContractTable
            contractTypeText={ContractType.COLLABORATION_CONTRACT}
            contractTypeTitle={contracts[4].contractNameVI}
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

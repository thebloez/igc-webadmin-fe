import CustomerColumn from "@components/customer/CustomerColumn";
import CustomerTable from "@components/customer/CustomerTable";
import HeaderContent from "@components/dashboard/layout/HeaderContent";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import {
  ICustomerData,
  ICustomerTableState,
} from "@domain/entities/CustomerEntity";
import CustomerUseCase from "@domain/useCases/CustomerUseCase";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import CustomerViewModel from "@viewModels/CustomerViewModel";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  // navigate function from react-router-dom
  const navigate = useNavigate();

  // get token from redux
  const token = useSelector(selectToken);

  // set state for table
  const [table, setTable] = useState<ICustomerTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    total: 0,
    data: [],
  });

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = async () => {
    const certificateUseCase = new CustomerUseCase();
    const certificateViewModel = new CustomerViewModel(certificateUseCase);

    await certificateViewModel.getCustomer(token, setTable);
  };

  const gotoAddPage = () => {
    navigate("/customer/add");
  };

  const onEdit = (data: ICustomerData) => {
    navigate(`/customer/edit/${data.mobile_phone}`);
  };
  return (
    <div className="tw-m-0 tw-p-6 ">
      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          title={t("customer.list.title")}
          description={t("customer.list.description")}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              onClick={gotoAddPage}
              type="primary"
              icon={<PlusSquareIcon />}
              className="!tw-h-[45px] tw-w-full md:tw-w-auto tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("customer.list.button.add")}
            </Button>
          </div>
        </HeaderContent>
        <CustomerTable
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          columns={CustomerColumn({
            onEdit,
          })}
        />
      </div>
    </div>
  );
};

export default CustomerPage;

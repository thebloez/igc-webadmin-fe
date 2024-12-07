import CustomerColumn from "@components/customer/CustomerColumn";
import CustomerTable from "@components/customer/CustomerTable";
import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { ICustomerTableState } from "@domain/entities/CustomerEntity";
import useCustomerViewModel from "@lib/hooks/useCustomerViewModel";
import { useLanguage } from "@lib/hooks/useLanguage";
import { setUserToken } from "@redux/user/userReduxReducer";
import { selectToken } from "@redux/user/userReduxSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomerPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  // get token from redux
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const clearToken = () => dispatch(setUserToken(""));

  // set state for table
  const [table, setTable] = useState<ICustomerTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    total: 0,
    data: [],
  });

  const customerViewModel = useCustomerViewModel(token, clearToken);

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = async () => {
    await customerViewModel.getCustomer(setTable);
  };

  return (
    <div className="tw-m-0 tw-p-6 ">
      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          title={t("customer.list.title")}
          description={t("customer.list.description")}
        />
        <CustomerTable
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          columns={CustomerColumn()}
        />
      </div>
    </div>
  );
};

export default CustomerPage;

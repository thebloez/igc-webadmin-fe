import CertificateColumn from "@components/certificate/CertificateColumn";
import CertificateTable from "@components/certificate/CertificateTable";
import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, message } from "antd";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import {
  ICertificateDeleteState,
  ICertificateTableState,
} from "@domain/entities/CertificateEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "@redux/user/userReduxReducer";
import useCertificateViewModel from "@lib/hooks/useCertificateViewModel";
import DeleteModal from "@components/modal/DeleteModal";

const CertificatePage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const navigate = useNavigate();
  
  const token = useSelector(selectToken);
  
  const dispatch = useDispatch();
  const clearToken = () => dispatch(setUserToken(""));

  const [modal, setModal] = useState<ICertificateDeleteState>({
    visible: false,
    isLoading: false,
    id: "",
  });

  const [table, setTable] = useState<ICertificateTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    total: 0,
    data: [],
  });

  const certificateViewModel = useCertificateViewModel(token, clearToken);

  useEffect(() => {
    if (table.currentPage === 0) {
      setTable((prevState) => ({
        ...prevState,
        currentPage: 1,
      }));
    } else {
      getCertificate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.currentPage, table.pageSize]);

  const getCertificate = async () => {
    await certificateViewModel.getCertificate(table, setTable);
  };

  const gotoAddPage = () => {
    navigate("/certificate/add");
  };

  const onPrint = (record: any) => {
    console.log("Print", record);
  };

  const onDelete = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      id: record.id,
    }));
  };

  const onPostDelete = async (id: string) => {
    await certificateViewModel
      .deleteCertificate(id, message, setModal)
      .then(() => {
        getCertificate();
      });
  };

  const closeModal = () => {
    setModal((prevState) => ({ ...prevState, visible: false }));
  };

  const onChange = useCallback((props: any) => {
    setTable((prevState) => ({
      ...prevState,
      currentPage: props.current,
      pageSize: props.pageSize,
    }));
  }, []);

  return (
    <div className="tw-m-0 tw-p-6 ">
      <DeleteModal
        open={modal.visible}
        isLoading={modal.isLoading}
        onLeftClick={closeModal}
        onRightClick={onPostDelete}
        wording={{
          description: t("certificate.list.modal.delete.description"),
          warning: {
            title: t("certificate.list.modal.delete.warning.title"),
            description: t("certificate.list.modal.delete.warning.description"),
          },
          button: {
            no: t("certificate.list.modal.delete.button.no"),
            yes: t("certificate.list.modal.delete.button.yes"),
          },
        }}
        data={modal}
      />
      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          title={t("certificate.list.title")}
          description={t("certificate.list.description")}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              onClick={gotoAddPage}
              type="primary"
              icon={<PlusSquareIcon />}
              className="!tw-h-[45px] tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("certificate.list.button.add")}
            </Button>
          </div>
        </HeaderContent>
        {/* <div className="!tw-min-w-[200px] tw-overflow-x-auto tw-relative"> */}
        <CertificateTable
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          onChange={onChange}
          columns={CertificateColumn({
            onDelete,
            onPrint,
          })}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CertificatePage;

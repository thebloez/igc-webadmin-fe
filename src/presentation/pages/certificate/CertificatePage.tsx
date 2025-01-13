import CertificateColumn from "@components/certificate/CertificateColumn";
import CertificateTable from "@components/certificate/CertificateTable";
import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, message } from "antd";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import {
  ICertificateData,
  ICertificateModalState,
  ICertificateTableState,
} from "@domain/entities/CertificateEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "@redux/user/userReduxReducer";
import useCertificateViewModel from "@lib/hooks/useCertificateViewModel";
import { useDebouncedCallback } from "use-debounce";
import { CertificateModals } from "@components/certificate/CertificateModals";

const CertificatePage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const clearToken = () => dispatch(setUserToken(""));

  const [table, setTable] = useState<ICertificateTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    search: "",
    total: 0,
    data: [],
  });

  const [modal, setModal] = useState<ICertificateModalState>({
    visible: false,
    type: "delete",
    isLoading: false,
    showWarning: false,
    data: {} as ICertificateData,
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
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      id: record.id,
      type: "print",
      data: record,
    }));
  };

  const onDelete = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      id: record.id,
      type: "delete",
      showWarning: true,
      data: record,
    }));
  };

  const onPostDelete = async (id: string) => {
    await certificateViewModel
      .deleteCertificate(id, message, setModal)
      .then(() => {
        getCertificate();
        closeModal;
      });
  };

  const onAfterQuestion = () => {
    if (modal.type === "delete") {
      onPostDelete(modal.data.id);
    } else if (modal.type === "after-print") {
      postPrint(modal.data.id);
    }
  };

  const postPrint = async (id: string) => {
    await certificateViewModel
      .printCertificate(id, modal.data.identifier, message, setModal)
      .then(() => {
        getCertificate();
        closeModal();
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

  const onSearch = useDebouncedCallback((value) => {
    setTable((prevState) => ({
      ...prevState,
      search: value,
      currentPage: 0,
    }));
  }, 500);

  const onQuestionPrint = (identifier: string) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      type: "after-print",
      showWarning: false,
      data: {
        ...prevState.data,
        identifier,
      },
    }));
  };

  const onDetail = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      type: "detail",
      data: record,
    }));
  };
  return (
    <div className="tw-m-0 tw-p-6 ">
      <CertificateModals
        onClose={closeModal}
        data={modal.data}
        isLoading={modal.isLoading}
        onRightClick={onAfterQuestion}
        open={modal.visible}
        showWarning={modal.showWarning}
        onAfterPrint={onQuestionPrint}
        type={modal.type}
        showPrint
        title={modal.type === "print" ? "Print Memo" : ""}
        onEdit={() => {}}
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
              className="!tw-h-[45px] tw-w-full sm:tw-w-auto tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("certificate.list.button.add")}
            </Button>
          </div>
        </HeaderContent>
        {/* <div className="!tw-min-w-[200px] tw-overflow-x-auto tw-relative"> */}
        <CertificateTable
          showSearch
          onSearch={onSearch}
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          onChange={onChange}
          columns={CertificateColumn({
            onDelete,
            onPrint,
            onDetail,
          })}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CertificatePage;

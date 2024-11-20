import CertificateColumn from "@components/certificate/CertificateColumn";
import CertificateTable from "@components/certificate/CertificateTable";
import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, message } from "antd";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import {
  ICertificateDeleteState,
  ICertificateTableState,
} from "@domain/entities/CertificateEntity";
import CertificateUseCase from "@domain/useCases/CertificateUseCase";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import CertificateViewModel from "@viewModels/CertificateViewModel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CertificateDeleteModal from "@components/certificate/CertificateDeleteModal";

const CertificatePage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const navigate = useNavigate();

  const token = useSelector(selectToken);

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

  const certificateViewModel = new CertificateViewModel(
    new CertificateUseCase(),
    token
  );

  useEffect(() => {
    getCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCertificate = async () => {
    await certificateViewModel.getCertificate(setTable);
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
    await certificateViewModel.deleteCertificate(id, message, setModal);
  };

  const closeModal = () => {
    setModal((prevState) => ({ ...prevState, visible: false }));
  };
  return (
    <div className="tw-m-0 tw-p-6 ">
      <CertificateDeleteModal
        open={modal.visible}
        isLoading={modal.isLoading}
        onClose={closeModal}
        onDelete={onPostDelete}
        id={modal.id}
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
        <CertificateTable
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          columns={CertificateColumn({
            onDelete,
            onPrint,
          })}
        />
      </div>
    </div>
  );
};

export default CertificatePage;

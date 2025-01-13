import QuestionModal, { IQuestionModal } from "@components/modal/QuestionModal";
import { useTranslation } from "react-i18next";
import PrintCertificate, { IPrintCertificate } from "./PrintCertificate";
import CertificateDetail, { ICertificateDetail } from "./CertificateDetail";
import { ICertificateModalState } from "@domain/entities/CertificateEntity";

type ICertificateModal = IPrintCertificate &
  ICertificateDetail &
  Omit<IQuestionModal, "wording" | "onLeftClick"> & {
    type: ICertificateModalState["type"];
  };

export const CertificateModals = (modal: ICertificateModal) => {
  const { t } = useTranslation();

  if (!modal.open) return null;

  return (
    <>
      <PrintCertificate
        onAfterPrint={modal.onAfterPrint}
        open={modal.open && modal.type === "print"}
        onClose={modal.onClose}
        showPrint
        title="Print Certificate"
        data={modal.data}
      />

      <QuestionModal
        open={
          modal.open && (modal.type === "delete" || modal.type == "after-print")
        }
        isLoading={modal.isLoading}
        onLeftClick={modal.onClose}
        onRightClick={modal.onRightClick}
        showWarning={modal.showWarning}
        wording={{
          description: t(`certificate.list.modal.${modal.type}.description`),
          warning: {
            title: t(`certificate.list.modal.${modal.type}.warning.title`),
            description: t(
              `certificate.list.modal.${modal.type}.warning.description`
            ),
          },
          button: {
            no: t(`certificate.list.modal.${modal.type}.button.no`),
            yes: t(`certificate.list.modal.${modal.type}.button.yes`),
          },
        }}
        data={modal.data}
      />

      <CertificateDetail
        open={modal.open && modal.type === "detail"}
        onClose={modal.onClose}
        data={modal.data}
        onEdit={modal.onEdit}
      />
    </>
  );
};

import QuestionModal, { IQuestionModal } from "@components/modal/QuestionModal";
import { useTranslation } from "react-i18next";
import PrintCertificate, { IPrintCertificate } from "./PrintCertificate";

type ICertificateModal = IPrintCertificate &
  Omit<IQuestionModal, "wording" | "onLeftClick"> & {
    type: "print" | "delete" | "after-print";
  };

export const CertificateModals = (modal: ICertificateModal) => {
  const { t } = useTranslation();

  if (!modal.open) return null;

  return (
    <>
      {modal.type === "print" && (
        <PrintCertificate
          onAfterPrint={modal.onAfterPrint}
          open={modal.open}
          onClose={modal.onClose}
          showPrint
          title="Print Certificate"
          data={modal.data}
        />
      )}

      {(modal.type === "delete" || modal.type == "after-print") && (
        <QuestionModal
          open={modal.open}
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
      )}
    </>
  );
};

import QuestionModal, { IQuestionModal } from "@components/modal/QuestionModal";
import { useTranslation } from "react-i18next";
import PrintCertificate, { IPrintCertificate } from "./PrintCertificate";

type ICertificateModal = IPrintCertificate &
  Omit<IQuestionModal, "wording" | "onLeftClick"> & {
    type: "print" | "delete";
  };

export const CertificateModals = (modal: ICertificateModal) => {
  const { t } = useTranslation();

  if (!modal.open) return null;

  return (
    <>
      {modal.type === "print" && (
        <PrintCertificate
          onPrint={modal.onPrint}
          open={modal.open}
          onClose={modal.onClose}
          showPrint
          title="Print Certificate"
          data={modal.data}
        />
      )}

      {modal.type === "delete" && (
        <QuestionModal
          open={modal.open}
          isLoading={modal.isLoading}
          onLeftClick={modal.onClose}
          onRightClick={modal.onRightClick}
          wording={{
            description: t("certificate.list.modal.delete.description"),
            warning: {
              title: t("certificate.list.modal.delete.warning.title"),
              description: t(
                "certificate.list.modal.delete.warning.description"
              ),
            },
            button: {
              no: t("certificate.list.modal.delete.button.no"),
              yes: t("certificate.list.modal.delete.button.yes"),
            },
          }}
          data={modal.data}
        />
      )}
    </>
  );
};

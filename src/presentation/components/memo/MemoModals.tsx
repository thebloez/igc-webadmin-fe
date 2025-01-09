import QuestionModal, { IQuestionModal } from "@components/modal/QuestionModal";
import { useTranslation } from "react-i18next";
import PrintMemo, { IPrintMemo } from "./PrintMemo";

type IMemoModal = IPrintMemo &
  Omit<IQuestionModal, "wording" | "onLeftClick"> & {
    type: "print" | "delete" | "upgrade" | "after-print";
  };

export const MemoModals = (modal: IMemoModal) => {
  const { t } = useTranslation();

  if (!modal.open) return null;

  return (
    <>
      <PrintMemo
        onAfterPrint={modal.onAfterPrint}
        open={modal.open && modal.type === "print"}
        onClose={modal.onClose}
        showPrint
        title="Print Memo"
        data={modal.data}
      />

      <QuestionModal
        open={
          modal.open &&
          (modal.type === "delete" || modal.type === "after-print")
        }
        isLoading={modal.isLoading}
        onLeftClick={modal.onClose}
        onRightClick={modal.onRightClick}
        showWarning={modal.showWarning}
        title={modal.data.title}
        wording={{
          description: t(`memo.list.modal.${modal.type}.description`),
          warning: {
            title: t(`memo.list.modal.${modal.type}.warning.title`),
            description: t(`memo.list.modal.${modal.type}.warning.description`),
          },
          button: {
            no: t(`memo.list.modal.${modal.type}.button.no`),
            yes: t(`memo.list.modal.${modal.type}.button.yes`),
          },
        }}
        data={modal.data}
      />
    </>
  );
};

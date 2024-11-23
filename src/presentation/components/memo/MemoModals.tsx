import QuestionModal, { IQuestionModal } from "@components/modal/QuestionModal";
import PrintMemo, { IPrintMemo } from "@components/print/PrintMemo";
import { useTranslation } from "react-i18next";

type IMemoModal = IPrintMemo &
  Omit<IQuestionModal, "wording" | "onLeftClick"> & {
    type: "print" | "delete";
  };

export const MemoModals = (modal: IMemoModal) => {
  const { t } = useTranslation();

  if (!modal.open) return null;

  return (
    <>
      {modal.type === "print" && (
        <PrintMemo
          onPrint={modal.onPrint}
          open={modal.open}
          onClose={modal.onClose}
          showPrint
          title="Print Memo"
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
            description: t("memo.list.modal.delete.description"),
            warning: {
              title: t("memo.list.modal.delete.warning.title"),
              description: t("memo.list.modal.delete.warning.description"),
            },
            button: {
              no: t("memo.list.modal.delete.button.no"),
              yes: t("memo.list.modal.delete.button.yes"),
            },
          }}
          data={modal.data}
        />
      )}
    </>
  );
};

import React, { useRef } from "react";
import { Button, Modal } from "antd";
import { useReactToPrint } from "react-to-print";
import randomString from "@lib/utils/randomString";
import { useLanguage } from "@lib/hooks/useLanguage";
import { IMemoData } from "@domain/entities/MemoEntity";
import MemoSection from "./MemoSection";

import "./PrintMemo.style.css";

export interface IPrintMemo {
  title: string;
  open: boolean;
  onAfterPrint: (identifier: string) => void;
  showPrint?: boolean;
  data: IMemoData;
  onClose: () => void;
}

const PrintMemo: React.FC<IPrintMemo> = ({
  title,
  data,
  open,
  showPrint,
  onAfterPrint,
  onClose,
}) => {
  const identifier = randomString();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      onAfterPrint(identifier);
    },
  });
  const { t } = useLanguage();

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      destroyOnClose
      styles={{
        header: {
          margin: 0,
        },
      }}
      title={
        <div className="tw-p-4 tw-border-b tw-flex tw-items-start tw-flex-col tw-justify-between">
          <h2 className="tw-text-lg tw-font-bold">{title}</h2>
          <p className="tw-text-xxs tw-text-gray-600 tw-p-2 tw-bg-primary-500 tw-bg-opacity-10 tw-rounded-md">
            Print Version:{" "}
            <span className="tw-font-semibold">{data.print_version}</span>
          </p>
        </div>
      }
      className="tw-font-sans"
    >
      <div ref={contentRef}>
        <MemoSection data={data} identifier={identifier} />
      </div>

      <div>
        {showPrint && (
          <div className="tw-flex tw-w-full tw-justify-end tw-p-2">
            <Button
              onClick={() => reactToPrintFn()}
              type="primary"
              className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold !tw-bg-green-500 hover:!tw-bg-green-600"
            >
              {t("memo.list.button.print")}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PrintMemo;

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
    pageStyle: `
            @page {
              size: 1016px 638px;
              margin: 0;
              padding: 0;
              border-radius: 10px;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
            body {
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
          `,
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
        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
          <div className="tw-p-4 tw-border-b tw-flex tw-items-start tw-flex-col tw-justify-between tw-w-1/2">
            <h2 className="tw-text-lg tw-font-bold">{title}</h2>
            <p className="tw-text-xxs tw-text-gray-600 tw-p-2 tw-bg-primary-500 tw-bg-opacity-10 tw-rounded-md">
              Print Version:{" "}
              <span className="tw-font-semibold">{data.print_version}</span>
            </p>
          </div>
          <div className="tw-flex tw-items-center tw-justify-end tw-w-1/2">
            {showPrint && (
              <Button
                onClick={() => reactToPrintFn()}
                type="primary"
                className="!tw-h-[35px] tw-mr-[50px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold !tw-bg-green-500 hover:!tw-bg-green-600"
              >
                {t("certificate.list.button.print")}
              </Button>
            )}
          </div>
        </div>
      }
      className="tw-font-sans"
    >
      <div ref={contentRef}>
        <MemoSection data={data} identifier={identifier} />
      </div>
    </Modal>
  );
};

export default PrintMemo;

import HologramIcon from "@components/icon/HologramIcon";
import LogoWhiteIcon from "@components/icon/LogoWhiteIcon";
import { IMemoData } from "@domain/entities/MemoEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import objectToArray from "@lib/utils/objectToArray";
import { Button, Modal } from "antd";
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

import "./PrintMemo.style.css";

export interface IPrintMemo {
  title: string;
  open: boolean;
  onPrint: () => void;
  showPrint?: boolean;
  data: IMemoData;
  onClose: () => void;
}
const excludes = [
  "object_name",
  "object_image",
  "measurement",
  "shape",
  "id_master",
];
const PrintMemo: React.FC<IPrintMemo> = ({
  title,
  data,
  open,
  showPrint,
  onPrint,
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, onAfterPrint: onPrint });
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
        <div className="tw-flex tw-p-4 tw-items-center tw-gap-2 tw-border-b">
          <h2 className="tw-text-lg tw-font-bold">{title}</h2>
        </div>
      }
      className="tw-font-sans"
    >
      <div
        ref={contentRef}
        className="tw-bg-white !tw-h-[483px] !tw-w-[800px] tw-rounded-lg tw-shadow-lg tw-font-sans"
      >
        <div
          style={{
            background:
              "linear-gradient(97.83deg, #262626 1.52%, #515151 26.73%, #292929 50.97%)",
          }}
          className="tw-flex tw-p-4 tw-w-full tw-items-center tw-justify-between"
        >
          <LogoWhiteIcon width={100} height={100} />
          <h1 className="tw-text-xl tw-text-[#F5AE26] tw-font-bold">
            {data.identifier}
          </h1>
          <div className=" tw-p-2 tw-bg-white tw-rounded-sm">
            <QRCode
              value={data?.member_phone_number}
              size={64}
              bgColor="#FFFFFF"
              fgColor="#000000"
            />
          </div>
        </div>
        <div
          className=" tw-py-4 tw-pl-[50px] tw-flex tw-justify-between"
          style={{
            background:
              "linear-gradient(90deg, #E7E7E7 12%, #FCFCFC 39%, #F8F8F8 56%, #EEEEEE 69%, #DDDDDD 82%, #C6C6C6 94%, #BDBDBD 98%)",
          }}
        >
          <div className="tw-w-[60%]">
            {objectToArray(data.attributes, excludes).map((detail, index) => (
              <div key={index} className="tw-flex tw-justify-between tw-py-2">
                <div className="tw-w-[30%]">
                  <p>{detail.label}</p>
                </div>
                <div className="tw-w-[5%]">
                  <p>:</p>
                </div>
                <div className="tw-w-[65%]">
                  <p>{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="tw-flex tw-items-center tw-w-[40%] tw-flex-col tw-justify-center tw-gap-4 tw-mt-6 tw-relative tw-overflow-hidden tw-px-2">
            <div
              className="tw-w-5 tw-h-[80%] tw-absolute tw-left-0 tw-top-0 tw-rounded-r-full"
              style={{
                boxShadow: "inset 2px 0 6px -6px rgba(0, 0, 0, 1)",
                background:
                  "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01), transparent)",
                zIndex: 1, // Optional if layering is required
              }}
            />
            <div className="tw-bg-[#424242] tw-border-[2px] tw-rounded-lg tw-border-[#F5AE26] tw-w-[220px] tw-h-[150px]">
              <img
                src={data.attributes.object_image as any}
                alt="Gem"
                className="tw-w-full tw-h-full tw-object-fill tw-rounded-md"
              />
            </div>
            <div className="tw-justify-center tw-items-center tw-gap-2 tw-flex tw-w-full">
              <div className="">
                <p className="tw-text-xs">{data.created_at}</p>
              </div>
              <div className="tw-w-50">
                <HologramIcon width={50} height={50} />
              </div>
              <div className="">
                <p className="tw-text-xs">{data.attributes.id_master}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-bg-black tw-p-4">
          <p className="tw-text-xs tw-text-gray-400 tw-text-center">
            All Information represent the opinion of{" "}
            <span className="tw-text-[#F6AE28]">IGC Lab</span> at the time of
            testing
          </p>
        </div>
      </div>

      <div>
        {showPrint && (
          <div className="tw-flex tw-justify-end tw-p-2">
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

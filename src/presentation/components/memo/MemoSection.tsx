import React from "react";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import LogoWhiteIcon from "@components/icon/LogoWhiteIcon";
import { IMemoData } from "@domain/entities/MemoEntity";
import { PrintMemoItem } from "./PrintMemoItem";
import config from "@config/app.config";

interface MemoSectionProps {
  data: IMemoData;
  identifier: string;
}

const MemoSection: React.FC<MemoSectionProps> = ({ data, identifier }) => {
  return (
    <div
      className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-font-sans tw-flex tw-flex-col tw-justify-between"
      style={{
        height: "5.4in", // Page width in cm
        width: "8.5in", // Page height in cm
        padding: "0", // Optional padding
        boxSizing: "border-box",
      }}
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
          {data.attributes.final_identification}
        </h1>
        <div className=" tw-p-2 tw-bg-white tw-rounded-sm">
          <QRCode
            value={
              `${config.qrHost}certificate?code=` +
              data.attributes.id_master +
              "-" +
              identifier
            }
            size={64}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>
      </div>
      <div
        className=" tw-py-4 tw-pl-[50px] tw-flex tw-justify-between tw-h-full"
        style={{
          background:
            "linear-gradient(90deg, #E7E7E7 12%, #FCFCFC 39%, #F8F8F8 56%, #EEEEEE 69%, #DDDDDD 82%, #C6C6C6 94%, #BDBDBD 98%)",
        }}
      >
        <div className="tw-w-[60%]">
          <PrintMemoItem label="Color" value={data.attributes.color} />

          <PrintMemoItem
            label="Weight"
            value={`${data.attributes.weight} carat`}
          />
          <PrintMemoItem
            label="Measurement"
            value={`${data.attributes.measurement} (mm)`}
          />

          <PrintMemoItem label="Shape" value={`${data.attributes.shape}`} />

          <PrintMemoItem label="Cut" value={`${data.attributes.cut}`} />

          <PrintMemoItem
            label="Comments"
            value={`${data.attributes.cut ?? "-"}`}
          />

          {data.attributes.origins && (
            <PrintMemoItem
              label="Origins"
              value={data.attributes.origins.name}
            />
          )}
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
          <div className="tw-justify-between tw-items-center tw-gap-2 tw-flex tw-w-full">
            <div className="">
              <p className="tw-text-xs tw-font-semibold">
                {format(new Date(data.created_at), "d MMM yyyy", {
                  locale: id,
                })}
              </p>
            </div>
            <div className="">
              <p className="tw-text-xs tw-font-semibold">
                {data.attributes.id_master}-{identifier}
              </p>
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
  );
};

export default MemoSection;

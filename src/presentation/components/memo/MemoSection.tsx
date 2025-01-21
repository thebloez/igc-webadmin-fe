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
      className="tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-lg tw-font-sans tw-flex tw-flex-col tw-justify-between"
      style={{
        height: "645px", // Page width in cm
        width: "1025px", // Page height in cm
        padding: "0", // Optional padding
        boxSizing: "border-box",
        borderRadius: "20px", // Optional border radius
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#262626",
        }}
        className="tw-flex tw-py-2 tw-px-6 tw-w-full tw-items-center tw-justify-between"
      >
        <div className="tw-w-[300px] tw-h-[200po] tw-overflow-hidden">
          <LogoWhiteIcon className="tw-w-full tw-h-full" />
        </div>
        <div className="tw-w-[80%] tw-flex tw-items-center tw-justify-center tw-px-2">
          <h1 className="tw-text-4xl tw-text-[#F5AE26] tw-font-bold tw-text-center">
            {data.attributes.final_identification}
          </h1>
        </div>
        <div className="tw-w-1/6" />
      </div>
      <div
        className=" tw-py-4 tw-pl-[50px] tw-flex tw-justify-between tw-items-center tw-h-full"
        style={{
          background:
            "linear-gradient(90deg, #E7E7E7 12%, #FCFCFC 39%, #F8F8F8 56%, #EEEEEE 69%, #DDDDDD 82%, #C6C6C6 94%, #BDBDBD 98%)",
        }}
      >
        <div className="tw-w-[65%]">
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
            value={`${data.attributes.comments ?? "-"}`}
          />

          {data.attributes.origins && (
            <PrintMemoItem
              label="Origins"
              value={data.attributes.origins.name}
            />
          )}
        </div>
        <div className="tw-flex tw-items-center tw-w-[35%] tw-flex-col tw-justify-center tw-gap-4 tw-mt-6 tw-relative tw-overflow-hidden tw-px-2">
          <div className="tw-border-[2px] tw-border-black tw-bg-white tw-rounded-xl tw-w-[250px] tw-h-[200px] tw-overflow-hidden">
            <img
              src={data.attributes.object_image as any}
              alt="Gem"
              className="tw-w-full tw-h-full tw-object-scale-down tw-rounded-md"
            />
          </div>
          <div className="tw-justify-start tw-items-center tw-gap-2 tw-flex tw-w-full">
            <div className=" tw-p-2 tw-bg-white tw-rounded-sm">
              <QRCode
                value={
                  `${config.qrHost}certificate?code=` +
                  data.attributes.id_master +
                  "-" +
                  identifier
                }
                size={120}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>
            <div className="">
              <p className="tw-text-base tw-font-bold">
                {data.attributes.id_master}-{identifier}
              </p>
              <p className="tw-text-base tw-font-bold">
                {format(new Date(data.created_at), "d MMM yyyy", {
                  locale: id,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-w-full tw-bg-[#262626]">
        <svg width="100%" height="39px" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#262626" />
          <text
            x="50%"
            y="50%"
            font-size="12"
            fill="white"
            font-weight="bold"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            All Information represent the opinion of{" "}
            <tspan fill="#F6AE28">IGC Lab</tspan> at the time of testing
          </text>
        </svg>
      </div>
    </div>
  );
};

export default MemoSection;

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
        position: "relative",
      }}
    >
      <div
        style={{
          background: "#262626",
        }}
        className="tw-flex tw-px-6 tw-w-full tw-items-center tw-justify-between tw-h-full"
      >
        <div className="tw-w-[300px] tw-overflow-hidden">
          <LogoWhiteIcon className="tw-w-full tw-h-full" />
        </div>
        <div className="tw-w-[100%] tw-flex tw-items-end tw-justify-start tw-pb-1 tw-h-full">
          <h1 className="tw-text-4xl tw-text-white">
            International Gemological Certification
          </h1>
        </div>
        <div className="tw-w-1/6" />
      </div>
      <div
        className="tw-flex tw-justify-between tw-items-start tw-w-full"
        style={{ height: "477px" }}
      >
        <div
          className="tw-w-full tw-relative tw-px-1 "
          style={{ height: "477px" }}
        >
          <div className="tw-w-full tw-flex tw-justify-center tw-items-center">
            <div className="tw-w-[100%]">
              <h1
                className="tw-text-3xl tw-text-black tw-font-extrabold tw-text-center tw-px-4"
                style={{
                  lineHeight: "1",
                }}
              >
                {data.attributes.final_identification}
              </h1>
            </div>
          </div>
          <div
            className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center "
            style={{ height: "90%", overflow: "hidden" }}
          >
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
                label="Origin"
                value={data.attributes.origins.name}
              />
            )}
          </div>
        </div>
        <div className="tw-flex tw-items-end tw-w-[35%] tw-h-[477px] tw-flex-col tw-justify-center tw-relative tw-overflow-hidden tw-px-1">
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4">
            <p className="tw-text-lg tw-font-bold">
              {format(new Date(data.created_at), "d MMM yyyy", {
                locale: id,
              })}
            </p>
            <img
              src={data.attributes.object_image as any}
              alt="Gem"
              className="tw-border-[2px] tw-bg-white tw-border-black tw-w-[2.6in] tw-h-[2.1in] tw-overflow-hidden tw-object-scale-down tw-rounded-md"
            />
            <div className="tw-justify-start tw-items-center tw-gap-2 tw-flex tw-flex-col tw-w-full">
              <div className="">
                <p className="tw-text-base tw-font-bold">
                  {data.attributes.id_master}-{identifier}
                </p>
              </div>
              <div className=" tw-p-2 tw-bg-white tw-rounded-sm">
                <QRCode
                  value={
                    `${config.qrHost}certificate?code=` +
                    data.attributes.id_master +
                    "-" +
                    identifier
                  }
                  size={100}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-w-full tw-bg-[#262626]">
        <svg width="100%" height="50px" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="50%"
            font-size="24"
            fill="white"
            font-weight="semibold"
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

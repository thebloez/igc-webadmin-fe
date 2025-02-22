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
  size: {
    width: string;
    height: string;
  };
}

const MemoSection: React.FC<MemoSectionProps> = ({ data, identifier, size }) => {
  return (
    <div
      className="tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-lg tw-font-sans tw-flex tw-flex-col tw-justify-between"
      style={{
        height: size.height, // Page width in cm
        width: size.width, // Page height in cm
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
        className="tw-flex tw-px-6 tw-w-full tw-items-center tw-justify-between"
      >
        <div className="tw-w-[380px] tw-overflow-hidden">
          <LogoWhiteIcon className="tw-w-full tw-h-full" />
        </div>
        <div className="tw-w-[100%] tw-flex tw-items-center tw-pt-5 tw-pl-1 tw-justify-start tw-pb-0 tw-h-full">
          <h1 className="tw-text-3xl tw-text-white">
            International Gemological Certification
          </h1>
        </div>
        <div className="tw-w-1/6" />
      </div>
      <div
        className="tw-flex tw-justify-between tw-items-start tw-w-full"
        style={{ height: "460px" }}
      >
        <div
          className="tw-w-full tw-relative tw-block tw-px-1"
          style={{ height: "460px" }}
        >
          <div className="tw-w-full tw-flex tw-justify-center tw-items-center">
            <div className="tw-w-[100%] tw-pt-2">
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
            className="tw-w-full tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-items-center"
            style={{ minHeight: "90%", overflow: "hidden" }}
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
        <div className="tw-flex tw-items-end tw-w-[40%] tw-h-[460px] tw-flex-col tw-justify-start tw-relative tw-overflow-hidden tw-px-1">
          <div className="tw-h-[10px] tw-w-full">
            <p className="tw-text-xl tw-font-bold tw-text-center">
              {format(new Date(data.created_at), "d MMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-h-full tw-items-center tw-gap-4">
            <div className="tw-w-full tw-h-[2.4in] tw-bg-white tw-border-[2px] tw-border-black tw-overflow-hidden tw-rounded-md">
              <img
                src={data.attributes.object_image as any}
                alt="Gem"
                style={{
                  height: "100%",
                  width: "100%",
                }}
                className="tw-overflow-hidden tw-object-cover"
              />
            </div>

            <div className="tw-justify-start tw-items-center tw-gap-2 tw-flex tw-flex-col tw-w-full">
              <div className="">
                <p className="tw-text-lg tw-font-bold">
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

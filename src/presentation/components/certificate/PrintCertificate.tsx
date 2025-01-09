import { ICertificateData } from "@domain/entities/CertificateEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { Button, Modal } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import LogoBlackIcon from "@components/icon/LogoBlackIcon";
import UnderlineIcon from "@components/icon/UnderlineIcon";
import DotIcon from "@components/icon/DotIcon";
import PrintItemCertificate from "./PrintItemCertificate";
import WorldMap from "@components/map/WorldMap";
import LogoTransparentIcon from "@components/icon/LogoTransparentIcon";

import "./PrintCertificate.style.css";
import HologramFlatIcon from "@components/icon/HologramFlatIcon";
import QRCode from "react-qr-code";
import randomString from "@lib/utils/randomString";
import config from "@config/app.config";

export interface IPrintCertificate {
  title: string;
  open: boolean;
  onAfterPrint: (identifier: string) => void;
  showPrint?: boolean;
  data: ICertificateData;
  onClose: () => void;
}

const PrintCertificate: React.FC<IPrintCertificate> = ({
  title,
  data,
  open,
  showPrint,
  onAfterPrint,
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      onAfterPrint(identifier);
    },
  });

  const { t } = useLanguage();

  const identifier = randomString();

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
      <div
        ref={contentRef}
        className="tw-shadow-lg tw-w-[853px] tw-font-sans tw-relative"
        style={{
          background: "linear-gradient(180deg, #F1F1F1 43%, #BABCBE 100%)",
        }}
      >
        {/* background */}
        <div className="tw-absolute tw-w-full tw-flex tw-px-[50px] tw-justify-between tw-items-center tw-h-full tw-gap-2">
          <LogoTransparentIcon className="tw-w-1/2" />
          <LogoTransparentIcon className="tw-w-1/2" />
        </div>
        <div className="tw-flex tw-px-10 tw-w-full tw-mb-2 tw-items-end tw-justify-between">
          <LogoBlackIcon width={120} />
          <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.69052 14.4799C3.70052 14.4599 0.539665 11.2499 0.559665 7.21994C0.579665 3.32994 3.83056 0.129877 7.73056 0.159877C11.7206 0.189877 14.8697 3.39987 14.8497 7.39987C14.8297 11.2999 11.6005 14.4899 7.69052 14.4799ZM11.1202 7.55001H4.28037C4.30037 8.63001 4.43986 9.66994 4.75986 10.7199C6.71986 10.3299 8.68048 10.3299 10.6505 10.7199C10.9705 9.67994 11.11 8.63001 11.13 7.55001H11.1202ZM11.1202 7.08004C11.1202 6.99004 11.1202 6.91004 11.1202 6.83004C11.0802 5.93004 10.9598 5.02988 10.7198 4.15988C10.6698 3.95988 10.6 3.90992 10.38 3.94992C8.89998 4.22992 7.41002 4.28005 5.92002 4.09005C5.53002 4.04005 5.14033 3.97989 4.74033 3.91989C4.43033 4.95989 4.27963 6.01004 4.26963 7.08004H11.1104H11.1202ZM4.90049 3.47995C6.78049 3.85995 8.61982 3.85995 10.4698 3.47995C10.3498 2.80995 9.63041 1.6499 9.07041 1.1799C8.14041 0.399897 7.13009 0.409965 6.25009 1.24997C5.61009 1.84997 5.22049 2.60994 4.90049 3.46994V3.47995ZM4.92978 11.1499C5.06978 11.8499 5.76017 12.9699 6.33017 13.4599C7.21017 14.2199 8.16966 14.2199 9.05966 13.4599C9.62966 12.9799 10.0001 12.3499 10.2901 11.6799C10.3601 11.5199 10.4201 11.3499 10.5001 11.1499C8.62009 10.7699 6.78978 10.7699 4.92978 11.1499ZM11.6505 7.08004H14.3604C14.3604 7.08004 14.39 7.02998 14.38 7.01998C14.34 5.63998 13.8804 4.41002 13.0704 3.31002C13.0404 3.27002 12.93 3.23997 12.88 3.25997C12.3 3.43998 11.71 3.64003 11.17 3.82003C11.33 4.90003 11.4905 5.98005 11.6505 7.09005V7.08004ZM4.24033 3.81002C3.71033 3.64002 3.15045 3.46998 2.61045 3.26998C2.44045 3.20998 2.35963 3.24985 2.26963 3.37985C1.70963 4.16985 1.31974 5.02995 1.13974 5.97995C1.06974 6.33995 1.04009 6.71004 1.00009 7.08004H3.76963C3.92963 5.98004 4.09009 4.89002 4.25009 3.81002H4.24033ZM4.24033 10.82C4.08033 9.73003 3.91986 8.65002 3.75986 7.56002H1.00986C1.05986 8.98002 1.50994 10.2301 2.33994 11.3401C2.36994 11.3801 2.49966 11.3901 2.55966 11.3701C3.12966 11.1901 3.70056 11 4.23056 10.82H4.24033ZM11.1603 10.82C11.6903 10.99 12.2501 11.1601 12.7901 11.3601C12.9601 11.4201 13.04 11.38 13.13 11.25C13.69 10.46 14.0799 9.59987 14.2599 8.64987C14.3299 8.28987 14.3603 7.92001 14.4103 7.55001H11.6397C11.4797 8.65001 11.3203 9.74003 11.1603 10.82ZM12.7101 2.86007C11.7701 1.84007 10.7105 1.19007 9.44052 0.860072C10.1505 1.57007 10.6001 2.42986 10.9601 3.38986C11.5401 3.20986 12.0901 3.04006 12.7101 2.85006V2.86007ZM9.45029 13.79C10.7103 13.44 11.7803 12.79 12.7003 11.77C12.0803 11.58 11.5206 11.41 10.9806 11.25C10.7406 11.74 10.5597 12.1901 10.3097 12.6101C10.0597 13.0201 9.75029 13.39 9.45029 13.79ZM5.96006 0.870082C4.69006 1.19008 3.62029 1.84007 2.70029 2.86007C3.32029 3.05007 3.89029 3.21986 4.45029 3.38986C4.81029 2.41986 5.25006 1.58008 5.96006 0.870082ZM5.96006 13.76C5.24006 13.05 4.81052 12.1799 4.44052 11.2299C3.86052 11.4099 3.30052 11.58 2.69052 11.77C3.62052 12.78 4.68029 13.44 5.95029 13.76H5.96006Z"
                fill="#444444"
              />
            </svg>

            <p className="tw-font-semibold tw-text-xs">www.igclab.com</p>
          </div>
        </div>
        {/* underline */}
        <div className="tw-w-full w-flex tw-justify-center tw-items-center">
          <UnderlineIcon className="tw-w-full" />
        </div>

        <div className=" tw-py-4 tw-pl-[50px] tw-flex tw-justify-between">
          <div className="tw-w-[50%]">
            <div className="tw-flex tw-justify-start tw-items-start tw-pb-4 tw-gap-2">
              <div className="tw-py-3">
                <DotIcon className="tw-text-[#E7375A]" />
              </div>
              <div>
                <h1 className="tw-text-base tw-font-semibold tw-text-gray-900">
                  Complete Gemstone Analysis
                </h1>
                <p className="tw-text-sm tw-text-gray-600">{`${data.id}-${identifier}`}</p>
              </div>
            </div>

            <div className="tw-mt-2 tw-w-full">
              <PrintItemCertificate
                title="Date"
                value={format(new Date(data.created_at), "d MMM yyyy", {
                  locale: id,
                })}
                color="#E7375A"
              />
              <PrintItemCertificate
                title="Object"
                value={data.attributes.object_name}
                color="#3CB687"
              />
              <PrintItemCertificate
                title="Measurements"
                value={`${data.attributes.measurement} (mm)`}
                color="#D7BF2A"
              />
              <PrintItemCertificate
                title="Shape"
                value={data.attributes.shape}
                color="#E7375A"
              />
              <PrintItemCertificate
                title="Clarity"
                value={data.attributes.clarity}
                color="#4261AB"
              />
              <PrintItemCertificate
                title="Transparency"
                value={data.attributes.transparency}
                color="#3CB687"
              />
            </div>
            <div className="tw-mt-2 tw-w-full">
              <PrintItemCertificate
                title="Cut"
                value={data.attributes.cut}
                color="#E7375A"
              />
              <PrintItemCertificate
                title="Color"
                value={data.attributes.color}
                color="#3CB687"
              />
              <PrintItemCertificate
                title="Weight"
                value={`${data.attributes.weight} carat`}
                color="#D7BF2A"
              />
              <PrintItemCertificate
                title="Comment"
                value={data.attributes.comments}
                color="#E7375A"
              />
              <PrintItemCertificate
                title="Origins"
                value={`The Origins of this Stone is from ${data.attributes.origins.name}`}
                direction="col"
                color="#4261AB"
              />
            </div>
            <div className="tw-flex tw-w-full tw-items-center tw-justify-between tw-gap-2">
              <div>
                <WorldMap
                  lat={data.attributes.origins.additional_data.lat}
                  lng={data.attributes.origins.additional_data.long}
                />
              </div>
              <div>
                <p className="tw-text-xxs tw-text-[#444444]">
                  "Based on our gemological analysis and equipment, we believe
                  that this sapphire is originated fromWest Sumatra in
                  Indonesia"
                </p>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-items-center tw-w-[50%] tw-flex-col tw-justify-center tw-gap-10 tw-mt-6 tw-relative tw-overflow-hidden tw-px-2">
            <div className="tw-w-[220px] tw-h-[200px]">
              <img
                src={data.attributes.object_image as any}
                alt="Gem"
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-md"
              />
              <p className="tw-text-center tw-text-[#444444] tw-text-xl tw-font-bold tw-py-2">
                {data.attributes.final_identification}
              </p>
            </div>
            <div className="tw-justify-center tw-items-center tw-gap-4 tw-flex tw-w-full">
              <div className="tw-w-[100%] tw-flex tw-flex-col tw-items-center">
                <QRCode
                  value={
                    `${config.qrHost}certificate?code=` +
                    data.attributes.id_master +
                    "-" +
                    identifier
                  }
                  size={70}
                  bgColor="transparent"
                  fgColor="#000000"
                />
                <p className="tw-font-semibold">E-Certificate</p>
              </div>

              <div className="tw-w-[100%]">
                <p className="tw-text-xs tw-text-center tw-font-bold tw-mt-2">
                  Idris
                </p>
              </div>
              <div className="tw-w-[100%]">
                <HologramFlatIcon width={50} height={50} />
              </div>
            </div>
            <div>
              <p className="tw-text-xxxs tw-text-[#444444] tw-px-4 tw-text-center">
                This certification and the information written in it reflects
                upon the identification and the characteristics of the gemstone
                at the time of checking. The verification process strictly
                adheres to the International Standard of Gemological Testing and
                Equipment and IGC's Standard Operation Procedure. To ensure the
                authenticity of this card, contact IGC.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {showPrint && (
          <div className="tw-flex tw-w-full tw-justify-end tw-p-2">
            <Button
              onClick={() => reactToPrintFn()}
              type="primary"
              className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold !tw-bg-green-500 hover:!tw-bg-green-600"
            >
              {t("certificate.list.button.print")}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PrintCertificate;

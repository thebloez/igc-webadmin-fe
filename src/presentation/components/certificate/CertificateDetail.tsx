import PencilIcon from "@components/icon/PencilIcon";
import { ICertificateData } from "@domain/entities/CertificateEntity";
import isNullOrEmpty from "@lib/utils/isNullOrEmpty";
import { Button, Modal } from "antd";

export interface ICertificateDetail {
  data: ICertificateData;
  open: boolean;
  onClose: () => void;
  onEdit: (data: ICertificateData) => void;
}

const CertificateDetail = (props: ICertificateDetail) => {
  return (
    <Modal
      open={props.open}
      onCancel={props.onClose}
      footer={null}
      wrapStyle={{
        width: "640px",
        margin: "auto",
      }}
      destroyOnClose
      title={
        <div className="tw-flex tw-p-4 tw-items-center tw-gap-2">
          <h2 className="tw-text-lg tw-font-bold">Detail Certificate</h2>
        </div>
      }
      styles={{
        header: {
          borderBottom: "1px solid #E0E0E0",
        },
      }}
      className="tw-font-sans"
    >
      <div className="tw-flex tw-w-full tw-flex-col tw-p-[20px] tw-items-start tw-gap-4 tw-relative">
        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
          <div className="tw-w-full">
            <div className="tw-flex tw-items-center tw-justify-start tw-gap-2">
              <h2 className="tw-text-lg tw-font-bold tw-text-primary-500">
                {`${props.data.id}${
                  props.data.identifier ? "-" + props.data.identifier : ""
                }`}
              </h2>
            </div>
            <p className="tw-text-sm tw-font-medium">
              Print Version: {props.data.print_version}
            </p>
          </div>

          {props.data.isEditable && (
            <Button
              type="primary"
              icon={<PencilIcon width={18} />}
              className="tw-w-[80px] tw-bg-primary-500 tw-border-none tw-font-medium tw-text-white"
              onClick={() => props.onEdit(props.data)}
            >
              Edit
            </Button>
          )}
        </div>
        <div className="tw-w-full tw-flex tw-justify-between tw-gap-2 tw-items-start tw-border tw-rounded-lg tw-p-4">
          <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Gambar</p>
              <img
                onClick={() => window.open(props.data?.attributes.object_image)}
                src={props.data?.attributes.object_image}
                alt="Logo"
                className="tw-w-20 tw-h-20 tw-object-contain tw-cursor-pointer"
              />
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Nama Objek</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.object_name)
                  ? "-"
                  : props.data?.attributes.object_name}
              </p>
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Identification</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.final_identification)
                  ? "-"
                  : props.data?.attributes.final_identification}
              </p>
            </div>

            <div>
              <p className="tw-text-gray-500 tw-text-sm">Nama Pelanggan</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data.member.nama)
                  ? "-"
                  : props.data.member.nama}
              </p>
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">No. Pelanggan</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data.member.mobile_phone)
                  ? "-"
                  : props.data.member.mobile_phone}
              </p>
            </div>
          </div>

          <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Color</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.color)
                  ? "-"
                  : props.data?.attributes.color}
              </p>
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Weight</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.weight)
                  ? "-"
                  : props.data?.attributes.weight + " carat"}
              </p>
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Measurement</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.measurement)
                  ? "-"
                  : props.data?.attributes.measurement + " (mm)"}
              </p>
            </div>

            <div>
              <p className="tw-text-gray-500 tw-text-sm">Shape</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.shape)
                  ? "-"
                  : props.data?.attributes.shape}
              </p>
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Cut</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.cut)
                  ? "-"
                  : props.data?.attributes.cut}
              </p>
            </div>
            <div>
              <p className="tw-text-gray-500 tw-text-sm">Comments</p>
              <p className="tw-font-medium">
                {isNullOrEmpty(props.data?.attributes.comments)
                  ? "-"
                  : props.data?.attributes.comments}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CertificateDetail;

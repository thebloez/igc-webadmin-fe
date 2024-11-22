import QuestionIcon from "@components/icon/QuestionIcon";
import { Button, Modal } from "antd";

export interface IDeleteModal {
  onLeftClick: () => void;
  onRightClick: (id: string) => void;
  data: any;
  open: boolean;
  isLoading?: boolean;
  wording: {
    description: string;
    warning: {
      title: string;
      description: string;
    };
    button: {
      no: string;
      yes: string;
    };
  };
}

const DeleteModal = (props: IDeleteModal) => {
  const { wording } = props;

  return (
    <Modal
      open={props.open}
      footer={null}
      width={360}
      destroyOnClose
      closable={false}
      maskClosable={false}
      centered
    >
      <div className="tw-flex tw-w-full tw-flex-col tw-p-[20px] tw-items-center tw-gap-4 tw-relative">
        <div className="tw-m-4">
          <QuestionIcon />
        </div>
        <div className="tw-px-4">
          <p className="tw-text-center tw-font-semibold">
            {wording.description}
          </p>
        </div>

        <p className="tw-p-2 tw-rounded-lg tw-font-semibold tw-bg-slate-100 tw-w-full tw-text-center">
          {props.data.id}
        </p>
        <div className="tw-flex tw-items-center tw-bg-[#FFE9D9] tw-h-[90px] tw-justify-between tw-rounded-sm">
          <div className="tw-h-full tw-rounded-full tw-w-1 tw-bg-red-400" />
          <div className="tw-p-2 tw-w-full">
            <div className="tw-w-full tw-flex tw-justify-start tw-gap-2 tw-items-center tw-mb-2">
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.378 14.5816L10.0213 0.806122C9.89674 0.601403 9.6818 0.5 9.46484 0.5C9.24789 0.5 9.03094 0.601403 8.9084 0.806122L0.551732 14.5816C0.304648 14.9911 0.614005 15.5 1.10817 15.5H17.8215C18.3157 15.5 18.625 14.9911 18.378 14.5816ZM8.82202 6.16327C8.82202 6.07908 8.89434 6.0102 8.98273 6.0102H9.94696C10.0353 6.0102 10.1077 6.07908 10.1077 6.16327V9.68367C10.1077 9.76786 10.0353 9.83673 9.94696 9.83673H8.98273C8.89434 9.83673 8.82202 9.76786 8.82202 9.68367V6.16327ZM9.46484 12.898C9.21252 12.8931 8.97227 12.7941 8.79565 12.6224C8.61902 12.4508 8.52009 12.22 8.52009 11.9796C8.52009 11.7392 8.61902 11.5084 8.79565 11.3367C8.97227 11.165 9.21252 11.0661 9.46484 11.0612C9.71716 11.0661 9.95742 11.165 10.134 11.3367C10.3107 11.5084 10.4096 11.7392 10.4096 11.9796C10.4096 12.22 10.3107 12.4508 10.134 12.6224C9.95742 12.7941 9.71716 12.8931 9.46484 12.898Z"
                  fill="#771505"
                />
              </svg>
              <p className="tw-text-red-900 tw-font-semibold">
                {wording.warning.title}
              </p>
            </div>
            <p className="tw-text-red-800">{wording.warning.description}</p>
          </div>
        </div>
        <div className="tw-flex tw-w-full tw-justify-center tw-gap-4">
          <Button
            disabled={props.isLoading}
            onClick={props.onLeftClick}
            className="!tw-rounded-md tw-w-[146px] tw-h-[45px] tw-border-primary-500 tw-font-semibold tw-text-primary-500"
            type="default"
          >
            {wording.button.no}
          </Button>
          <Button
            loading={props.isLoading}
            onClick={() => props.onRightClick(props.data.id)}
            className="!tw-rounded-md tw-w-[146px] tw-h-[45px] tw-shadow tw-font-semibold"
            danger
            type="primary"
          >
            {wording.button.yes}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

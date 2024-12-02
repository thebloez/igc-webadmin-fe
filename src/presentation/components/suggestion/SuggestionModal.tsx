import FormInput from "@components/form/input/FormInput";
import {
  ISuggestionFormData,
  ISuggestionModalState,
} from "@domain/entities/SuggestionEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import suggestionForm from "@lib/utils/suggestionForm";
import { Button, Form, Modal } from "antd";
import { useForm } from "react-hook-form";

interface ISuggestionModal {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ISuggestionFormData) => void;
  type: ISuggestionModalState["type"];
}

const SuggestionModal = ({
  onClose,
  onSubmit,
  type,
  visible,
}: ISuggestionModal) => {
  const { language } = useLanguage();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ISuggestionFormData>({
    mode: "onChange",
    shouldUnregister: true,
  });

  return (
    <Modal
      open={visible}
      footer={null}
      centered
      onCancel={onClose}
      destroyOnClose
      styles={{
        header: {
          margin: 0,
        },
      }}
      title={
        <div className="tw-p-4 tw-border-b tw-flex tw-items-start tw-flex-col tw-justify-between">
          <h2 className="tw-text-lg tw-font-bold">
            {suggestionForm[type][language].title}
          </h2>
        </div>
      }
      className="tw-font-sans"
    >
      <div className="tw-flex tw-w-[300px] tw-flex-col tw-px-[20px] tw-py-[10px] tw-items-center tw-gap-4 tw-relative">
        <Form
          layout="vertical"
          className="tw-w-full"
          onFinish={handleSubmit(onSubmit)}
        >
          {suggestionForm[type][language].fields.map((item, index) => {
            return (
              <FormInput
                key={index}
                type={item.type}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                control={control}
                rules={item.rules}
                error={(errors as any)[item.name]}
              />
            );
          })}

          <div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-mt-10 tw-gap-2">
            {/* cancel button */}
            <Button
              type="default"
              danger
              onClick={onClose}
              className="!tw-h-[40px] tw-w-full tw-rounded-md tw-shadow tw-font-semibold"
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              className="!tw-h-[40px] tw-w-full tw-rounded-md tw-shadow tw-font-semibold"
            >
              Add
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default SuggestionModal;

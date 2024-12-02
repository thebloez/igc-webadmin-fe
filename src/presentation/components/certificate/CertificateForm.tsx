import { ICertificateFormProps } from "@domain/entities/CertificateEntity";
import FormInput from "@components/form/input/FormInput";
import FormSelect from "@components/form/input/FormSelect";
import FormUpload from "@components/form/input/FormUpload";
import { useLanguage } from "@lib/hooks/useLanguage";
import FormTextArea from "@components/form/input/FormTextArea";

const CertificateForm: React.FC<ICertificateFormProps> = ({
  errors,
  control,
  suggestions,
  customers,
  onAddNew,
}) => {
  const { t } = useLanguage();
  return (
    <div className="tw-h-full tw-overflow-auto tw-px-4 tw-pb-2 tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-items-start tw-gap-0 sm:tw-gap-4">
      {/* create image */}
      <div className="tw-w-full">
        <FormUpload
          name="attributes.object_image"
          label={t("certificate.form.object_image.label")}
          placeholder={t("certificate.form.object_image.placeholder")}
          control={control}
          rules={{ required: t("certificate.form.object_image.required") }}
          error={errors.attributes?.object_image}
        />
        <FormSelect
          name="member_phone_number"
          label={t("certificate.form.customer.label")}
          placeholder={t("certificate.form.customer.placeholder")}
          options={customers.data}
          control={control}
          loading={customers.isLoading}
          rules={{ required: t("certificate.form.customer.required") }}
          error={errors.member_phone_number}
          onAddNew={() => onAddNew("customer")}
        />

        <FormInput
          name="attributes.object_name"
          label={t("certificate.form.object_name.label")}
          placeholder={t("certificate.form.object_name.placeholder")}
          control={control}
          rules={{ required: t("certificate.form.object_name.required") }}
          error={errors.attributes?.object_name}
        />

        <FormSelect
          name="attributes.final_identification"
          label={t("certificate.form.final_identification.label")}
          placeholder={t("certificate.form.final_identification.placeholder")}
          options={suggestions.data.final_identification}
          loading={suggestions.isLoading}
          control={control}
          rules={{
            required: t("certificate.form.final_identification.required"),
          }}
          error={errors.attributes?.final_identification}
          onAddNew={() => onAddNew("final_identification")}
        />
        <FormInput
          name="attributes.measurement"
          label={t("certificate.form.measurement.label")}
          placeholder={t("certificate.form.measurement.placeholder")}
          control={control}
          rules={{
            required: t("certificate.form.measurement.required"),
          }}
          error={errors.attributes?.measurement}
        />

        <FormSelect
          name="attributes.clarity"
          label={t("certificate.form.clarity.label")}
          placeholder={t("certificate.form.clarity.placeholder")}
          options={suggestions.data.clarity}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("certificate.form.clarity.required") }}
          error={errors.attributes?.clarity}
          onAddNew={() => onAddNew("clarity")}
        />
        <FormSelect
          name="attributes.transparency"
          label={t("certificate.form.transparency.label")}
          placeholder={t("certificate.form.transparency.placeholder")}
          options={suggestions.data.transparency}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("certificate.form.transparency.required") }}
          error={errors.attributes?.transparency}
          onAddNew={() => onAddNew("transparency")}
        />
        <FormSelect
          name="attributes.cut"
          label={t("certificate.form.cut.label")}
          placeholder={t("certificate.form.cut.placeholder")}
          options={suggestions.data.cut}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("memo.form.cut.required") }}
          error={errors.attributes?.cut}
          onAddNew={() => onAddNew("cut")}
        />
      </div>
      <div className="tw-w-full">
        <FormSelect
          name="attributes.shape"
          label={t("memo.form.shape.label")}
          placeholder={t("memo.form.shape.placeholder")}
          options={suggestions.data.shape}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("memo.form.shape.required") }}
          error={errors.attributes?.shape}
          onAddNew={() => onAddNew("shape")}
        />
        <FormSelect
          name="attributes.color"
          label={t("memo.form.color.label")}
          placeholder={t("memo.form.color.placeholder")}
          options={suggestions.data.color}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("memo.form.color.required") }}
          error={errors.attributes?.color}
          onAddNew={() => onAddNew("color")}
        />

        <FormInput
          name="attributes.weight"
          label={t("memo.form.weight.label")}
          placeholder={t("memo.form.weight.placeholder")}
          control={control}
          rules={{ required: t("memo.form.weight.required") }}
          error={errors.attributes?.weight}
        />

        <FormSelect
          name="attributes.origins"
          label={t("memo.form.origins.label")}
          placeholder={t("memo.form.origins.placeholder")}
          options={suggestions.data.origin}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("memo.form.origins.required") }}
          error={errors.attributes?.origins}
          onAddNew={() => onAddNew("origin")}
        />

        <FormSelect
          name="attributes.comments"
          label={t("memo.form.comments.label")}
          placeholder={t("memo.form.comments.placeholder")}
          options={suggestions.data.comment}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t("memo.form.comments.required") }}
          error={errors.attributes?.comments}
          onAddNew={() => onAddNew("comment")}
        />

        <FormTextArea
          name="additional_comment"
          label={t("certificate.form.additional_comment.label")}
          placeholder={t("certificate.form.additional_comment.placeholder")}
          control={control}
          rules={{
            required: t("certificate.form.additional_comment.required"),
          }}
          error={errors.additional_comment}
        />
      </div>
    </div>
  );
};

export default CertificateForm;

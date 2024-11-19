import { Control, FieldErrors } from "react-hook-form";
import FormUpload from "@components/form/input/FormUpload";
import FormSelect from "@components/form/input/FormSelect";
import { ICustomerOption } from "@domain/entities/CustomerEntity";
import { ISuggestionsState } from "@domain/entities/SuggestionEntity";
import { IMemoData } from "@domain/entities/MemoEntity";
import FormInput from "@components/form/input/FormInput";
import FormToggle from "@components/form/input/FormToggle";
import { useTranslation } from 'react-i18next';

export interface IMemoFormProps {
  control: Control<IMemoData, any>;
  errors: FieldErrors<IMemoData>;
  suggestions: ISuggestionsState;
  customers: ICustomerOption;
}

const MemoForm: React.FC<IMemoFormProps> = ({
  errors,
  control,
  suggestions,
  customers,
}) => {
  const { t } = useTranslation();

  return (
    <div className="tw-h-full tw-overflow-auto tw-px-4 tw-flex tw-justify-between tw-items-start tw-gap-4">
      {/* create image */}
      <div className="tw-w-full">
        <FormUpload
          name="attributes.object_image"
          label={t('memo.form.object_image.label')}
          placeholder={t('memo.form.object_image.placeholder')}
          control={control}
          rules={{ required: t('memo.form.object_image.required') }}
          error={errors.attributes?.object_image}
        />
        <FormSelect
          name="member_phone_number"
          label={t('memo.form.customer.label')}
          placeholder={t('memo.form.customer.placeholder')}
          options={customers.data}
          control={control}
          loading={customers.isLoading}
          rules={{ required: t('memo.form.customer.required') }}
          error={errors.member_phone_number}
        />

        <FormSelect
          name="attributes.object_name"
          label={t('memo.form.object_name.label')}
          placeholder={t('memo.form.object_name.placeholder')}
          options={suggestions.data.object_name}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.object_name.required') }}
          error={errors.attributes?.object_name}
        />

        <FormInput
          name="attributes.measurement"
          label={t('memo.form.measurement.label')}
          placeholder={t('memo.form.measurement.placeholder')}
          control={control}
          rules={{ required: t('memo.form.measurement.required') }}
          error={errors.attributes?.measurement}
        />

        <FormSelect
          name="attributes.clarity"
          label={t('memo.form.clarity.label')}
          placeholder={t('memo.form.clarity.placeholder')}
          options={suggestions.data.clarity}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.clarity.required') }}
          error={errors.attributes?.clarity}
        />
        <FormSelect
          name="attributes.transparency"
          label={t('memo.form.transparency.label')}
          placeholder={t('memo.form.transparency.placeholder')}
          options={suggestions.data.transparency}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.transparency.required') }}
          error={errors.attributes?.transparency}
        />
        <FormSelect
          name="attributes.cut"
          label={t('memo.form.cut.label')}
          placeholder={t('memo.form.cut.placeholder')}
          options={suggestions.data.cut}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.cut.required') }}
          error={errors.attributes?.cut}
        />
      </div>
      <div className="tw-w-full">
        <FormSelect
          name="attributes.shape"
          label={t('memo.form.shape.label')}
          placeholder={t('memo.form.shape.placeholder')}
          options={suggestions.data.shape}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.shape.required') }}
          error={errors.attributes?.shape}
        />
        <FormSelect
          name="attributes.color"
          label={t('memo.form.color.label')}
          placeholder={t('memo.form.color.placeholder')}
          options={suggestions.data.color}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.color.required') }}
          error={errors.attributes?.color}
        />

        <FormInput
          name="attributes.weight"
          label={t('memo.form.weight.label')}
          placeholder={t('memo.form.weight.placeholder')}
          control={control}
          rules={{ required: t('memo.form.weight.required') }}
          error={errors.attributes?.weight}
        />

        <FormSelect
          name="attributes.origins"
          label={t('memo.form.origins.label')}
          placeholder={t('memo.form.origins.placeholder')}
          options={suggestions.data.origin}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.origins.required') }}
          error={errors.attributes?.origins}
        />

        <FormSelect
          name="attributes.comments"
          label={t('memo.form.comments.label')}
          placeholder={t('memo.form.comments.placeholder')}
          options={suggestions.data.comment}
          loading={suggestions.isLoading}
          control={control}
          rules={{ required: t('memo.form.comments.required') }}
          error={errors.attributes?.comments}
        />

        <FormInput
          name="additional_comment"
          label={t('memo.form.additional_comment.label')}
          placeholder={t('memo.form.additional_comment.placeholder')}
          control={control}
          rules={{ required: t('memo.form.additional_comment.required') }}
          error={errors.additional_comment}
        />

        <FormToggle
          name="status"
          label={t('memo.form.status.label')}
          control={control}
          error={errors.status}
        />
      </div>
    </div>
  );
};

export default MemoForm;

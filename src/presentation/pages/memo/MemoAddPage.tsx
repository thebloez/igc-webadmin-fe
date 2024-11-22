import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, Form, message } from "antd";
import { IMemoData } from "@domain/entities/MemoEntity";
import MemoUseCase from "@domain/useCases/MemoUseCase";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import MemoViewModel from "@viewModels/MemoViewModel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import MemoForm from "@components/memo/MemoForm";
import { ISuggestionsState } from "@domain/entities/SuggestionEntity";
import SuggestionViewModel from "@viewModels/SuggestionViewModel";
import SuggestionUseCase from "@domain/useCases/SuggestionUseCase";
import { ICustomerOption } from "@domain/entities/CustomerEntity";
import CustomerUseCase from "@domain/useCases/CustomerUseCase";
import CustomerViewModel from "@viewModels/CustomerViewModel";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import MemoService from "@services/MemoService";

const MemoAddPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IMemoData>({
    mode: "onChange",
  });

  const token = useSelector(selectToken);

  const [suggestions, setSuggestions] = useState<ISuggestionsState>({
    isLoading: true,
    data: {
      clarity: [],
      color: [],
      comment: [],
      cut: [],
      object_name: [],
      origin: [],
      shape: [],
      transparency: [],
    },
  });

  const [customers, setCustomers] = useState<ICustomerOption>({
    isLoading: true,
    data: [],
  });

  const memoService = new MemoService();
  const memoUseCase = new MemoUseCase(memoService, token);
  const memoViewModel = new MemoViewModel(memoUseCase, token);

  const suggestionsViewModel = new SuggestionViewModel(
    new SuggestionUseCase(),
    setSuggestions
  );

  useEffect(() => {
    getSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSuggestion = async () => {
    await suggestionsViewModel.getSuggestion(token);
  };

  useEffect(() => {
    getCustomerOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomerOption = async () => {
    const customerViewModel = new CustomerViewModel(new CustomerUseCase());
    await customerViewModel.getCustomerOption(token, setCustomers);
  };

  const onSubmit: SubmitHandler<IMemoData> = async (data) => {
    await memoViewModel.createMemo(data, message, reset);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className="tw-m-0 tw-p-6"
    >
      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          leftIcon={<ArrowLeftIcon onClick={goBack} />}
          title={t("memo.add.title")}
          description={t("memo.add.description")}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              className="!tw-h-[40px] tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("memo.add.button.submit")}
            </Button>
          </div>
        </HeaderContent>
        <div className="tw-p-4">
          <MemoForm
            control={control}
            errors={errors}
            suggestions={suggestions}
            customers={customers}
          />
        </div>
      </div>
    </Form>
  );
};

export default MemoAddPage;

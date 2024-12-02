import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, Form, message } from "antd";
import { IMemoData } from "@domain/entities/MemoEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import MemoForm from "@components/memo/MemoForm";
import { ISuggestionsState } from "@domain/entities/SuggestionEntity";
import SuggestionViewModel from "@viewModels/SuggestionViewModel";
import SuggestionUseCase from "@domain/useCases/SuggestionUseCase";
import { ICustomerOption } from "@domain/entities/CustomerEntity";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import useMemoViewModel from "@lib/hooks/useMemoViewModel";
import { setUserToken } from "@redux/user/userReduxReducer";
import { useParams } from "react-router-dom";
import useCustomerViewModel from "@lib/hooks/useCustomerViewModel";

const MemoUpgradeCertificatePage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  // get token from redux
  const clearToken = () => dispatch(setUserToken(""));

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
      final_identification: [],
      origin: [],
      shape: [],
      transparency: [],
    },
  });

  const [customers, setCustomers] = useState<ICustomerOption>({
    isLoading: true,
    data: [],
  });

  const memoViewModel = useMemoViewModel(token, clearToken);

  const suggestionsViewModel = new SuggestionViewModel(
    new SuggestionUseCase(),
    token
  );

  useEffect(() => {
    getSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSuggestion = async () => {
    await suggestionsViewModel.getSuggestion(setSuggestions);
  };

  useEffect(() => {
    getCustomerOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customerViewModel = useCustomerViewModel(token, clearToken);

  const getCustomerOption = async () => {
    await customerViewModel.getCustomerOption(setCustomers);
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
          title={t("memo.upgrade-to-certificate.title")}
          description={id}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              className="!tw-h-[40px] tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("memo.upgrade-to-certificate.button.submit")}
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

export default MemoUpgradeCertificatePage;

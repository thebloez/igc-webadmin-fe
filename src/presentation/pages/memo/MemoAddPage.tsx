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
import CustomerUseCase from "@domain/useCases/CustomerUseCase";
import CustomerViewModel from "@viewModels/CustomerViewModel";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import useMemoViewModel from "@lib/hooks/useMemoViewModel";
import { setUserToken } from "@redux/user/userReduxReducer";
import { useNavigate } from "react-router-dom";

const MemoAddPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  // get token from redux
  const clearToken = () => dispatch(setUserToken(""));

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IMemoData>({
    mode: "onChange",
  });

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
    await memoViewModel.createMemo(data, message, reset).then(() => {
      goBack();
    });
  };

  const goBack = () => {
    navigate("/memo");
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

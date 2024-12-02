import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, Form, message } from "antd";
import { IMemoData, IMemoUpgradeState } from "@domain/entities/MemoEntity";
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
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoading from "@components/loader/SpinnerLoading";

const MemoUpgradeOriginPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const { id: paramId } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector(selectToken);

  // get token from redux
  const clearToken = () => dispatch(setUserToken(""));

  const [state, setState] = useState<IMemoUpgradeState>({
    isLoading: true,
    id: paramId as string,
    error: {} as IMemoUpgradeState["error"],
  });

  const {
    handleSubmit,
    control,
    setValue,
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

  useEffect(() => {
    if (state.id) {
      findMemo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  const findMemo = async () => {
    await memoViewModel.findMemo(state, setState, setValue);
  };

  const onSubmit: SubmitHandler<IMemoData> = async (data) => {
    await memoViewModel.upgradeMemo(data, message, navigate, "m1").then(() => {
      goBack();
    });
  };

  const goBack = () => {
    navigate("/memo");
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="tw-m-0 tw-p-6"
      >
        <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
          <HeaderContent
            leftIcon={<ArrowLeftIcon onClick={goBack} />}
            title={t("memo.upgrade-to-memo-origin.title")}
            description={state.id ?? "-"}
          >
            {!state.isLoading && (
              <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={isSubmitting}
                  className="!tw-h-[40px] tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
                >
                  {t("memo.upgrade-to-memo-origin.button.submit")}
                </Button>
              </div>
            )}
          </HeaderContent>
          <div className="tw-p-4">
            {state.isLoading ? (
              <div className="tw-w-full tw-flex tw-justify-center tw-h-[200px] tw-items-center">
                <SpinnerLoading width={32} height={32} type="primary-spinner" />
              </div>
            ) : (
              <MemoForm
                type="upgrade"
                control={control}
                errors={errors}
                suggestions={suggestions}
                customers={customers}
              />
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default MemoUpgradeOriginPage;

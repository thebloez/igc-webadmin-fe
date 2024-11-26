import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, Form, message } from "antd";
import { ICertificateFormData } from "@domain/entities/CertificateEntity";
import CertificateUseCase from "@domain/useCases/CertificateUseCase";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import CertificateViewModel from "@viewModels/CertificateViewModel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import CertificateForm from "@components/certificate/CertificateForm";
import { ISuggestionsState } from "@domain/entities/SuggestionEntity";
import SuggestionViewModel from "@viewModels/SuggestionViewModel";
import SuggestionUseCase from "@domain/useCases/SuggestionUseCase";
import { ICustomerOption } from "@domain/entities/CustomerEntity";
import CustomerUseCase from "@domain/useCases/CustomerUseCase";
import CustomerViewModel from "@viewModels/CustomerViewModel";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import CertificateService from "@services/CertificateService";
import { setUserToken } from "@redux/user/userReduxReducer";

const CertificateAddPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICertificateFormData>({
    mode: "onChange",
  });

  const clearToken = () => dispatch(setUserToken(""));

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

  // create instance of certificate service, use case, and view model
  const certificateService = new CertificateService();
  const certificateUseCase = new CertificateUseCase(
    certificateService,
    clearToken
  );
  const certificateViewModel = new CertificateViewModel(
    certificateUseCase,
    token
  );

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

  const onSubmit: SubmitHandler<ICertificateFormData> = async (data) => {
    await certificateViewModel.createCertificate(data, message, reset);
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
          title={t("certificate.add.title")}
          description={t("certificate.add.description")}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              className="!tw-h-[40px] tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              Simpan
            </Button>
          </div>
        </HeaderContent>
        <div className="tw-p-4">
          <CertificateForm
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

export default CertificateAddPage;

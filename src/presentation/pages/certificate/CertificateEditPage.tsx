import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, Form, message } from "antd";
import { IMemoFormData, IMemoUpgradeState } from "@domain/entities/MemoEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ISuggestionModalDeleteState,
  ISuggestionModalState,
  ISuggestionsState,
} from "@domain/entities/SuggestionEntity";
import SuggestionViewModel from "@viewModels/SuggestionViewModel";
import SuggestionUseCase from "@domain/useCases/SuggestionUseCase";
import { ICustomerOption } from "@domain/entities/CustomerEntity";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import { setUserToken } from "@redux/user/userReduxReducer";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoading from "@components/loader/SpinnerLoading";
import useCustomerViewModel from "@lib/hooks/useCustomerViewModel";
import SuggestionModal from "@components/suggestion/SuggestionModal";
import CertificateForm from "@components/certificate/CertificateForm";
import { IOption } from "@domain/entities/SharedEntity";
import QuestionModal from "@components/modal/QuestionModal";
import NotFoundMessage from "@components/not-found/NotFoundMessage";
import useCertificateViewModel from "@lib/hooks/useCertificateViewModel";

const CertificateEditPage = () => {
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
  } = useForm<IMemoFormData>({
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

  const [modal, setModal] = useState<ISuggestionModalState>({
    visible: false,
    type: "final_identification",
  });

  const [modalDelete, setModalDelete] = useState<ISuggestionModalDeleteState>({
    visible: false,
    type: "final_identification",
    data: {
      title: "",
    },
    isLoading: false,
  });

  const certificateViewModel = useCertificateViewModel(token, clearToken);

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

  useEffect(() => {
    if (state.id) {
      findCertificate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  const findCertificate = async () => {
    await certificateViewModel.detailCertificate(state, setState, setValue);
  };

  const onSubmit: SubmitHandler<IMemoFormData> = async (data) => {
    await certificateViewModel.editCertificate(data, message, navigate);
  };

  const goBack = () => {
    navigate("/certificate");
  };

  const onAddNew = (name: ISuggestionModalState["type"]) => {
    setModal((prevState) => ({ ...prevState, visible: true, type: name }));
  };

  const onClose = () => {
    setModal((prevState) => ({ ...prevState, visible: false }));
  };

  const onSubmitSuggestion = async (data: any) => {
    if (modal.type === "customer") {
      await customerViewModel.createCustomer(data, message).then(() => {
        getCustomerOption();
        onClose();
      });
    } else {
      await suggestionsViewModel
        .createSuggestion(data, modal.type, message)
        .then(() => {
          getSuggestion();
          onClose();
        });
    }
  };

  const onSubmitDeleteSuggestion = async () => {
    let typeSplit =
      modalDelete.type?.split(".")[modalDelete.type.split(".").length - 1];

    if (typeSplit === "origins") {
      typeSplit = "origin";
    } else if (typeSplit === "comments") {
      typeSplit = "comment";
    }

    await suggestionsViewModel
      .deleteSuggestion(
        modalDelete.data.title as string,
        typeSplit,
        message,
        setModalDelete
      )
      .then(() => {
        getSuggestion();
        onCloseModalDelete();
      });
  };

  const onDelete = (option: IOption, type: string) => {
    setModalDelete((prevState) => ({
      ...prevState,
      visible: true,
      type: type as any,
      data: {
        title: option.label,
      },
    }));
  };

  const onCloseModalDelete = () => {
    setModalDelete((prevState) => ({ ...prevState, visible: false }));
  };

  return (
    <>
      <QuestionModal
        open={modalDelete.visible}
        isLoading={modalDelete.isLoading}
        onLeftClick={onCloseModalDelete}
        onRightClick={onSubmitDeleteSuggestion}
        title={modalDelete.data.title}
        showWarning={true}
        wording={{
          description: t(`suggestion.modal.delete.description`),
          warning: {
            title: t(`suggestion.modal.delete.warning.title`),
            description: t(`suggestion.modal.delete.warning.description`),
          },
          button: {
            no: t(`suggestion.modal.delete.button.no`),
            yes: t(`suggestion.modal.delete.button.yes`),
          },
        }}
        data={modalDelete.data}
      />
      <SuggestionModal
        onClose={onClose}
        visible={modal.visible}
        onSubmit={onSubmitSuggestion}
        type={modal.type}
      />
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="tw-m-0 tw-p-6"
      >
        <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
          <HeaderContent
            leftIcon={<ArrowLeftIcon onClick={goBack} />}
            title={t("certificate.edit.title")}
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
                  {t("certificate.edit.button.submit")}
                </Button>
              </div>
            )}
          </HeaderContent>
          <div className="tw-p-4">
            {state.isLoading ? (
              <div className="tw-w-full tw-flex tw-justify-center tw-h-[200px] tw-items-center">
                <SpinnerLoading width={32} height={32} type="primary-spinner" />
              </div>
            ) : !state.error.status ? (
              <CertificateForm
                onDelete={onDelete}
                onAddNew={onAddNew as any}
                control={control}
                errors={errors}
                suggestions={suggestions}
                customers={customers}
              />
            ) : (
              <NotFoundMessage
                title="Certificate Not Found"
                message="Certificate not found or has been deleted"
              />
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default CertificateEditPage;

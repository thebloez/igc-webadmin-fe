import HeaderContent from "@components/dashboard/layout/HeaderContent";
import { Button, Form, message } from "antd";
import { IMemoFormData } from "@domain/entities/MemoEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { selectToken } from "@redux/user/userReduxSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import MemoForm from "@components/memo/MemoForm";
import {
  ISuggestionModalDeleteState,
  ISuggestionModalState,
  ISuggestionsState,
} from "@domain/entities/SuggestionEntity";
import SuggestionViewModel from "@viewModels/SuggestionViewModel";
import SuggestionUseCase from "@domain/useCases/SuggestionUseCase";
import { ICustomerOption } from "@domain/entities/CustomerEntity";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import useMemoViewModel from "@lib/hooks/useMemoViewModel";
import { setUserToken } from "@redux/user/userReduxReducer";
import { useNavigate } from "react-router-dom";
import useCustomerViewModel from "@lib/hooks/useCustomerViewModel";
import SuggestionModal from "@components/suggestion/SuggestionModal";
import QuestionModal from "@components/modal/QuestionModal";
import { IOption } from "@domain/entities/SharedEntity";

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
  } = useForm<IMemoFormData>({
    mode: "onChange",
  });

  const [modal, setModal] = useState<ISuggestionModalState>({
    visible: false,
    type: "final_identification",
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

  const [modalDelete, setModalDelete] = useState<ISuggestionModalDeleteState>({
    visible: false,
    type: "final_identification",
    data: {
      title: "",
    },
    isLoading: false,
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

  const onSubmit: SubmitHandler<IMemoFormData> = async (data) => {
    await memoViewModel.createMemo(data, message, reset).then(() => {
      goBack();
    });
  };

  const goBack = () => {
    navigate("/memo");
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
    const type =
      modalDelete.type?.split(".")[modalDelete.type.split(".").length - 1];
    await suggestionsViewModel
      .deleteSuggestion(
        modalDelete.data.title as string,
        type,
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
            title={t("memo.add.title")}
            description={t("memo.add.description")}
          >
            <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                className="!tw-h-[40px] tw-w-full sm:tw-w-auto tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
              >
                {t("memo.add.button.submit")}
              </Button>
            </div>
          </HeaderContent>
          <div className="tw-p-4">
            <MemoForm
              onAddNew={onAddNew as any}
              control={control}
              errors={errors}
              suggestions={suggestions}
              customers={customers}
              onDelete={onDelete}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default MemoAddPage;

import HeaderContent from "@components/dashboard/layout/HeaderContent";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import MemoColumn from "@components/memo/MemoColumn";
import { MemoModals } from "@components/memo/MemoModals";
import MemoTable from "@components/memo/MemoTable";
import {
  IMemoData,
  IMemoModalState,
  IMemoTableState,
} from "@domain/entities/MemoEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import useMemoViewModel from "@lib/hooks/useMemoViewModel";
import { setUserToken } from "@redux/user/userReduxReducer";
import { selectToken } from "@redux/user/userReduxSelector";
import { Button, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const MemoPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  // get dispatch function from react-redux
  const dispatch = useDispatch();

  // get navigate function from react-router-dom
  const navigate = useNavigate();

  // get token from redux
  const token = useSelector(selectToken);
  const clearToken = () => dispatch(setUserToken(""));

  // set state for table
  const [table, setTable] = useState<IMemoTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    search: "",
    total: 0,
    data: [],
  });

  const [modal, setModal] = useState<IMemoModalState>({
    visible: false,
    type: "delete",
    isLoading: false,
    showWarning: false,
    data: {} as IMemoData,
  });

  // Memoize service instances
  // create instance of memo service, memo use case, and memo view model
  // page -> ViewModel -> UseCase -> Service
  const memoViewModel = useMemoViewModel(token, clearToken);

  useEffect(() => {
    if (table.currentPage === 0) {
      setTable((prevState) => ({
        ...prevState,
        currentPage: 1,
      }));
    } else {
      getMemo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.currentPage, table.pageSize]);

  // go to add page
  const gotoAddPage = () => {
    navigate("/memo/add");
  };

  const getMemo = async () => {
    await memoViewModel.getMemo(table, setTable);
  };

  const onEdit = (record: any) => {
    navigate(`/memo/edit/${record.id}`);
  };

  const onDelete = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      type: "delete",
      showWarning: true,
      data: record,
    }));
  };

  const closeModal = () => {
    setModal((prevState) => ({ ...prevState, visible: false }));
  };

  const onChange = useCallback((props: any) => {
    setTable((prevState) => ({
      ...prevState,
      currentPage: props.current,
      pageSize: props.pageSize,
    }));
  }, []);

  const onPostDelete = async (id: string) => {
    await memoViewModel.deleteMemo(id, message, setModal).then(() => {
      getMemo();
      closeModal();
    });
  };

  const postPrint = async (id: string) => {
    await memoViewModel
      .printMemo(id, modal.data.identifier, message, setModal)
      .then(() => {
        getMemo();
        closeModal();
      });
  };

  const onAfterQuestion = () => {
    if (modal.type === "delete") {
      onPostDelete(modal.data.id);
    } else if (modal.type === "after-print") {
      postPrint(modal.data.id);
    }
  };

  const onPrint = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      type: "print",
      data: record,
    }));
  };

  const onSearch = useDebouncedCallback(
    // function
    (value) => {
      setTable((prevState) => ({
        ...prevState,
        search: value,
        currentPage: 0,
      }));
    },
    // delay in ms
    500
  );

  const onQuestionPrint = (identifier: string) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      type: "after-print",
      showWarning: false,
      data: {
        ...prevState.data,
        identifier,
      },
    }));
  };

  const onDetail = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      type: "detail",
      data: record,
    }));
  };

  return (
    <div className="tw-m-0 tw-p-6 ">
      <MemoModals
        onClose={closeModal}
        data={modal.data}
        isLoading={modal.isLoading}
        onRightClick={onAfterQuestion}
        open={modal.visible}
        showWarning={modal.showWarning}
        onAfterPrint={onQuestionPrint}
        type={modal.type}
        showPrint
        title={modal.type === "print" ? "Print Memo" : ""}
        onEdit={onEdit}
      />

      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          title={t("memo.list.title")}
          description={t("memo.list.description")}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              onClick={gotoAddPage}
              type="primary"
              icon={<PlusSquareIcon />}
              className="!tw-h-[45px] tw-w-full sm:tw-w-auto tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("memo.list.button.add")}
            </Button>
          </div>
        </HeaderContent>
        <MemoTable
          showSearch
          onSearch={onSearch}
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          onChange={onChange}
          columns={MemoColumn({
            onDelete,
            onPrint,
            onEdit,
            onDetail,
          })}
        />
      </div>
    </div>
  );
};

export default MemoPage;

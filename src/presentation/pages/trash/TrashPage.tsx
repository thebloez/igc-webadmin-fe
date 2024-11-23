import HeaderContent from "@components/dashboard/layout/HeaderContent";
import QuestionModal from "@components/modal/QuestionModal";
import TrashColumn from "@components/trash/TrashColumn";
import TrashTable from "@components/trash/TrashTable";
import {
  ITrashModalState,
  ITrashTableState,
} from "@domain/entities/TrashEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import useTrashViewModel from "@lib/hooks/useTrashViewModel";
import { setUserToken } from "@redux/user/userReduxReducer";
import { selectToken } from "@redux/user/userReduxSelector";
import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const TrashPage = () => {
  const { t } = useLanguage();
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const clearToken = () => dispatch(setUserToken(""));

  const [table, setTable] = useState<ITrashTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    search: "",
    total: 0,
    data: [],
  });

  const [modal, setModal] = useState<ITrashModalState>({
    visible: false,
    isLoading: false,
    type: "destroy",
    id: "",
  });

  const trashViewModel = useTrashViewModel({ clearToken, token });

  useEffect(() => {
    if (table.currentPage === 0) {
      setTable((prevState) => ({
        ...prevState,
        currentPage: 1,
      }));
    } else {
      getTrash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.currentPage, table.pageSize]);

  const getTrash = async () => {
    await trashViewModel.getTrash(table, setTable);
  };

  const onDestroy = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      id: record.id,
      type: "destroy",
    }));
  };

  const onRestore = (record: any) => {
    setModal((prevState) => ({
      ...prevState,
      visible: true,
      id: record.id,
      type: "restore",
    }));
  };

  const onAction = async (id: string) => {
    if (modal.type === "destroy") {
      await trashViewModel.destroyTrash(id, setModal, setTable, message);
    } else {
      await trashViewModel.restoreTrash(id, setModal, setTable, message);
    }
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

  const onSearch = useDebouncedCallback((value) => {
    setTable((prevState) => ({
      ...prevState,
      search: value,
      currentPage: 0,
    }));
  }, 500);

  return (
    <div className="tw-m-0 tw-p-6 ">
      <QuestionModal
        open={modal.visible}
        isLoading={modal.isLoading}
        onLeftClick={closeModal}
        onRightClick={onAction}
        wording={{
          description: t(`trash.list.modal.${modal.type}.description`),
          warning: {
            title: t(`trash.list.modal.${modal.type}.warning.title`),
            description: t(
              `trash.list.modal.${modal.type}.warning.description`
            ),
          },
          button: {
            no: t(`trash.list.modal.${modal.type}.button.no`),
            yes: t(`trash.list.modal.${modal.type}.button.yes`),
          },
        }}
        data={modal}
      />
      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          title={t("trash.list.title")}
          description={t("trash.list.description")}
        />

        <TrashTable
          showSearch
          onSearch={onSearch}
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          onChange={onChange}
          columns={TrashColumn({
            onDestroy,
            onRestore,
          })}
        />
      </div>
    </div>
  );
};

export default TrashPage;

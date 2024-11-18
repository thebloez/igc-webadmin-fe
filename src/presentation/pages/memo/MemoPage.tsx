import HeaderContent from "@components/dashboard/layout/HeaderContent";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import MemoColumn from "@components/memo/MemoColumn";
import MemoForm from "@components/memo/MemoForm";
import MemoTable from "@components/memo/MemoTable";
import { IMemoData, IMemoTableState } from "@domain/entities/MemoEntity";
import MemoUseCase from "@domain/useCases/MemoUseCase";
import { useLanguage } from "@lib/hooks/useLanguage";
import logger from "@lib/utils/logger";
import { selectToken } from "@redux/user/userReduxSelector";
import MemoViewModel from "@viewModels/MemoViewModel";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const MemoPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IMemoData>({});

  // get token from redux
  const token = useSelector(selectToken);

  // set state for table
  const [table, setTable] = useState<IMemoTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    total: 0,
    data: [],
  });

  const memoViewModel = new MemoViewModel(
    new MemoUseCase(),
    setTable,
    setIsModalOpen,
    reset
  );

  useEffect(() => {
    getMemo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMemo = async () => {
    await memoViewModel.getMemo(token);
  };
  return (
    <div className="tw-m-0 tw-p-6 ">
      <Modal
        title="Tambah Memo"
        open={isModalOpen}
        centered
        footer={null}
        className="modal-with-underline"
        destroyOnClose
        onCancel={memoViewModel.handleModalClose}
      >
        <MemoForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={memoViewModel.handleFormSubmit}
          onReset={reset}
          setValue={setValue}
          errors={errors}
        />
      </Modal>
      <div className="min-h-screen-with-header tw-bg-white tw-rounded tw-shadow">
        <HeaderContent
          title={t("memo.title")}
          description={t("memo.description")}
        >
          <div className="tw-w-full tw-flex tw-justify-end tw-items-center">
            <Button
              onClick={memoViewModel.handleModalOpen}
              type="primary"
              icon={<PlusSquareIcon />}
              className="!tw-h-[45px] tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              Add new data
            </Button>
          </div>
        </HeaderContent>
        <MemoTable
          isLoading={table.isLoading}
          data={table.data}
          currentPage={table.currentPage}
          pageSize={table.pageSize}
          total={table.total}
          columns={MemoColumn({
            onDetail(row) {
              logger(row);
            },
            onEdit(row) {
              logger(row);
            },
          })}
        />
      </div>
    </div>
  );
};

export default MemoPage;

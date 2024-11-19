import HeaderContent from "@components/dashboard/layout/HeaderContent";
import PlusSquareIcon from "@components/icon/PlusSquareIcon";
import MemoColumn from "@components/memo/MemoColumn";
import MemoTable from "@components/memo/MemoTable";
import { IMemoTableState } from "@domain/entities/MemoEntity";
import MemoUseCase from "@domain/useCases/MemoUseCase";
import { useLanguage } from "@lib/hooks/useLanguage";
import logger from "@lib/utils/logger";
import { selectToken } from "@redux/user/userReduxSelector";
import MemoService from "@services/MemoService";
import MemoViewModel from "@viewModels/MemoViewModel";
import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MemoPage = () => {
  // get language and t function to change language
  const { t } = useLanguage();

  // get token from redux
  const token = useSelector(selectToken);

  // get navigate function from react-router-dom
  const navigate = useNavigate();

  // set state for table
  const [table, setTable] = useState<IMemoTableState>({
    currentPage: 1,
    isLoading: true,
    pageSize: 10,
    total: 0,
    data: [],
  });

  // Memoize service instances
  // create instance of memo service, memo use case, and memo view model
  // page -> ViewModel -> UseCase -> Service
  const memoViewModel = useMemo(() => {
    const memoService = new MemoService();
    const memoUseCase = new MemoUseCase(memoService);
    return new MemoViewModel(memoUseCase, token);
  }, [token]);

  // get memo data
  useEffect(() => {
    getMemo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // go to add page
  const gotoAddPage = () => {
    navigate("/memo/add");
  };

  const getMemo = async () => {
    await memoViewModel.getMemo(setTable);
  };
  return (
    <div className="tw-m-0 tw-p-6 ">
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
              className="!tw-h-[45px] tw-w-full md:tw-w-auto tw-rounded-md tw-shadow tw-font-semibold tw-text-white"
            >
              {t("memo.list.button.add")}
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

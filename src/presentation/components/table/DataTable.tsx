import SpinnerLoading from "@components/loader/SpinnerLoading";
import EmptyTable from "@components/table/EmptyTable";
import { IDataTable } from "@domain/entities/DashboardEntity";
import { Table } from "antd";

const DataTable: React.FC<IDataTable<any>> = (props) => (
  <Table
    sticky
    caption
    rowKey={props.rowKey || "id"}
    rowClassName="!tw-p-0"
    columns={props.columns}
    dataSource={props.data}
    loading={{
      percent: 50,
      spinning: props.isLoading,
      fullscreen: false,
      indicator: (
        <div className="tw-flex tw-h-full tw-flex-col tw-justify-center tw-items-center tw-w-full">
          <SpinnerLoading width={32} height={32} type={"primary-spinner"} />
        </div>
      ),
    }}
    locale={{
      emptyText() {
        if (!props.isLoading) {
          return <EmptyTable />;
        }
      },
    }}
    pagination={{
      style: {
        paddingRight: "16px",
        paddingLeft: "16px",
      },
      pageSize: props.pageSize,
      current: props.currentPage <= 0 ? 1 : props.currentPage,
      total: props.total,
      showSizeChanger: true,
      showTotal: () => `Total ${props.total} items`,
      onChange: (page, pageSize) => {
        if (props.onChange) {
          props.onChange({ current: page, pageSize });
        }
      },
    }}
  />
);

export default DataTable;

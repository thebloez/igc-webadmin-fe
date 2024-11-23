import SearchIcon from "@components/icon/SearchIcon";
import SpinnerLoading from "@components/loader/SpinnerLoading";
import EmptyTable from "@components/table/EmptyTable";
import { IDataTable } from "@domain/entities/DashboardEntity";
import { Table, Input } from "antd"; // Add Input import
import { useState } from "react";

const DataTable: React.FC<IDataTable<any>> = (props) => {
  const [searchText, setSearchText] = useState("");

  const onSearch = (value: string) => {
    setSearchText(value);
    if (props.onSearch) {
      props.onSearch(value);
    }
  };

  return (
    <div className="tw-space-y-4">
      {props.showSearch && (
        <div className="tw-w-full tw-p-2 tw-border-b">
          <Input
            onChange={(e) => onSearch(e.target.value)}
            value={searchText}
            placeholder="Search here..."
            allowClear
            prefix={<SearchIcon height={24} width={24} />}
            className="tw-rounded-md tw-py-2 tw-px-4  tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
        </div>
      )}
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
    </div>
  );
};

export default DataTable;

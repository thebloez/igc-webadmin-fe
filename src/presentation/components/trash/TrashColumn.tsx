import { ITrashData } from "@domain/entities/TrashEntity";
import { IColumn } from "@domain/entities/DashboardEntity";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

const TrashColumn = (
  props: Pick<IColumn<ITrashData>, "onRestore" | "onDestroy">
): ColumnsType<ITrashData> => [
  {
    title: "No",
    dataIndex: "index",
    key: "index",
    width: 100,
    render: (_, _1, index) => index + 1, // Sequential number
  },
  {
    title: "Kode",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nama",
    dataIndex: "attributes.object_name",
    key: "attributes.object_name",
    render: (_, record) => record.attributes.object_name,
  },
  {
    title: "Pelanggan",
    dataIndex: "member_phone_number",
    key: "member_phone_number",
  },
  {
    title: "Pembuat",
    dataIndex: "created_by",
    key: "created_by",
  },

  {
    title: "Action",
    key: "action",
    align: "center",
    width: 250,
    render: (_, record) => {
      return (
        <div className="tw-flex tw-flex-wrap tw-gap-4 tw-w-full tw-justify-center">
          <Button
            onClick={() => props.onRestore && props.onRestore(record)}
            type="primary"
            className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold "
          >
            Restore
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => props.onDestroy && props.onDestroy(record)}
            className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold "
          >
            Destroy
          </Button>
        </div>
      );
    },
  },
];

export default TrashColumn;

import { IColumn } from "@domain/entities/DashboardEntity";
import { IMemoData } from "@domain/entities/MemoEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import isNullOrEmpty from "@lib/utils/isNullOrEmpty";
import { Button, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Indonesian locale if needed

const items = (origin: string, id: string) => {
  let items = [
    {
      key: "1",
      label: <Link to={"/memo/upgrade/certificate/" + id}>Sertifikat</Link>,
    },
  ];

  if (isNullOrEmpty(origin)) {
    items = [
      ...items,
      {
        key: "2",
        label: <Link to={"/memo/upgrade/memo-origin/" + id}>Memo Origin</Link>,
      },
    ];
  }

  return items;
};

const MemoColumn = (props: IColumn<IMemoData>): ColumnsType<IMemoData> => {
  const { t } = useLanguage();

  return [
    {
      title: "Kode",
      dataIndex: "id",
      key: "id",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Nama",
      dataIndex: "attributes.object_name",
      key: "attributes.object_name",
      responsive: ["xs", "sm", "md", "lg"],
      render: (_, record) => record.attributes.object_name,
    },
    {
      title: "Pelanggan",
      dataIndex: "member_phone_number",
      key: "member_phone_number",
      responsive: ["lg"], // Show only on medium and larger screens
    },
    {
      title: "Pembuat",
      dataIndex: "created_by",
      key: "created_by",
      responsive: ["lg"], // Show only on medium and larger screens
    },

    {
      title: "Tgl. Dibuat",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (date: string) => (
        <span>{format(new Date(date), "dd-MMM-yyyy", { locale: id })}</span>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: 300,
      render: (_, record) => {
        return (
          <div className="tw-flex tw-flex-wrap tw-gap-4 tw-w-full tw-justify-center">
            <Dropdown
              trigger={["click"]}
              menu={{
                items: items(record.attributes.origins, record.id),
              }}
            >
              <Button
                type="primary"
                className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold "
              >
                {t("memo.list.button.upgrade")}
              </Button>
            </Dropdown>
            <Button
              onClick={() => props.onPrint && props.onPrint(record)}
              type="primary"
              className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold !tw-bg-green-500 hover:!tw-bg-green-600"
            >
              {t("memo.list.button.print")}
            </Button>
            <Button
              onClick={() => props.onDelete && props.onDelete(record)}
              type="primary"
              danger
              className="!tw-h-[35px] !tw-w-[80px] tw-rounded-md tw-shadow tw-font-semibold "
            >
              {t("memo.list.button.delete")}
            </Button>
          </div>
        );
      },
    },
  ];
};

export default MemoColumn;

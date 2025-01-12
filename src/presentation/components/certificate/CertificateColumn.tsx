import { ICertificateData } from "@domain/entities/CertificateEntity";
import { IColumn } from "@domain/entities/DashboardEntity";
import { useLanguage } from "@lib/hooks/useLanguage";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Indonesian locale if needed

const CertificateColumn = (
  props: Pick<IColumn<ICertificateData>, "onPrint" | "onDelete" | "onDetail">
): ColumnsType<ICertificateData> => {
  const { t } = useLanguage();

  return [
    {
      title: "Kode",
      dataIndex: "id",
      width: 200,
      key: "id",
      render: (value, record) => {
        return (
          <p
            className="tw-text-blue-500 tw-cursor-pointer tw-font-semibold"
            onClick={() => props.onDetail?.(record)}
          >
            {value}
          </p>
        );
      },
    },
    {
      title: t("certificate.list.column.name"),
      className: "tw-text-sm md:tw-text-base",
      dataIndex: "attributes.object_name",
      key: "attributes.object_name",
      width: 200,
      render: (_, record) => record.attributes.object_name,
    },
    {
      title: t("certificate.list.column.customer"),
      width: 150,
      dataIndex: "member.nama",
      key: "member.nama",
      render: (_, record) => record.member.nama,
    },
    {
      title: t("certificate.list.column.creator"),
      dataIndex: "created_by",
      key: "created_by",
      responsive: ["xs", "sm", "md", "lg"],
      width: 150,
    },
    {
      title: t("certificate.list.column.created_at"),
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
      width: 220,
      render: (_, record) => {
        return (
          <div className="tw-flex tw-flex-wrap tw-gap-4 tw-w-full tw-justify-center">
            <Button
              type="primary"
              onClick={() => props.onPrint && props.onPrint(record)}
              className="!tw-h-[35px] tw-rounded-md tw-shadow !tw-w-[80px] tw-font-semibold  !tw-bg-green-500 !tw-border-green-500 hover:!tw-bg-green-600"
            >
              {t("certificate.list.button.print")}
            </Button>

            <Button
              onClick={() => props.onDelete && props.onDelete(record)}
              type="primary"
              danger
              className="!tw-h-[35px] !tw-min-w-[80px] tw-rounded-md tw-shadow tw-font-semibold "
            >
              {t("certificate.list.button.delete")}
            </Button>
          </div>
        );
      },
    },
  ];
};

export default CertificateColumn;

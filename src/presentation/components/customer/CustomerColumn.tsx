import { ICustomerData } from "@domain/entities/CustomerEntity";
import { ColumnsType } from "antd/es/table";

const CustomerColumn = (): ColumnsType<ICustomerData> => [
  {
    title: "No",
    dataIndex: "index",
    key: "index",
    width: 100,
    render: (_, _1, index) => index + 1, // Sequential number
  },
  {
    title: "No. Handphone",
    dataIndex: "mobile_phone",
    key: "mobile_phone",
  },
  {
    title: "Nama",
    dataIndex: "nama",
    key: "nama",
  },
];

export default CustomerColumn;

import NotFoundIcon from "@components/icon/NotFoundIcon";

interface NotFoundMessageProps {
  title: string;
  message: string;
}

const NotFoundMessage = (props: NotFoundMessageProps) => {
  return (
    <div className="tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded tw-text-center">
      <NotFoundIcon
        data-testid="not-found-icon"
        width={256}
        height={256}
        className="tw-text-primary-500"
      />
      <h1 className="tw-font-bold tw-text-lg">{props.title}</h1>
      <p className="tw-text-center">{props.message}</p>
    </div>
  );
};

export default NotFoundMessage;

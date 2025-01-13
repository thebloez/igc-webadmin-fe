import NotFoundMessage from "@components/not-found/NotFoundMessage";

const NotFoundPage = () => {
  return (
    <div className="tw-w-full tw-min-h-screen tw-bg-background tw-flex tw-justify-center tw-items-center">
      <NotFoundMessage
        title="404 Not Found"
        message="The page is no exist yet or no longer exist."
      />
    </div>
  );
};

export default NotFoundPage;

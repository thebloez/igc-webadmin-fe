const InsightLoading = () => {
  return (
    <>
      {/* Skeleton for Memo Origin */}
      <div className="tw-bg-white tw-border tw-rounded-lg tw-p-4 tw-animate-pulse">
        <div className="tw-bg-gray-100 tw-w-[32px] tw-h-[32px] tw-mt-2 tw-ml-2 tw-rounded-full tw-mb-4"></div>
        <div className="tw-h-6 tw-bg-gray-100 tw-rounded-full tw-mb-2"></div>
        <div className="tw-h-4 tw-bg-gray-100 tw-rounded-full"></div>
      </div>

      {/* Skeleton for Memo Non Origin */}
      <div className="tw-bg-white tw-border tw-rounded-lg tw-p-4 tw-animate-pulse">
        <div className="tw-bg-gray-100 tw-w-[32px] tw-h-[32px] tw-rounded-full tw-mb-4 tw-mt-2 tw-ml-2"></div>
        <div className="tw-h-6 tw-bg-gray-100 tw-rounded-full tw-mb-2"></div>
        <div className="tw-h-4 tw-bg-gray-100 tw-rounded-full"></div>
      </div>

      {/* Skeleton for Sertifikat */}
      <div className="tw-bg-white tw-border tw-rounded-lg tw-p-4 tw-animate-pulse">
        <div className="tw-bg-gray-100 tw-w-[32px] tw-h-[32px] tw-rounded-full tw-mb-4 tw-mt-2 tw-ml-2"></div>
        <div className="tw-h-6 tw-bg-gray-100 tw-rounded-full tw-mb-2"></div>
        <div className="tw-h-4 tw-bg-gray-100 tw-rounded-full"></div>
      </div>
    </>
  );
};

export default InsightLoading;

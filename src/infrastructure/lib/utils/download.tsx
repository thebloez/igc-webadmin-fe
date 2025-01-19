const downloadLib = async (imageUrl: string, data: any) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const filename =
      data?.id +
      "." +
      data?.attributes.object_image.split(".")[
        data?.attributes.object_image.split(".").length - 1
      ];
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(`Error downloading file: ${error}`);
  }
};

export default downloadLib;

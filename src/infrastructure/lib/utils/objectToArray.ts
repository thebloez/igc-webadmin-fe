const objectToArray = (attributes: any, exclude: string[] = []) => {
  return Object.keys(attributes)
    .filter((key) => !exclude.includes(key))
    .map((key) => {
      return {
        label: key,
        value: attributes[key],
      };
    });
};

export default objectToArray;

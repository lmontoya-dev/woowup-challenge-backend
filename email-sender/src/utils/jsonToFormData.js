export const jsonToFormData = (json, formData = new FormData()) => {
  Object.keys(json).forEach((key) => {
    const value = json[key];
    if (value instanceof File || value instanceof Blob) {
      formData.append(`${key}[]`, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(`${key}[]`, item);
        } else {
          formData.append(key, item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      jsonToFormData(value, formData);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

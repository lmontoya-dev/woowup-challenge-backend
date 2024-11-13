import { emailApiInstance } from "./apiService";

const ApiRepository = {
  sendEmail: (data) => {
    return emailApiInstance.post(`/api/email/`, data);
  },
};

export default ApiRepository;

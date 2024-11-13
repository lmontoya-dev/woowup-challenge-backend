const envs = import.meta.env;

export const env = {
  baseUrl: envs.VITE_API_URL,
};

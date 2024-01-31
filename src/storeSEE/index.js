import { apiUrl } from "../utils/getEnv";
import { SSE } from "./SSE";

export const createSSE = (requestData) => {
  const formData = new FormData();
  for (const key in requestData) {
    formData.append(key, requestData[key]);
  }

  return new SSE(`${apiUrl}/v1/answers`, {
    headers: {
      // Remove Content-Type header for FormData, it will be set automatically
    },
    method: "POST",
    payload: formData,
  });
};

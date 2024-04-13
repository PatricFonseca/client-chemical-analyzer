import { AxiosResponse } from "axios"; // Assuming use of Axios for API calls

interface ApiRequest<T> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Common HTTP methods
  body?: T; // Optional request body (can be any type)
  headers?: { [key: string]: string }; // Optional custom headers
}

interface ApiResponse<T> {
  data: T; // Response data (type can vary)
  status: number; // HTTP status code
  statusText: string; // HTTP status text
}

export const fetchFromApi = async <T>(
  request: ApiRequest<T>
): Promise<ApiResponse<T>> => {
  const { url, method = "GET", body, headers = {} } = request;

  try {
    const response: AxiosResponse<T> = await axios({
      url,
      method,
      data: body,
      headers,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    // Handle API errors here, e.g., throw a custom error or log for debugging
    throw new Error("API request failed");
  }
};

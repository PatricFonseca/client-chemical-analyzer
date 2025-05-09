export interface ApiRequest {
  urlRoute: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Common HTTP methods
  body?: BodyInit; // Optional request body (can be any type)
  headers?: { [key: string]: string }; // Optional custom headers
}

interface ApiResponse<T> {
  data: T; // Response data (type can vary)
  status: number; // HTTP status code
  statusText: string; // HTTP status text
}

export const fetchFromApi = async <T>(
  request: ApiRequest
): Promise<ApiResponse<T>> => {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const { urlRoute, method = "GET", body, headers = {} } = request;
  // console.log("url<<", JSON.parse(URLbody);

  try {
    console.log(`${URL}/${urlRoute}`);
    const response = await fetch(`${URL}/${urlRoute}`, {
      method,
      body: request.body,
      headers: {
        // "Content-Type": "application/json",
        ...headers,
      },
    });
    // const response = await fetch(`${URL}/${urlRoute}`, {
    //   method,
    //   body: body ? JSON.stringify(body) : undefined,
    //   headers: {
    //     "Content-Type": "application/json",
    //     ...headers,
    //   },
    // });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data: T = await response.json();

    console.log("data", data);

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    // Handle API errors here, e.g., throw a custom error or log for debugging
    throw new Error(error.message);
    // throw new Error("API request failed");
  }
};

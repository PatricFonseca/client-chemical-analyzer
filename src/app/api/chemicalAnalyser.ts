// export const chemicalAnalyser = async (words: string) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!apiUrl) {
//     throw new Error("NEXT_PUBLIC_API_URL is not defined");
//   }

//   const requestOptions = {
//     method: "POST",
//     body: JSON.stringify({ words }),
//     headers: new Headers({
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     }),
//   };

//   const response = await fetch(`${apiUrl}/quimic`, requestOptions);
//   const data = await response.json();
//   return data;
// };
import { fetchFromApi } from "@/app/infra/adapters/fetch-adapter";

export const chemicalAnalyser = async (words: string) => {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // if (!apiUrl) {
  //   throw new Error("NEXT_PUBLIC_API_URL is not defined");
  // }

  // const requestOptions = {
  //   method: "POST",
  //   body: JSON.stringify({ words }),
  //   headers: new Headers({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   }),
  // };

  const obj = {
    words: words,
  };

  try {
    const resp = await fetchFromApi<JSON>({
      urlRoute: "quimic",
      method: "POST",
      body: JSON.parse(JSON.stringify(obj)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return resp.data;
  } catch (error) {
    console.error(error);
  }

  // const response = await fetch(`${apiUrl}/quimic`, requestOptions);
  // const data = await response.json();
  // return data;
};

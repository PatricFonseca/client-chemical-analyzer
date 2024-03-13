export const chemicalAnalyser = async (words: string) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ words }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  };

  const response = await fetch(`http://localhost:3000/quimic`, requestOptions);
  const data = await response.json();
  return data;
};

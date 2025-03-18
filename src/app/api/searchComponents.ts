import { ApiRequest, fetchFromApi } from "@/app/infra/adapters/fetch-adapter";
import { ProductImageResult } from "../dto/chemicalDto";

export async function SearchComponentsByImage(
  imgSrc: string
): Promise<ProductImageResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const imageArrayBuffer = atob(imgSrc.split(",")[1]);
  const imageBuffer = new ArrayBuffer(imageArrayBuffer.length);
  const view = new Uint8Array(imageBuffer);
  for (let i = 0; i < imageArrayBuffer.length; i++) {
    view[i] = imageArrayBuffer.charCodeAt(i);
  }
  const blob = new Blob([imageBuffer], { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("image", blob, "image.jpg");

  const optionRequest: ApiRequest = {
    urlRoute: "chemical-analysis/image",
    method: "POST",
    body: formData,
    // headers: {
    // "Content-Type": "multipart/form-data",
    // type: "formData",
    // },
  };

  const response = await fetchFromApi<ProductImageResult>(optionRequest);
  const data = response.data;
  console.log(data);
  return data;
}

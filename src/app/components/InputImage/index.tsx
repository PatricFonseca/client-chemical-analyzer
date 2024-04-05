import Image from "next/image";
import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import style from "./style.module.css";
import { SendIcon } from "@/app/icons/SendIcon";

interface InputImageProps {
  imageSrc: string | null;
  setImageSrc: Dispatch<SetStateAction<string | null>>;
}

export function InputImage({ imageSrc, setImageSrc }: InputImageProps) {
  // const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
    }
  };

  return (
    <div className="flex items-center mb-2">
      <input
        // className={style.custom_file_upload}
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }} // Hide the default file input
      />
      <label htmlFor="fileInput" className={style.custom_file_upload}>
        Adicionar imagem para busca{" "}
        <SendIcon width={20} height={20} stroke="white" />
      </label>
      <div className="border-red-100 border w-48 h-20 rounded ml-2 ">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Selected"
            width={20}
            height={20}
            className=" w-48 h-20 object-contain  "
          />
        )}
      </div>
    </div>
  );
}

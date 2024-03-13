import SearchIcon from "@/app/icons/SearchIcon";
import React, { useState } from "react";
import TagInput from "../TagInput";
import { chemicalAnalyser } from "@/app/api/chemicalAnalyser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ResultTable from "../ResultTable";

interface Words {
  word: string;
  status: string;
}

interface ResultAnalyse {
  words: Words[];
}

export default function SearchBox() {
  const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: chemicalAnalyser,
  //   onSuccess: (data) => {
  //     console.log(data);
  //     queryClient.setQueryData(["chemicalAnalyser"], data);
  //   },
  // });

  const mutation = useMutation({
    mutationFn: chemicalAnalyser,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["chemicalAnalyser"], data);
    },
    // mutationFn: async (words: string) => {
    //   const requestOptions = {
    //     method: "POST",
    //     body: JSON.stringify({ words }),
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     }),
    //   };

    //   const response = await fetch(
    //     `http://localhost:3000/quimic`,
    //     requestOptions
    //   );
    //   const data = await response.json();
    //   return data;
    // },
  });

  async function handleAnalyse() {
    const words =
      "Aqua (Water), Sodium Laureth Sulfate, Cocamide DEA, Cocamidopropyl Betaine";
    console.log("fuowow");
    mutation.mutate(words);
  }

  const analyserJSON = queryClient.getQueryData([
    "chemicalAnalyser",
  ]) as ResultAnalyse;

  return (
    <>
      <div className="flex gap-2 mb-4">
        <input
          type="search"
          className="bg-primary p-2 border border-secondary rounded-2xl focus:outline outline-secondary  text-typography"
          placeholder="Pesquisar..."
        />
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-2 w-[10rem] focus:outline-none text-white bg-red-700 hover:bg-red-800  rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Pesquisar <SearchIcon />
        </button>
      </div>

      <h1 className="text-typography">
        Digite os ingredientes faltantes <br /> e tecle enter para inserir
      </h1>
      <TagInput />

      <br />
      <button
        type="button"
        className="flex items-center gap-2 justify-center p-2 px-3 rounded-full text-white bg-secondary opacity-85 hover:bg-secondary hover:opacity-100  mb-2"
        onClick={handleAnalyse}
      >
        Analisar <SearchIcon />
      </button>

      <ResultTable data={analyserJSON?.words} />
      {analyserJSON?.words?.map((wordK) => {
        return (
          <ul className="flex text-typography">
            <li className="" key={wordK.word}>
              {wordK.word}
            </li>
            <li>{wordK.status}</li>
          </ul>
        );
      })}
      {/* <h2 className="text-typography">{data}</h2> */}
    </>
  );
}

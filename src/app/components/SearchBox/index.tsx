import SearchIcon from "@/app/icons/SearchIcon";
import React, { useEffect, useState } from "react";
import TagInput from "../TagInput";
import { chemicalAnalyser } from "@/app/api/chemicalAnalyser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ResultTable from "../ResultTable";
import { Tag } from "react-tag-input";

interface Words {
  word: string;
  status: string;
}

interface ResultAnalyse {
  words: Words[];
}

interface SearchBoxProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export default function SearchBox({ tags, setTags }: SearchBoxProps) {
  const queryClient = useQueryClient();
  // const [tags, setTags] = React.useState<Tag[]>([]);
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
      queryClient.setQueryData(["chemicalAnalyser"], data);
    },
    onError: (error) => {
      error.message = error ? error.message : "Ocorreu um erro inesperado";
    },
  });

  function handleAnalyse() {
    const formattedWords = tags.map((tag) => tag.text).join(",");

    mutation.mutate(formattedWords);
  }

  useEffect(() => {
    console.log("tags", tags);
  }, [tags]);

  return (
    <>
      <h1 className="text-typography p-2">
        Digite os ingredientes faltantes <br /> e tecle enter para inserir
      </h1>
      <TagInput tags={tags} setTags={setTags} />
      <br />
      <button
        type="button"
        className="flex items-center gap-2 justify-center p-2 px-3 rounded-full text-white bg-secondary opacity-85 hover:bg-secondary hover:opacity-100  mb-2"
        onClick={handleAnalyse}
      >
        Analisar <SearchIcon />
      </button>

      {mutation.isPending && <h3 className="text-typography">Carregando...</h3>}
      {mutation.isError && (
        <h3 className="text-typography">
          Ocorreu um erro ao realizar a análise
        </h3>
        // <p className="text-typography">{mutation.error.message}</p>
      )}
      {/* <ResultTable data={analyserJSON?.words} />
      {analyserJSON?.words?.map((wordK) => {
        return (
          <ul className="flex text-typography">
            <li className="" key={wordK.word}>
              {wordK.word}
            </li>
            <li>{wordK.status}</li>
          </ul>
        );
      })} */}
    </>
  );
}

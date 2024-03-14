import { ChemicalWordDTO } from "@/app/dto/chemicalDto";
import React from "react";

interface ResultProps {
  data: ChemicalWordDTO[] | undefined;
}

export default function ResultTable({ data }: ResultProps) {
  return (
    <>
      {!data ? null : (
        <table className="w-full text-typography">
          <thead className="bg-secondary">
            <tr>
              <th className="border-x-2">Nome</th>
              <th>Bom/Ruim</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: ChemicalWordDTO) => {
              return (
                <tr className="border-b">
                  <td className="border-x-2 pl-2">{item.name}</td>
                  <td className="border-x-2 pl-2">{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

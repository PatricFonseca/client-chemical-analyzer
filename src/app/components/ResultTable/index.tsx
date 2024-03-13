import React from "react";

interface ResultProps {
  data: JSON | undefined;
}

export default function ResultTable({ data }: ResultProps) {
  return (
    <table className="w-full text-typography">
      <thead className="bg-secondary">
        <tr>
          <th className="border-x-2">Nome</th>
          <th>Bom/Ruim</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
          return (
            <tr className="border-b">
              <td className="border-x-2 pl-2">{item.word}</td>
              <td className="border-x-2 pl-2">{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

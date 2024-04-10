import { Dispatch, SetStateAction } from "react";

interface StepperButtonProps {
  stepp: number;
  totalStepps: number;
  setStepp: Dispatch<SetStateAction<number>>;
}
export function StepperButtons({
  stepp,
  totalStepps,
  setStepp,
}: StepperButtonProps) {
  function handleNextClick() {
    setStepp((prev: number) => prev + 1);
  }

  function handlePreviousClick() {
    setStepp((prev: number) => prev - 1);
  }

  return (
    <>
      <div className="flex w-full justify-center gap-2">
        <button
          className="bg-orange-400 rounded-full py-1 px-2 hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          onClick={handlePreviousClick}
          disabled={stepp === 0}
        >
          Voltar
        </button>
        <button
          className="bg-orange-400 rounded-full py-1 px-2 hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
          onClick={handleNextClick}
          disabled={stepp === totalStepps - 1}
        >
          Avançar
        </button>
      </div>
    </>
  );
}

import React from "react";

type StatusStep = "completed" | "not-completed";

interface Step {
  stepNumber: string;
  status?: StatusStep;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

export function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="flex w-full justify-center items-center gap-4 text-primary m-2">
      {steps?.length > 0
        ? steps?.map((step, index) => (
            <div
              key={step.stepNumber}
              className={`flex items-center gap-4  ${
                index === activeStep ? "text-primary" : "text-danger"
              }}`}
            >
              <span
                className={`flex items-center justify-center bg-slate-700 rounded-full w-10 h-10 ${
                  index === activeStep ? "text-primary" : "text-primary"
                }
                ${
                  step.status === "completed" ? "border-4 border-green-400" : ""
                } `}
              >
                {step.stepNumber}
              </span>
              {index !== steps.length - 1 ? (
                <span className="text-typography">|</span>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
}

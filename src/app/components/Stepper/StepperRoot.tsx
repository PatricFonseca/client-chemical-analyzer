import styles from "./styles.module.css";

type StatusStep = "completed" | "not-completed";

interface Step {
  stepNumber: string;
  status?: StatusStep;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

export function StepperRoot({ steps, activeStep }: StepperProps) {
  return (
    // flex flex-col gap-4 text-primary p-2 justify-center

    <aside className="flex flex-col items-center justify-center gap-2 h-[700px] p-2">
      {/* // <aside className={styles.verticalStepper }> */}
      {steps?.length > 0
        ? steps?.map((step, index) => (
            <div
              key={step.stepNumber}
              className={`flex items-center gap-4  ${
                index === activeStep ? "text-primary" : "text-danger"
              }}`}
            >
              <span
                className={`flex items-center justify-center bg-slate-500 rounded-full w-10 h-10 ${
                  index === activeStep ? "text-secondary" : "text-primary"
                }
                ${
                  step.status === "completed" ? "border-4 border-green-400" : ""
                } `}
              >
                {step.stepNumber}
              </span>

              {/* {index !== steps.length - 1 ? (
                <span className="text-typography">|</span>
              ) : null} */}
            </div>
          ))
        : null}
    </aside>
  );
}

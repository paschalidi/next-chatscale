"use client";

import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    { number: 1, title: "Account" },
    { number: 2, title: "Organization" },
    { number: 3, title: "Confirmation" },
  ];

  return (
    <div className="flex justify-center">
      <div className="relative flex items-center max-w-xs">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "h-8 w-8 rounded-full border-2 flex items-center justify-center",
                  currentStep >= step.number
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300 bg-white text-gray-500"
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "absolute -bottom-6 text-xs whitespace-nowrap",
                  currentStep >= step.number
                    ? "text-primary"
                    : "text-gray-500"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2",
                  currentStep > step.number
                    ? "bg-primary"
                    : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
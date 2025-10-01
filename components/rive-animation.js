"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useState } from "react";

export default function RiveAnimation({
  src,
  stateMachines,
  autoplay = true,
  className = "w-full h-96",
  artboard,
  onLoad,
  onStateChange,
}) {
  const [error, setError] = useState(null);

  const { RiveComponent, rive } = useRive({
    src,
    stateMachines,
    autoplay,
    artboard,
    onLoad: () => {
      console.log("Rive animation loaded:", src);
      onLoad?.();
    },
    onLoadError: (err) => {
      console.error("Error loading Rive animation:", err);
      setError(err);
    },
    onStateChange,
  });

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg`}
      >
        <p className="text-gray-500 text-sm">Failed to load animation</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <RiveComponent />
    </div>
  );
}

// Hook to get state machine inputs
export function useRiveInput(rive, stateMachineName, inputName) {
  return useStateMachineInput(rive, stateMachineName, inputName);
}

import { createContext, useContext, useState, ReactNode } from "react";

export type SnarkLevel = "low" | "medium" | "nuclear";

interface SnarkContextType {
  snarkLevel: SnarkLevel;
  setSnarkLevel: (level: SnarkLevel) => void;
}

const SnarkContext = createContext<SnarkContextType | undefined>(undefined);

export function SnarkProvider({ children }: { children: ReactNode }) {
  const [snarkLevel, setSnarkLevel] = useState<SnarkLevel>(() => {
    const stored = localStorage.getItem("snark-level");
    return (stored as SnarkLevel) || "medium";
  });

  const handleSetSnarkLevel = (level: SnarkLevel) => {
    setSnarkLevel(level);
    localStorage.setItem("snark-level", level);
  };

  return (
    <SnarkContext.Provider value={{ snarkLevel, setSnarkLevel: handleSetSnarkLevel }}>
      {children}
    </SnarkContext.Provider>
  );
}

export function useSnark() {
  const context = useContext(SnarkContext);
  if (!context) {
    throw new Error("useSnark must be used within a SnarkProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Machine, MachineInput } from "@/schemas/machine.schema";
import { machineSchema } from "@/schemas/machine.schema";
import { generateMachineId } from "@/lib/storage";

const seedMachines: Machine[] = [
  {
    id: "machine-aB7xLq2Z",
    name: "Siam Paragon Lobby",
    locationType: "SHOPPING MALL",
    expectedSalesPerDay: 6200,
    averageProfitMarginPercentage: 0.48,
    rentCostPerDay: 2200,
    electricCostPerTempPerDay: 16,
  },
  {
    id: "machine-H9t6Jp0c",
    name: "Chulalongkorn University Canteen",
    locationType: "SCHOOL",
    expectedSalesPerDay: 4300,
    averageProfitMarginPercentage: 0.41,
    rentCostPerDay: 700,
    electricCostPerTempPerDay: 12,
  },
  {
    id: "machine-Rz3kQ8yV",
    name: "Bangkok Hospital Lobby",
    locationType: "HOSPITAL",
    expectedSalesPerDay: 5100,
    averageProfitMarginPercentage: 0.44,
    rentCostPerDay: 1300,
    electricCostPerTempPerDay: 14,
  },
];

type MachinesContextValue = {
  machines: Machine[];
  addMachine: (input: MachineInput) => void;
  updateMachine: (id: string, input: MachineInput) => void;
  removeMachine: (id: string) => void;
  isHydrated: boolean;
};

export const MachinesContext = createContext<MachinesContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "machines";

const parseStoredMachines = (raw: string | null): Machine[] => {
  if (!raw) {
    return seedMachines;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const result = machineSchema.array().safeParse(parsed);
    if (!result.success) {
      console.warn("Invalid machines payload in storage:", result.error);
      return seedMachines;
    }
    return result.data;
  } catch (error) {
    console.warn("Failed to parse machines from storage:", error);
    return seedMachines;
  }
};

export const MachinesProvider = ({ children }: { children: ReactNode }) => {
  const [machines, setMachines] = useState<Machine[]>(seedMachines);
  const [isHydrated, setIsHydrated] = useState(false);

  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMachines(parseStoredMachines(stored));
    } else {
      setMachines(seedMachines);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(machines));
  }, [machines]);

  const addMachine = (input: MachineInput) => {
    setMachines((prev) => {
      const id = generateMachineId(prev.length);
      const nextMachine: Machine = { id, ...input };
      return [nextMachine, ...prev];
    });
  };

  const removeMachine = (id: string) => {
    setMachines((prev) => prev.filter((machine) => machine.id !== id));
  };

  const updateMachine = (id: string, input: MachineInput) => {
    setMachines((prev) =>
      prev.map((machine) =>
        machine.id === id ? { ...machine, ...input } : machine
      )
    );
  };

  const value = useMemo(
    () => ({
      machines,
      addMachine,
      updateMachine,
      removeMachine,
      isHydrated,
    }),
    [machines, isHydrated]
  );

  return (
    <MachinesContext.Provider value={value}>
      {children}
    </MachinesContext.Provider>
  );
};

export const useMachines = () => {
  const context = useContext(MachinesContext);
  if (!context) {
    throw new Error("useMachines must be used within MachinesProvider");
  }

  return context;
};

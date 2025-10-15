"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Machine, MachineInput } from "@/schemas/machine.schema";
import { machineSchema } from "@/schemas/machine.schema";
import { generateMachineId } from "@/lib/storage";

const seedMachines: Machine[] = [
  {
    id: "machine-001",
    name: "Siam Paragon Lobby",
    locationType: "SHOPPING MALL",
    expectedSalesPerDay: 180,
    averageProfitMarginPercentage: 0.42,
    rentCostPerDay: 1500,
    electricCostPerTempPerDay: 12,
  },
  {
    id: "machine-002",
    name: "Chulalongkorn University",
    locationType: "SCHOOL",
    expectedSalesPerDay: 140,
    averageProfitMarginPercentage: 0.38,
    rentCostPerDay: 900,
    electricCostPerTempPerDay: 10,
  },
  {
    id: "machine-003",
    name: "Bangkok Hospital Lobby",
    locationType: "HOSPITAL",
    expectedSalesPerDay: 160,
    averageProfitMarginPercentage: 0.4,
    rentCostPerDay: 1100,
    electricCostPerTempPerDay: 11,
  },
];

type MachinesContextValue = {
  machines: Machine[];
  addMachine: (input: MachineInput) => void;
  updateMachine: (id: string, input: MachineInput) => void;
  removeMachine: (id: string) => void;
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

  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setMachines(parseStoredMachines(stored));
  }, []);

  useEffect(() => {
    if (!isClient) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(machines));
  }, [machines]);

  const addMachine = (input: MachineInput) => {
    setMachines((prev) => {
      const id = generateMachineId(prev.length);
      const nextMachine: Machine = { id, ...input };
      return [...prev, nextMachine];
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
    }),
    [machines]
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

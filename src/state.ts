import { atom } from "jotai";
import type { IPTrackerType } from "./type";

export const resultAtom = atom<IPTrackerType | null>(null);

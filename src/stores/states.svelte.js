import { PREP_TIME_SEC } from "./constants";
// Rune for Cross-Component-Reactivity
export const timerConfigStates = $state({
  sessions: 3,
  workSecs: 1500,
  pauseSecs: 330,
});
export const timerStates = $state({
  currentSecondsRemaining: PREP_TIME_SEC,
  nextSecondsRemaining: timerConfigStates.workSecs,
  work: false,
});

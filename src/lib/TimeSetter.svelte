<script>
  import { PREP_TIME_SEC, LONG_PAUSE_FACTOR } from "./constants.js";

  import { timerStates } from "./states.svelte.js";

  // Runes for Display
  let dispWorkMins = $derived(timerStates.workSecs / 60);

  let dispPauseMins = $derived(Math.trunc(timerStates.pauseSecs / 60));

  let dispPauseSecs = $derived(timerStates.pauseSecs - dispPauseMins * 60);

  // Rune calculating Time at wich the worksession ends
  let endTime = $derived.by(() => {
    const TIME = Date.now();

    let longPauses = Math.trunc((timerStates.sessions - 1) / 4);
    let calcPauses = timerStates.sessions - 1 - longPauses;

    let calcEndTime = new Date(
      TIME +
        (PREP_TIME_SEC +
          timerStates.workSecs * timerStates.sessions +
          timerStates.pauseSecs * calcPauses +
          longPauses * (timerStates.pauseSecs * LONG_PAUSE_FACTOR)) *
          1000
    );

    const hours = String(calcEndTime.getHours()).padStart(2, "0");
    const minutes = String(calcEndTime.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  });
</script>

<!--Sets Duration of Work-Sessions in min-->
Work Duration: {dispWorkMins}<br />
<input
  type="range"
  step="300"
  min="900"
  max="3300"
  bind:value={timerStates.workSecs}
/><br /><br />

<!--Sets Fraction via Slider which then calculates Minutes and Seconds-->
Pause Duration {dispPauseMins}:{dispPauseSecs}<br />
<input
  type="range"
  step="5"
  min="180"
  max="480"
  bind:value={timerStates.pauseSecs}
/><br />

<!--Sets number of repetitions-->
Work Sessions<br />
<input
  type="number"
  bind:value={timerStates.sessions}
  defaultValue="3"
  min="1"
/><br /><br />

<!--Debug: Shows EndTime-->
<input type="time" value={endTime} readonly />

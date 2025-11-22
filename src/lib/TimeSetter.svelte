<script>
  import { PREP_TIME_SEC, LONG_PAUSE_FACTOR } from "../stores/constants.js";

  import { timerConfigStates, timerStates } from "../stores/states.svelte.js";

  // Runes for Display
  let dispWorkMins = $derived(timerConfigStates.workSecs / 60);

  let dispPauseMins = $derived(Math.trunc(timerConfigStates.pauseSecs / 60));

  let dispPauseSecs = $derived(
    timerConfigStates.pauseSecs - dispPauseMins * 60
  );

  // Rune calculating Time at wich the worksession ends
  let endTime = $derived.by(() => {
    const TIME = Date.now();

    let longPauses = Math.trunc((timerConfigStates.sessions - 1) / 4);
    let calcPauses = timerConfigStates.sessions - 1 - longPauses;

    let calcEndTime = new Date(
      TIME +
        (PREP_TIME_SEC +
          timerConfigStates.workSecs * timerConfigStates.sessions +
          timerConfigStates.pauseSecs * calcPauses +
          longPauses * (timerConfigStates.pauseSecs * LONG_PAUSE_FACTOR)) *
          1000
    );

    const hours = String(calcEndTime.getHours()).padStart(2, "0");
    const minutes = String(calcEndTime.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  });
</script>

<div class="border-2 w-fit p-4 m-2">
  <!--Sets Duration of Work-Sessions in min-->
  Work Duration: {dispWorkMins}<br />
  <input
    type="range"
    step="300"
    min="900"
    max="3300"
    bind:value={timerConfigStates.workSecs}
  /><br /><br />

  <!--Sets Fraction via Slider which then calculates Minutes and Seconds-->
  Pause Duration {dispPauseMins}:{dispPauseSecs}<br />
  <input
    type="range"
    step="5"
    min="180"
    max="480"
    bind:value={timerConfigStates.pauseSecs}
  /><br />

  <!--Sets number of repetitions-->
  Work Sessions<br />
  <input
    type="number"
    bind:value={timerConfigStates.sessions}
    defaultValue="3"
    min="1"
  /><br /><br />

  <!--Debug: Shows EndTime + Remaining Seconds-->
  <input type="time" value={endTime} readonly />
  {timerStates.currentSecondsRemaining}
</div>

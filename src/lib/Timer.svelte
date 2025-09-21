<script>
  import accurateInterval from "accurate-interval";
  import {
    INTERVALL_DURATION_MS,
    PREP_TIME_SEC,
    LONG_PAUSE_FACTOR,
  } from "./constants.js";
  import { timerStates } from "./states.svelte.js";

  let work = $state(true);
  let currentSeconds = $state(0);
  let currentMinutes = $state(0);
  let timer;

  // counts down from given time, mode for later use in timer
  function countDown(seconds, mode) {
    work = mode;
    currentMinutes = Math.trunc(seconds / 60);
    currentSeconds = seconds - currentMinutes * 60;

    //makes sure intervalls do not run paralell
    return new Promise((resolve) => {
      // Makes sure timer is not running
      clearInterval(timer);

      timer = accurateInterval(
        () => {
          if (currentMinutes == 0 && currentSeconds == 0) {
            clearInterval(timer);
            resolve();
          } else {
            if (currentSeconds - 1 < 0) {
              currentMinutes--;
              currentSeconds = 59;
            } else currentSeconds--;
          }
        },
        INTERVALL_DURATION_MS,
        { aligned: true, immediate: true }
      );
    });
  }

  //Starts the workcycle, async to avoid paralell intervalls
  async function cycle(sessions) {
    // 10 Minute preperation phase
    // TODO: Remove Debug Console.logs
    await countDown(PREP_TIME_SEC, false);

    console.log("PrepPhase ended");

    // Handels worksessions and pause durations
    for (let i = 1; i <= sessions; i++) {
      await countDown(timerStates.workSecs, true);
      console.log("Work ended");
      if (i < sessions) {
        if (i % 4 == 0) {
          await countDown(timerStates.pauseSecs * LONG_PAUSE_FACTOR, false);
          console.log("Long Pause ended");
        } else {
          await countDown(timerStates.pauseSecs, false);
          console.log("Pause ended");
        }
      }
      console.log(i);
    }
  }
</script>

{String(currentMinutes).padStart(2, "0")}
:
{String(currentSeconds).padStart(2, "0")}

<button type="button" onclick={() => cycle(timerStates.sessions)}
  >Click Me!</button
>

<!-- TODO: Add proper controls for timer, lock TimeSetter while timer is running -->

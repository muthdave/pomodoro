<script>
  // Conts to avoid magic numbers
  const { INTERVALL_DURATION_MS, PREP_TIME_SEC, LONG_PAUSE_FACTOR } = $props();

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
      // TODO: Set intervalltime back to 1000 ms
      clearInterval(timer);

      timer = setInterval(() => {
        if (currentMinutes == 0 && currentSeconds == 0) {
          clearInterval(timer);
          resolve();
        } else {
          if (currentSeconds - 1 < 0) {
            currentMinutes--;
            currentSeconds = 59;
          } else currentSeconds--;
        }
      }, INTERVALL_DURATION_MS);
    });
  }

  //Starts the workcycle, async to avoid paralell intervalls
  async function cycle(sessions) {
    // 10 Minute preperation phase
    // TODO: Replace magic numbers with consts, use same as in TimerSetter
    // TODO: Remove Debug Console.logs
    await countDown(PREP_TIME_SEC, false);

    //DEBUG, remove later
    console.log("PrepPhase ended");

    // Handels worksessions and pause durations
    for (let i = 1; i <= sessions; i++) {
      await countDown(600, true);
      console.log("Work ended");
      if (i < sessions) {
        if (i % 4 == 0) {
          await countDown(300 * LONG_PAUSE_FACTOR, false);
          console.log("Long Pause ended");
        } else {
          await countDown(300, false);
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

<button type="button" onclick={() => cycle(5)}>Click Me!</button>

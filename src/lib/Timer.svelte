<script>
  import accurateInterval from "accurate-interval";
  import {
    INTERVALL_DURATION_MS,
    PREP_TIME_SEC,
    LONG_PAUSE_FACTOR,
  } from "../stores/constants.js";
  import { timerStates } from "../stores/states.svelte.js";

  let work = $state(true);
  let currentSeconds = $state(0);
  let currentMinutes = $state(10);
  let timer;

  // flag for control
  let isStopped = Boolean(false);
  let getsSkipped = Boolean(false);

  // counts down from given time, mode for later use in timer
  function countDown(seconds, mode) {
    work = mode;
    currentMinutes = Math.trunc(seconds / 60);
    currentSeconds = seconds - currentMinutes * 60;

    // makes sure intervalls do not run paralell
    return new Promise((resolve) => {
      // Makes sure timer is not running
      if (timer != null) timer.clear();

      timer = accurateInterval(
        () => {
          if (isStopped) {
            // Aborts Intervall
            timer.clear();
            resolve("Aborted");
          } else if (getsSkipped) {
            // Skips current phase
            getsSkipped = false;
            timer.clear();
            resolve();
          } else if (currentMinutes == 0 && currentSeconds == 0) {
            // Ends timer if time runs out
            timer.clear();
            resolve();
          } else {
            console.log("Running");
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

  // Starts the workcycle, async to avoid paralell intervalls
  async function cycle(sessions) {
    // Resets isStopped to avoid aborting
    isStopped = false;

    // TODO: Remove Debug Console.logs

    // 10 Minute preperation phase
    let CDStatus = await countDown(PREP_TIME_SEC, false);
    if (CDStatus == "Aborted") return; // Aborts whole cycle

    console.log("PrepPhase ended");

    // Handels worksessions and pause durations
    for (let i = 1; i <= sessions; i++) {
      CDStatus = await countDown(timerStates.workSecs, true);
      if (CDStatus == "Aborted") return; // Aborts whole cycle

      if (i < sessions) {
        if (i % 4 == 0) {
          CDStatus = await countDown(
            timerStates.pauseSecs * LONG_PAUSE_FACTOR,
            false
          );
        } else {
          CDStatus = await countDown(timerStates.pauseSecs, false);
        }
        if (CDStatus == "Aborted") return; // Aborts whole cycle
      }
      console.log(i);
    }
  }

  function stopIntervall() {
    isStopped = true;
    timer.clear();
    currentSeconds = 0;
    currentMinutes = 10;
  }

  function skipIntervall() {
    getsSkipped = true;
  }
</script>

<div class="border-2 w-fit p-4">
  {String(currentMinutes).padStart(2, "0")}
  :
  {String(currentSeconds).padStart(2, "0")}

  <br /><button
    onclick={() => cycle(timerStates.sessions)}
    class="border-2 border-black px-2 py-1 cursor-pointer"
  >
    Start Timer
  </button>
  <button
    onclick={() => stopIntervall()}
    class="border-2 border-black px-2 py-1 cursor-pointer"
  >
    Stop Timer
  </button>
  <button
    onclick={() => skipIntervall()}
    class="border-2 border-black px-2 py-1 cursor-pointer"
  >
    Skip current phase
  </button>

  <!-- TODO: Expand control over timer: pause, resume, skip single interval -->
</div>

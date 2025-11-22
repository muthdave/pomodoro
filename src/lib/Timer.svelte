<script>
  import accurateInterval from "accurate-interval";
  import {
    INTERVALL_DURATION_MS,
    PREP_TIME_SEC,
    LONG_PAUSE_FACTOR,
  } from "../stores/constants.js";
  import { timerStates } from "../stores/states.svelte.js";

  // Handles timer duration and correct display of numbers
  let currentSecondsRemaining = $state(0);
  let dispMinutes = $derived(Math.trunc(currentSecondsRemaining / 60));
  let dispSeconds = $derived(currentSecondsRemaining - dispMinutes * 60);

  // Used for styling -> later
  let work = $state(true);

  // For more control over the timer
  let timer;

  // Flag for control
  let isStopped = Boolean(false);
  let getsSkipped = Boolean(false);
  let paused = Boolean(false);

  // counts down from given time, mode for later use in timer
  function countDown(seconds, mode) {
    work = mode;
    currentSecondsRemaining = seconds;
    // makes sure intervalls do not run paralell
    return new Promise((resolve) => {
      // Makes sure timer is not running
      if (timer != null) timer.clear();

      timer = accurateInterval(
        () => {
          if (paused) {
          } else if (isStopped) {
            // Aborts Intervall
            timer.clear();
            resolve("Aborted");
          } else if (getsSkipped) {
            // Skips current phase
            getsSkipped = false;
            timer.clear();
            resolve();
          } else if (currentSecondsRemaining == 0) {
            // Ends timer if time runs out
            timer.clear();
            resolve();
          } else {
            currentSecondsRemaining--;
          }
        },
        INTERVALL_DURATION_MS,
        { aligned: true, immediate: true }
      );
    });
  }

  // Starts the workcycle, async to avoid paralell intervalls
  async function cycle(sessions) {
    // Resets control flags for secure start
    isStopped = false;
    paused = false;

    // 10 Minute preperation phase
    let CDStatus = await countDown(PREP_TIME_SEC, false);
    if (CDStatus == "Aborted") return; // Aborts whole cycle

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
    }
  }

  function stopIntervall() {
    isStopped = true;
    timer.clear();
    currentSecondsRemaining = PREP_TIME_SEC;
  }

  function skipIntervall() {
    getsSkipped = true;
    paused = false;
  }

  function pauseIntervall() {
    paused = true;
  }

  function continueIntervall() {
    paused = false;
  }
</script>

<div class="border-2 w-fit p-4">
  <!--TODO: Encapsulate timer controls further-->
  {String(dispMinutes).padStart(2, "0")}
  :
  {String(dispSeconds).padStart(2, "0")}

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
  <button
    onclick={() => pauseIntervall()}
    class="border-2 border-black px-2 py-1 cursor-pointer"
  >
    Pause current phase
  </button>

  <button
    onclick={() => continueIntervall()}
    class="border-2 border-black px-2 py-1 cursor-pointer"
  >
    Resume current phase
  </button>
</div>

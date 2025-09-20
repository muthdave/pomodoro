<script>
  const { PREP_TIME_SEC, LONG_PAUSE_FACTOR } = $props();

  // Runes for Inputs
  let workMin = $state(25);
  let sessions = $state(3);

  //Rune for Pause-Time-Calculations, ueses Fractions
  let pauseValue = $state(5);

  //Runes calculating duration of pauses, uses ceil to avoid round errors in edge-cases
  let roundedPauseValue = $derived(Math.ceil(pauseValue * 100) / 100);
  let pauseMin = $derived(Math.trunc(roundedPauseValue));
  let pauseSec = $derived(
    Math.round(60 * (roundedPauseValue % Math.trunc(roundedPauseValue)))
  );

  //Rune calculating Time at wich the worksession ends
  let endTime = $derived.by(() => {
    const TIME = Date.now();

    let calcWorkSec = workMin * 60;
    let calcPauseSec = pauseMin * 60 + pauseSec;

    let longPauses = Math.trunc((sessions - 1) / 4);
    let calcPauses = sessions - 1 - longPauses;

    let calcEndTime = new Date(
      TIME +
        (PREP_TIME_SEC +
          calcWorkSec * sessions +
          calcPauseSec * calcPauses +
          longPauses * (calcPauseSec * LONG_PAUSE_FACTOR)) *
          1000
    );

    const hours = String(calcEndTime.getHours()).padStart(2, "0");
    const minutes = String(calcEndTime.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  });
</script>

<!--Sets Duration of Work-Sessions in min-->
Work Duration: {workMin}<br />
<input type="range" step="5" min="15" max="55" bind:value={workMin} /><br /><br
/>

<!--Sets Fraction via Slider which then calculates Minutes and Seconds-->
Pause Duration {pauseMin}:{pauseSec}<br />
<input
  type="range"
  step="0.0833"
  min="3"
  max="8.008"
  bind:value={pauseValue}
/><br />

<!--Sets number of repetitions-->
Work Sessions<br />
<input type="number" bind:value={sessions} defaultValue="3" min="1" /><br /><br
/>

<!--Debug: Shows EndTime-->
<input type="time" value={endTime} readonly />

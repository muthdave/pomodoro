<script>
  let workMin = $state(25);
  let pauseValue = $state(5);
  let sessions = $state(3);

  let pauseMin = $derived(Math.trunc(Math.ceil(pauseValue * 100) / 100));
  let pauseSec = $derived(
    Math.round(
      60 *
        ((Math.ceil(pauseValue * 100) / 100) %
          Math.trunc(Math.ceil(pauseValue * 100) / 100))
    )
  );

  let endTime = $derived.by(() => {
    let time = Date.now();
    const prepTime = 600;
    let calcWorkSec = workMin * 60;
    let calcPauseMin = pauseMin * 60 + pauseSec;
    let longPauses = Math.trunc((sessions - 1) / 4);
    let calcPauses = sessions - 1 - longPauses;

    let calcEndTime = new Date(
      time +
        (prepTime +
          calcWorkSec * sessions +
          calcPauseMin * calcPauses +
          longPauses * (calcPauseMin * 2.5)) *
          1000
    );

    const hours = String(calcEndTime.getHours()).padStart(2, "0");
    const minutes = String(calcEndTime.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  });
</script>

<main>
  Work Duration: {workMin}<br />
  <input
    type="range"
    defaultValue="25"
    step="5"
    min="15"
    max="55"
    bind:value={workMin}
  /><br /><br />
  Pause Duration {pauseMin}:{pauseSec}<br />
  <input
    type="range"
    defaultValue="5"
    step="0.0833"
    min="3"
    max="8.008"
    bind:value={pauseValue}
  /><br />
  Work Sessions<br />
  <input type="number" bind:value={sessions} defaultValue="3" min="1" /><br
  /><br />

  <input type="time" bind:value={endTime} disabled/>
</main>

<style>
</style>

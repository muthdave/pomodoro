<script>
  console.log(Date.now());
  var WorkMin = $state(25);
  var PauseValue = $state(5);

  var PauseMin = $derived(Math.trunc(Math.ceil(PauseValue * 100) / 100));
  var PauseSec = $derived(
    Math.round(
      60 *
        ((Math.ceil(PauseValue * 100) / 100) %
          Math.trunc(Math.ceil(PauseValue * 100) / 100))
    )
  );
  
</script>

<main>
  Work Duration: {WorkMin}<br />
  <input
    type="range"
    defaultValue="25"
    step="5"
    min="15"
    max="55"
    bind:value={WorkMin}
  /><br /><br />
  Pause Duration {PauseMin}:{PauseSec}<br />
  <input
    type="range"
    defaultValue="5"
    step="0.0833"
    min="3"
    max="8.008"
    bind:value={PauseValue}
  /><br />
  Work Sessions<br />
  <input type="number" defaultValue="3" min="1" /><br /><br />
</main>

<style>
</style>

<script>
  import TimeSetter from "./lib/TimeSetter.svelte";
  import Timer from "./lib/Timer.svelte";

  // Constants to avoid magic numbers
  const INTERVALL_DURATION_MS = 10;
  const PREP_TIME_SEC = 600;
  const LONG_PAUSE_FACTOR = 2.5;
</script>

<main>
  <!-- Debug -> For later -->
  <TimeSetter {PREP_TIME_SEC} {LONG_PAUSE_FACTOR}></TimeSetter>
  <Timer {INTERVALL_DURATION_MS} {PREP_TIME_SEC} {LONG_PAUSE_FACTOR}></Timer>
</main>

<style>
</style>

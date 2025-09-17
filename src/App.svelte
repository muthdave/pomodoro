<script context="module">
  import TimeSetter from "./lib/TimeSetter.svelte";
  import Timer from "./lib/Timer.svelte";

  // Constants to avoid magic numbers
  export const INTERVALL_DURATION_MS = 10;
  export const PREP_TIME_SEC = 600;
  export const LONG_PAUSE_FACTOR = 2.5;
</script>

<main>
  <!-- Debug -> For later -->
  <TimeSetter></TimeSetter>
  <Timer></Timer>
</main>

<style>
</style>

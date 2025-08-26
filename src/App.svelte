<script>
  // @ts-nocheck

  let minutes = $state(0);
  let seconds = $state(0);

  function incMinutes() {
    minutes += 1;
  }
  function decMinutes() {
    if (!(minutes - 1 < 0)) {
      minutes -= 1;
    }
  }
  function incSeconds() {
    if (seconds + 5 < 60) {
      seconds += 5;
    } else {
      seconds = 0;
    }
  }
  function decSeconds() {
    if (!(seconds - 5 < 0)) {
      seconds -= 5;
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore event_directive_deprecated -->
<main>
  <!-- TODO: Capsule in Component  -->
  <div class="w-fit bg-secondary grid grid-cols-2 grid-rows-3">
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-10 hover:text-amber-50 cursor-pointer"
      on:click={() => incMinutes()}
    >
      <path
        d="M7 16H5v-2h2v-2h2v-2h2V8h2v2h2v2h2v2h2v2h-2v-2h-2v-2h-2v-2h-2v2H9v2H7v2z"
        fill="currentColor"
      />
    </svg>
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-10 hover:text-amber-50 cursor-pointer"
      on:click={() => incSeconds()}
    >
      <path
        d="M7 16H5v-2h2v-2h2v-2h2V8h2v2h2v2h2v2h2v2h-2v-2h-2v-2h-2v-2h-2v2H9v2H7v2z"
        fill="currentColor"
      />
    </svg>
    <div class="col-span-2">
      {#if minutes < 10}0{/if}{minutes}:{#if seconds < 10}0{/if}{seconds}
    </div>
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-10 hover:text-amber-50 cursor-pointer"
      on:click={() => decMinutes()}
    >
      <path
        d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7V8z"
        fill="currentColor"
      />
    </svg>
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-10 hover:text-amber-50 cursor-pointer"
      on:click={() => decSeconds()}
    >
      <path
        d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7V8z"
        fill="currentColor"
      />
    </svg>
  </div>
</main>

<style>
</style>

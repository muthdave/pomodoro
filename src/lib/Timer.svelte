<script>
  let currentSeconds = $state(0);
  let currentMinutes = $state(0);

  function countDown(seconds) {
    currentMinutes = Math.trunc(seconds / 60);
    currentSeconds = seconds - currentMinutes * 60;

    setInterval(() => {
      if (currentSeconds - 1 < 0) {
        currentMinutes--;
        currentSeconds = 59;
      } else currentSeconds--;
    }, 500);
  }
</script>

<main>
  {String(currentMinutes).padStart(2, "0")}
  :
  {String(currentSeconds).padStart(2, "0")}
</main>

<template>
  Open the console to see the log
  <br />
  <br />
  <pre>
log.message("This is a message");
log.info("This is an info");
log.warn("This is a warning");
log.error("This is an error");
log.success("This is a success");
  </pre>
</template>

<script setup lang="ts">
import { log } from ".";

log.message("This is a message");
log.info("This is an info");
log.warn("This is a warning");
log.error("This is an error");
log.success("This is a success");
</script>

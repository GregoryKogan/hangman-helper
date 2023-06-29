<template>
  <v-container>
    <h3 v-if="letters.length > 0" align="left">Попробуйте буквы:</h3>
    <v-row style="padding-top: 20px; padding-bottom: 10px">
      <v-chip v-for="letter in letters" size="x-large" style="margin-left: 10px; margin-bottom: 10px">
        <b>{{ letter.toUpperCase() }}</b>
      </v-chip>
    </v-row>
    <h3 v-if="words.length > 0" style="margin-top: 10px" align="left">
      Возможно это слово:
    </h3>
    <p align="left">
      {{ words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(", ") }}
    </p>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Suggestions",
  props: {
    letters: {
      type: Array<string>,
      required: true,
    },
    words: {
      type: Array<string>,
      required: true,
    },
  },
});
</script>

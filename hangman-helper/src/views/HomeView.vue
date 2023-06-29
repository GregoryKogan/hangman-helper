<template>
  <div class="col">
    <h1 style="margin-bottom: 5px; margin-top: 15px">Помощник висельника</h1>
    <v-container>
      <v-divider :thickness="5" color="#bb9af7" class="border-opacity-100"></v-divider>
      <v-text-field @change="submit" @click:clear="submit" clearable variant="outlined" :label="wordInput != null && wordInput.length > 0
          ? 'Длина: ' + wordInput.length.toString()
          : 'Ваше слово'
        " placeholder="Гид__э_ек___с__нция" style="margin-top: 20px" v-model="wordInput">
      </v-text-field>
      <v-text-field @change="submit" @click:clear="submit" clearable variant="outlined" label="Использованные буквы"
        placeholder="з, б, в, у, ш, ж" v-model="lettersInput"></v-text-field>
      <v-divider :thickness="5" color="#bb9af7" class="border-opacity-100"></v-divider>
    </v-container>
    <WordSuggestions :letters="letters" :words="words"></WordSuggestions>
    <AboutCard></AboutCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WordSuggestions from "@/components/WordSuggestions.vue";
import AboutCard from "@/components/AboutCard.vue";
import {
  loadData,
  parseLetters,
  parseWord,
  matchWords,
  countLetters,
  get10BestLetters,
  extendBannedLetters,
} from "@/logic/processing";

export default defineComponent({
  name: "HomeView",
  components: {
    WordSuggestions,
    AboutCard,
  },
  data: () => ({
    wordInput: "",
    lettersInput: "",

    dictionary: [] as string[],
    letters: [] as string[],
    words: [] as string[],
  }),
  async created() {
    this.dictionary = await loadData();
  },
  methods: {
    submit() {
      if (this.wordInput === null) this.wordInput = "";
      if (this.lettersInput === null) this.lettersInput = "";
      if (this.wordInput.length < 2) {
        this.letters = [];
        this.words = ["...cлишком короткое"];
        return;
      }

      let word = parseWord(this.wordInput);
      let bannedLetters = parseLetters(this.lettersInput);
      bannedLetters = extendBannedLetters(bannedLetters, word);
      this.words = matchWords(word, bannedLetters, this.dictionary);
      if (this.words.length == 0) {
        this.letters = [];
        this.words = ["А я, кажется, не знаю таких слов..."];
        return;
      }
      this.letters = get10BestLetters(countLetters(this.words), word);
    },
  },
});
</script>

<style>
.col {
  text-align: center;
  margin: auto;
  width: 90%;
}
</style>

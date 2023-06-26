<template>
    <div class="col">
        <h1 style="margin-bottom: 5px; margin-top: 15px;">Hangman Helper</h1>
        <v-container>
            <v-divider :thickness="5" color="#bb9af7" class="border-opacity-100"></v-divider>
            <v-text-field 
                clearable 
                variant="outlined"
                :label="wordInput != null && wordInput.length > 0 ? 'Длина: ' + wordInput.length.toString() : 'Ваше слово'"
                placeholder="Гид__э_ек___с__нция"
                style="margin-top: 20px;"
                v-model="wordInput"
            >
            </v-text-field>
            <v-text-field 
                clearable 
                variant="outlined"
                label="Использованные буквы"
                placeholder="з, б, в, у, ш, ж"
                v-model="lettersInput"
            ></v-text-field>
            <v-divider :thickness="5" color="#bb9af7" class="border-opacity-100"></v-divider>
        </v-container>
        <v-row justify="space-around" style="margin: 5px; width: 100%;">
            <v-btn @click="submit" color="#414868">Подтвердить</v-btn>
        </v-row>
        <v-container>
            <h3 v-if="letters.length > 0" align="left">Попробуйте буквы:</h3>
            <p align="left" style="font-size: 22px; font-weight: bold;"> {{ letters.join(', ').toUpperCase() }}</p>
            <h3 v-if="words.length > 0" style="margin-top: 10px;" align="left">Возможно это слово:</h3>
            <p align="left"> {{ words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(', ') }}</p>
        </v-container>
        <v-btn
        fab
        >

        </v-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadData, parseLetters, parseWord, matchWords, countLetters, get10BestLetters, extendBannedLetters } from "@/logic/processing";

export default defineComponent({
  name: "HomeView",
  data: () => ({
    wordInput: "",
    lettersInput: "",

    dictionary: [] as string[],
    letters: [] as string[],
    words: [] as string[],
  }),
  methods: {
    submit() {
      if (this.wordInput === null) this.wordInput = "";
      if (this.lettersInput === null) this.lettersInput = "";
      if (this.wordInput.length < 2) {
        this.letters = [];
        this.words = ["...cлишком короткое"];
        return;
      };

      let word = parseWord(this.wordInput);
      let bannedLetters = parseLetters(this.lettersInput);
      bannedLetters = extendBannedLetters(bannedLetters, word);
      this.words = matchWords(word, bannedLetters, this.dictionary);
      if (this.words.length == 0) {
        this.letters = [];
        this.words = ["А я, кажется, не знаю таких слов..."];
        return;
      };
      this.letters = get10BestLetters(countLetters(this.words), word);
    },
  },
  async created() {
    this.dictionary = await loadData();
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
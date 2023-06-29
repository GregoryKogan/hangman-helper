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
    <Suggestions :letters="letters" :words="words"></Suggestions>
    <v-card style="padding: 15px" variant="flat" position="fixed" location="bottom right" color="#00000000">
      <v-container>
        <v-row>
          <v-btn @click="helpDialog = true" icon="mdi-help" density="compact" size="x-large" variant="flat"
            color="#1a1b26" style="margin-bottom: 10px"></v-btn>
        </v-row>
        <v-row>
          <v-btn @click="goToRepo" icon="mdi-github" density="compact" size="x-large" variant="flat"
            color="#1a1b26"></v-btn>
        </v-row>
      </v-container>
    </v-card>
    <v-dialog v-model="helpDialog" scrim="#1a1b26">
      <v-card variant="flat" color="#1a1b26">
        <v-card-title> Помощь </v-card-title>
        <v-card-text>
          Это приложение поможет вам в игре <b>"Виселица"</b>. Введите
          загаданное слово в поле <b>"Ваше слово"</b>, заменяя неизвестные буквы
          на любой другой символ. А в поле <b>"Использованные буквы"</b> укажите
          буквы, которые вы уже назвали, но которых нет в слове. Вам будут
          предложены буквы, которые, возможно, есть в загаданном слове, а также
          слова, которые могут быть загаданы. <b>Приятной игры!</b>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Suggestions from "@/components/Suggestions.vue";
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
    Suggestions,
  },
  data: () => ({
    wordInput: "",
    lettersInput: "",

    helpDialog: false,

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
    goToRepo() {
      window.open("https://github.com/GregoryKogan/hangman-helper", "_blank");
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

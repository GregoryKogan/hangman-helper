<template>
  <v-card style="padding: 15px" variant="flat" position="fixed" location="bottom right" color="#00000000">
    <v-container>
      <v-row>
        <v-btn @click="helpDialog = true" icon="mdi-help" density="compact" size="x-large" variant="flat" color="#1a1b26"
          style="margin-bottom: 10px"></v-btn>
      </v-row>
      <v-row>
        <v-btn @click="goToRepo" icon="mdi-github" density="compact" size="x-large" variant="flat"
          color="#1a1b26"></v-btn>
      </v-row>
    </v-container>
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
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutCard",
  data: () => ({
    helpDialog: false,
  }),
  methods: {
    goToRepo() {
      window.open("https://github.com/GregoryKogan/hangman-helper", "_blank");
    },
  },
});
</script>

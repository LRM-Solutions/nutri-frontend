<script setup>
import { ref } from "vue";
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
  AccordionContent,
  Textarea,
} from "primevue";
const created = ref(false);
</script>

<template>
  <div class="card w-full">
    <div class="flex flex-row items-center gap-4">
      <h1 class="text-4xl">Anamnese</h1>
      <Button
        v-if="!created"
        class="p-1 px-3 text-md bg-green-500 text-white"
        :disabled="false"
        @click="created = true"
        >+ Nova Anamnese</Button
      >
    </div>

    <div v-if="created">
      <div class="dados-iniciais mt-5">
        <div class="flex flex-row items-center gap-5">
          <div class="mt-3 flex flex-col gap-1 justify-center w-full">
            <label for="altura" class="ml-1">Caso Clínico:</label>
            <Textarea rows="5" cols="30" />
          </div>
        </div>
      </div>
      <Accordion class="mt-3 w-full" :value="['0']" multiple>
        <AccordionPanel value="0">
          <AccordionHeader class="text-xl text-black"
            >Hábitos de vida</AccordionHeader
          >
          <AccordionContent> </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader class="text-xl text-black"
            >Patologias</AccordionHeader
          >
          <AccordionContent> </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
          <AccordionHeader class="text-xl text-black"
            >Avaliação clínica</AccordionHeader
          >
          <AccordionContent> </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="3">
          <AccordionHeader class="text-xl text-black">Sintomas</AccordionHeader>
          <AccordionContent> </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="4">
          <AccordionHeader class="text-xl text-black"
            >Rastreamento metabólico</AccordionHeader
          >
          <AccordionContent> </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="5">
          <AccordionHeader class="text-xl text-black"
            >Hábitos Alimentares</AccordionHeader
          >
          <AccordionContent> </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <div class="footer flex flex-row justify-end items-center gap-5 mt-3">
        <Button
          class="mt-3 p-1 px-3 text-md bg-red-500 text-white"
          :disabled="false"
          @click="created = false"
          >Cancelar</Button
        >
        <Button
          class="mt-3 p-1 px-3 text-md bg-green-500 text-white"
          :disabled="false"
          @click="created = true"
          >Salvar</Button
        >
      </div>
    </div>
  </div>
</template>

<style>
.p-accordioncontent-content,
.p-accordionheader {
  padding-left: 0 !important;
}
</style>

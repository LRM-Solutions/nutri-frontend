<script setup>
import { ref } from "vue";
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
  AccordionContent,
} from "primevue";
const created = ref(false);
</script>

<template>
  <div class="card w-full">
    <div class="flex flex-row items-center gap-4">
      <h1 class="text-4xl">Antropometria</h1>
      <Button
        v-if="!created"
        class="p-1 px-3 text-md bg-green-500 text-white"
        :disabled="false"
        @click="created = true"
        >+ Nova Antropometria</Button
      >
    </div>

    <div v-if="created">
      <!-- <div class="dados-iniciais mt-5">
        <h1 class="text-xl">Dados do Paciente:</h1>
        <div class="flex flex-row items-center gap-5">
          <div class="mt-3 flex flex-col gap-1 justify-center w-full">
            <label for="altura" class="ml-1">Altura:</label>
            <InputText
              id="altura"
              class="flex-auto w-full"
              autocomplete="off"
              placeholder="Altura"
              type="number"
            />
          </div>
          <div class="mt-3 flex flex-col gap-1 justify-center w-full">
            <label for="altura" class="ml-1">Peso Atual:</label>
            <InputText
              id="altura"
              class="flex-auto w-full"
              autocomplete="off"
              placeholder="Altura"
              type="number"
            />
          </div>
          <div class="mt-3 flex flex-col gap-1 justify-center w-full">
            <label for="altura" class="ml-1">Peso Ideal:</label>
            <InputText
              id="altura"
              class="flex-auto w-full"
              autocomplete="off"
              placeholder="Altura"
              type="number"
            />
          </div>
        </div>
      </div> -->
      <Accordion class="mt-3 w-full" :value="['0']" multiple>
        <AccordionPanel value="0">
          <AccordionHeader class="text-xl text-black"
            >Dados do Paciente</AccordionHeader
          >
          <AccordionContent>
            <div class="flex flex-row items-center gap-5">
              <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                <label for="altura" class="ml-1">Altura:</label>
                <InputText
                  id="altura"
                  class="flex-auto w-full"
                  autocomplete="off"
                  placeholder="Altura"
                  type="number"
                />
              </div>
              <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                <label for="altura" class="ml-1">Peso Atual:</label>
                <InputText
                  id="altura"
                  class="flex-auto w-full"
                  autocomplete="off"
                  placeholder="Altura"
                  type="number"
                />
              </div>
              <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                <label for="altura" class="ml-1">Peso Ideal:</label>
                <InputText
                  id="altura"
                  class="flex-auto w-full"
                  autocomplete="off"
                  placeholder="Altura"
                  type="number"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader class="text-xl text-black"
            >Circunferências</AccordionHeader
          >
          <AccordionContent>
            <div class="membros-superiores w-full">
              <h2 class="text-xl text-black">Membros Superiores</h2>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1"
                    >Braço relaxado esquerdo:</label
                  >
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1"
                    >Braço relaxado direito:</label
                  >
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1"
                    >Braço contraído esquerdo:</label
                  >
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1"
                    >Braço contraído direito:</label
                  >
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Antebraço esquerdo:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Antebraço direito:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Punho esquerdo:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Punho direito:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div class="tronco w-full">
              <h2 class="text-xl text-black mt-3">Tronco</h2>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Pescoço:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Ombro:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Peitoral:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Cintura:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Abdomen:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Quadril:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div class="membros-inferiores w-full">
              <h2 class="text-xl text-black mt-3">Membros Inferiores</h2>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Panturrilha esquerda:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Panturrilha direita:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Coxa esquerda:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
              <div class="flex flex-row items-center gap-5">
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1">Coxa direita:</label>
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1"
                    >Coxa proximal esquerda:</label
                  >
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
                <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                  <label for="altura" class="ml-1"
                    >Coxa proximal direita:</label
                  >
                  <InputText
                    id="altura"
                    class="flex-auto w-full"
                    autocomplete="off"
                    placeholder=""
                    type="number"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
          <AccordionHeader class="text-xl text-black"
            >Diâmetros Ósseos</AccordionHeader
          >
          <AccordionContent>
            <div class="flex flex-row items-center gap-5">
              <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                <label for="altura" class="ml-1">Punho:</label>
                <InputText
                  id="altura"
                  class="flex-auto w-full"
                  autocomplete="off"
                  placeholder=""
                  type="number"
                />
              </div>
              <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                <label for="altura" class="ml-1">Fêmur:</label>
                <InputText
                  id="altura"
                  class="flex-auto w-full"
                  autocomplete="off"
                  placeholder=""
                  type="number"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="3">
          <AccordionHeader class="text-xl text-black"
            >Composição Corporal</AccordionHeader
          >
          <AccordionContent>
            <div class="flex flex-row items-center gap-5">
              <div class="mt-3 flex flex-col gap-1 justify-center w-full">
                <label for="altura" class="ml-1">Tipo:</label>
                <InputText
                  id="altura"
                  class="flex-auto w-full"
                  autocomplete="off"
                  placeholder=""
                  type="number"
                />
              </div>
            </div>
          </AccordionContent>
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

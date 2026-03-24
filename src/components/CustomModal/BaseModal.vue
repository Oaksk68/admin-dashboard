<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50">
      <div class="fixed inset-0 bg-black/30">
        <div class="fixed inset-0 w-screen overflow-y-auto text-primary">
          <div @click="$emit('closeModal')" class="flex min-h-full justify-center items-center p-4">
            <TransitionChild :class="classList" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="relative w-full rounded-xl bg-white p-4">
                <DialogTitle class="text-2xl text-center p-4 text-primary">
                  <slot name="title"></slot>
                </DialogTitle>
                <slot name="container"></slot>
                <slot name="footer">
                  <div
                    class="grid justify-items-center w-full mb-5 md:mb-10 pt-0 md:pt-10 gap-2 md:flex md:justify-center md:gap-5">
                    <slot name="btnCancle">
                      <button
                        class="w-[80%] md:w-1/3 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
                        type="button" @click="$emit('close-modal')">
                        {{ $t("cancel") }}
                      </button>
                    </slot>
                    <slot name="btnSubmit">
                      <button
                        class="shadow w-[80%] md:w-1/3 border-2 border-origin bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
                        type="button" :disabled="btnDisable" @click="$emit('submit')">
                        {{ $t("save") }}
                      </button>
                    </slot>
                  </div>
                </slot>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  props: {
    isOpen: Boolean, btnDisable: Boolean,
    classList: {
      required: false,
      default: 'md:w-[80vw] w-full'
    }
  },
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      // modalIsOpened: Boolean
    }
  },

  // methods: {
  //   closeModal(){

  //   }
  // },

  watch: {
    btnDisable(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped></style>

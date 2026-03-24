<template>
  <div>
    <div
      class="fixed w-full h-screen bg-black bg-opacity-30 flex justify-center items-center top-0 left-0 z-[1034]"
      @click="$emit('closeModal')"
    >
      <slot name="container" @click.stop="">
        <div
          id="modal"
          class="p-4 pr-0 bg-white w-[90%] md:w-auto rounded-lg overflow-auto"
          v-bind="$attrs"
          @click.stop=""
        >
          <slot @click.stop="" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>

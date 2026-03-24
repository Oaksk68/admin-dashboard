<template>
  <div id="accordion">
    <div v-for="(item, index) in items" :key="index" class="border-t border-b py-2 pl-8 pr-3">
      <button class="flex items-center w-full gap-3">
        <font-awesome-icon class="bg-origin p-2 text-white rounded-full" icon="fa-solid fa-chevron-up" rotation="180" />
        <span class="capitalize">{{ item.name }}</span>
      </button>
      <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden" id="content">
        <div>
          <h1>{{ $t('name') }}</h1>
          <span class="text-gray-400">{{ item.name }}</span>
        </div>
        <div>
          <h1>{{ $t('enterpriseLevel') }}</h1>
          <span class="text-gray-400">ระดับสูง (UPPER)</span>
        </div>
        <div>
          <h1>ระดับสูง (UPPER)</h1>
          <span class="text-gray-400">10,000</span>
        </div>
        <div>
          <h1>{{ $t('holiday') }}</h1>
          <span class="text-gray-400">icons</span>
        </div>
        <div>
          <h1>แก้ไข / ลบ</h1>
          <div class="flex gap-5">
            <div class="bg-calendarBg p-3 rounded-full hover:bg-gray-200">
              <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
            </div>
            <div class="bg-red-400 p-3 rounded-full">
              <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style></style>

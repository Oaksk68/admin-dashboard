<template>
  <div class="container mx-auto">
    <LoginNav />
    <div class="flex justify-center items-center">
      <div
        class="border-none md:border-dashed md:border-2 border-sky-500 rounded-large mt-10 md:mt-28 bg-white pt-4 pb-10 sm:px-20 md:px-32"
      >
        <h1 class="font-normal text-center text-primary text-4xl mt-5">
          สมัครสมาชิก
        </h1>
        <p class="font-normal text-center text-muted text-sm mt-8">
          เลือกประเภทของผู้ใช้งาน ที่ท่านต้องการใช้งาน
        </p>
        <div class="flex mt-10">
          <div class="relative bg-chooser h-160 w-160 mr-10 rounded-3xl">
            <img
              class="absolute left-10 top-10 h-16"
              src="../assets/images/people.png"
              alt=""
            />
          </div>
          <div class="relative bg-chooser h-160 w-160 rounded-3xl">
            <img
              class="absolute left-10 top-10 h-16"
              src="../assets/images/Union.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";

export default {
  components: { LoginNav },
};
</script>

<style scoped></style>

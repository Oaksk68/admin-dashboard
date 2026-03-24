<template>
  <div class="container mx-auto">
    <LoginNav />
    <div class="flex justify-center">
      <div class="mt-8 md:mt-16 bg-white pt-4 pb-10 sm:px-20 md:px-32">
        <div class="flex justify-center">
          <img src="../assets/images/Union.png" alt="" />
        </div>

        <h1 class="font-normal text-center text-primary text-4xl mt-5">
          ลงทะเบียนสำหรับพนักงาน
        </h1>
        <p class="font-normal text-center text-muted text-sm mt-4">
          สร้างบัญชีของคุณได้ที่นี่
        </p>
        <form class="mt-8">
          <div
            class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center"
          >
            <label
              class="text-right clear-both float-left text-gray-500 font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              ชื่อบริษัท
            </label>
            <input
              class="ml-10 w-48 md:w-80 border-2 border-gray-200 rounded-xl py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-sky-500"
              id="inline-full-name"
              type="text"
              placeholder="ชื่อบริษัท"
            />
          </div>
          <div
            class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center"
          >
            <label
              class="text-right clear-both float-left text-gray-500 font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              อีเมล
            </label>
            <input
              class="ml-16 w-48 md:w-80 border-2 border-gray-200 rounded-xl py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-sky-500"
              id="inline-password"
              type="password"
              placeholder="อีเมล"
            />
          </div>
          <div
            class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center"
          >
            <label
              class="text-right clear-both float-left text-gray-500 font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              ชื่อผู้ใช้งาน
            </label>
            <input
              class="ml-7 w-48 md:w-80 border-2 border-gray-200 rounded-xl py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-sky-500"
              id="inline-password"
              type="password"
              placeholder="ชื่อผู้ใช้งาน"
            />
          </div>
          <div
            class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center"
          >
            <label
              class="text-right clear-both float-left text-gray-500 font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              รหัสผ่าน
            </label>
            <input
              class="ml-12 w-48 md:w-80 border-2 border-gray-200 rounded-xl py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-sky-500"
              id="inline-password"
              type="password"
              placeholder="รหัสผ่าน"
            />
          </div>
          <div
            class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center"
          >
            <label
              class="text-right clear-both float-left text-gray-500 font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              class="ml-2 w-48 md:w-80 border-2 border-gray-200 rounded-xl py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-sky-500"
              id="inline-password"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
            />
          </div>
          <div
            class="md:flex md:items-center my-4 align-middle flex flex-row items-center justify-center"
          >
            <button
              class="shadow w-full md:float-right ml-30 md:w-80 bg-origin hover:bg-sky-700 focus:shadow-outline focus:outline-none text-white font-normal py-3 rounded-xl"
              type="button"
            >
              ลงทะเบียน
            </button>
          </div>

          <p class="clear-both text-center pt-5">
            มีบัญชีผู้ใช้งานแล้ว? ต้องการ
            <span class="text-danger"><a href="#">เข้าสู่ระบบ</a></span>
          </p>
        </form>
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

<style></style>

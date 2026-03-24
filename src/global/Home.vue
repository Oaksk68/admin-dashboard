<template>
    <div class="pt-12 pb-20 relative z-1035">
        <BaseModal v-if="loading">
            <template v-slot:container>
                <div class="">
                    <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                </div>
            </template>
        </BaseModal>
        <header class="mb-16">
            <h1 class="text-primary text-center text-[50px] md:text-[60px]">Lorem <span class="text-origin">ipsum
                    dolor</span></h1>
            <p class="pt-8 text-center md:mx-[324px] text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
        </header>
        <section class="md:block relative md:mt-16 md:pt-16">
            <div id="default-carousel" class="md:hidden relative w-full" data-carousel="static">
                <!-- Carousel wrapper -->
                <div class="relative h-[40rem] overflow-hidden rounded-lg md:h-96 bg-transparent">
                    <!-- Item 1 -->
                    <div class="hidden duration-700 ease-in-out bg-transparent" data-carousel-item>
                        <div
                            class="block p-6 bg-calendarBg rounded-xl absolute w-[80vw] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <div class="text-center text-primary mb-4">
                                <h1 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">L</h1>
                                <p class="text-center font-normal text-sm">เหมาะสำหรับบริษัทขนาดกลาง ที่มี
                                    <br />จำนวนพนักงานไม่เกิน 60
                                    คน
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-xl">
                                <h5 class="text-primary text-[40px] font-bold"><span class="text-lg font-medium">฿
                                    </span>2,400<span class="text-lg font-medium"> /
                                        เดือน</span>
                                </h5>
                                <span class="text-detail">ราคา 25,920 บาท / ปี</span>
                                <ul class="list-disc pl-5">
                                    <li class="text-primary">จำนวนผู้ใช้งานสูงสุด <span class="font-bold">60</span> <span
                                            class="text-detail">คน</span></li>
                                    <li class="text-primary">ราคาต่อผู้ใช้งาน <span class="font-bold">40</span> <span
                                            class="text-detail">บาท/เดือน</span></li>
                                    <li class="text-primary">ส่วนลดต่อปี <span class="font-bold">10%</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Item 2 -->
                    <div class="hidden duration-700 ease-in-out bg-transparent" data-carousel-item>
                        <div
                            class="block w-[80vw] p-6 bg-origin rounded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class="circle-out">
                                <h1 class="text-2xl font-bold text-primary">XL</h1>
                            </div>
                            <div class="recommendation px-[6px] py-[8px]">
                                <svg class="absolute top-0 -left-1.5 -z-10" xmlns="http://www.w3.org/2000/svg" width="26"
                                    height="7" viewBox="0 0 26 7" fill="none">
                                    <path d="M26 0H5.65217L0 7H26V0Z" fill="#DCA736" />
                                </svg>
                                <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="23" height="22"
                                    viewBox="0 0 23 22" fill="none">
                                    <g clip-path="url(#clip0_52_892)">
                                        <path
                                            d="M22.032 8.44585C21.9144 8.0838 21.6015 7.81988 21.2246 7.76514L14.8354 6.83684L11.978 1.04668C11.8095 0.705289 11.4618 0.489113 11.0811 0.489113C10.7003 0.489113 10.3526 0.705289 10.1842 1.04668L7.32694 6.83676L0.937484 7.76505C0.560734 7.8198 0.247621 8.08371 0.130058 8.44577C0.0123668 8.80782 0.110507 9.20537 0.383187 9.47109L5.00658 13.9773L3.91475 20.3416C3.85042 20.7168 4.00464 21.0961 4.31264 21.3198C4.62068 21.5435 5.02888 21.5731 5.36597 21.396L11.0811 18.3915L16.7962 21.396C16.9425 21.4729 17.1023 21.5109 17.2615 21.5109C17.2629 21.5109 17.2644 21.5109 17.2657 21.5109C17.8169 21.5093 18.263 21.0621 18.263 20.5107C18.263 20.4339 18.2544 20.3591 18.238 20.2872L17.1555 13.9774L21.779 9.47117C22.0516 9.20545 22.1497 8.80799 22.032 8.44585Z"
                                            fill="#F2D23D" />
                                        <path
                                            d="M10.1842 1.04668L7.32694 6.83676L0.937484 7.76505C0.560734 7.8198 0.247621 8.08371 0.130058 8.44577C0.0123668 8.80782 0.110507 9.20537 0.383187 9.47109L5.00658 13.9773L3.91475 20.3416C3.85042 20.7168 4.00464 21.0961 4.31264 21.3198C4.62068 21.5435 5.02888 21.5731 5.36597 21.396L11.0811 18.3915V0.489113C10.7003 0.489113 10.3526 0.705289 10.1842 1.04668Z"
                                            fill="#DCA736" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_52_892">
                                            <rect width="22" height="22" fill="white" transform="translate(0.0810547)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div class="text-center text-[#dca736] text-[10px]">
                                    ยอดนิยม
                                </div>
                            </div>
                            <div class="text-center text-primary mb-4 pt-12">
                                <p class="text-center text-white font-normal text-sm">เหมาะสำหรับบริษัทขนาดใหญ่ ที่มี
                                    <br />จำนวนพนักงานไม่เกิน 120 คน
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-xl">
                                <h5 class="text-primary text-[40px] font-bold"><span class="text-lg font-medium">฿
                                    </span>4,680<span class="text-lg font-medium"> /
                                        เดือน</span>
                                </h5>
                                <span class="text-detail">ราคา 50,544 บาท / ปี</span>
                                <ul class="list-disc p-5">
                                    <li class="text-primary">จำนวนผู้ใช้งานสูงสุด <span class="font-bold">120 </span><span
                                            class="text-detail">คน</span></li>
                                    <li class="text-primary">ราคาต่อผู้ใช้งาน <span class="font-bold">39 </span><span
                                            class="text-detail">บาท/เดือน</span></li>
                                    <li class="text-primary">ส่วนลดต่อปี <span class="font-bold">10%</span></li>
                                </ul>
                                <div class="text-center">
                                    <button class="bg-origin text-white p-2 w-full rounded-[1000px]"
                                        @click="onChoosePackage">เลือกแพ็กเกจนี้</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Item 3 -->
                    <div class="hidden duration-700 ease-in-out bg-transparent" data-carousel-item>
                        <div
                            class="block w-[80vw] p-6 bg-calendarBg rounded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class="text-center text-primary mb-4">
                                <h1 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">Extra</h1>
                                <p class="text-center font-normal text-sm">เหมาะสำหรับบริษัท ห้างร้านที่มี
                                    <br />จำนวนพนักงานไม่เกิน 150 คน
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-xl">
                                <h5 class="text-primary text-[40px] font-bold"><span class="text-lg font-medium">฿
                                    </span>5,700<span class="text-lg font-medium"> /
                                        เดือน</span>
                                </h5>
                                <span class="text-detail">ราคา 61,560 บาท / ปี</span>
                                <ul class="list-disc pl-5">
                                    <li class="text-primary">จำนวนผู้ใช้งานสูงสุด <span class="font-bold">150</span> <span
                                            class="text-detail">คน</span></li>
                                    <li class="text-primary">ราคาต่อผู้ใช้งาน <span class="font-bold">38</span> <span
                                            class="text-detail">บาท/เดือน</span></li>
                                    <li class="text-primary">ส่วนลดต่อปี <span class="font-bold">10%</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Item 4 -->
                    <div class="hidden duration-700 ease-in-out bg-transparent" data-carousel-item>
                        <div
                            class="block w-[80vw] p-6 bg-calendarBg rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class="text-center text-primary mb-4">
                                <h1 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">S</h1>
                                <p class="text-center font-normal text-sm">เหมาะสำหรับบริษัท Startup ที่มี
                                    <br />จจำนวนพนักงานไม่เกิน 10 คน
                                </p>
                            </div>
                            <div class="bg-white p-5 rounded-xl">
                                <h5 class="text-primary text-[40px] font-bold"><span class="text-lg font-medium">฿
                                    </span>500<span class="text-lg font-medium"> /
                                        เดือน</span>
                                </h5>
                                <span class="text-detail">ราคา 5,400 บาท / ปี</span>
                                <ul class="list-disc pl-5">
                                    <li class="text-primary">จำนวนผู้ใช้งานสูงสุด <span class="font-bold">10</span> <span
                                            class="text-detail">คน</span></li>
                                    <li class="text-primary">ราคาต่อผู้ใช้งาน <span class="font-bold">50</span> <span
                                            class="text-detail">บาท/เดือน</span></li>
                                    <li class="text-primary">ส่วนลดต่อปี <span class="font-bold">10%</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Slider indicators -->
                <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" class="w-3 h-3 rounded-full slider-indicator" aria-current="true"
                        aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" class="w-3 h-3 rounded-full slider-indicator" aria-current="false"
                        aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" class="w-3 h-3 rounded-full slider-indicator" aria-current="false"
                        aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" class="w-3 h-3 rounded-full slider-indicator" aria-current="false"
                        aria-label="Slide 4" data-carousel-slide-to="3"></button>
                </div>
                <!-- Slider controls -->
                <button type="button"
                    class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-origin/30">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button"
                    class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-origin/30">
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <div class="hidden md:flex md:flex-row-reverse justify-center items-center relative gap-3 z-[55]">
                <div v-for="pkg of filteredPackages" :key="pkg.id" :class="pkg.name === 'L' ? 'order-1' : ''">
                    <div v-if="pkg.id !== 18 && pkg.id !== 23" class="max-w-sm p-6 bg-calendarBg rounded-xl">
                        <div class="text-center text-primary mb-4">
                            <h1 class="mb-2 text-2xl font-bold tracking-tight dark:text-white">{{ pkg.name }}</h1>
                            <p class="text-center font-normal text-sm">เหมาะสำหรับบริษัทขนาดกลาง ที่มี
                                <br />จำนวนพนักงานไม่เกิน {{ pkg.user_qty }} คน
                            </p>
                        </div>
                        <div class="bg-white p-5 rounded-xl">
                            <h5 class="text-primary text-[40px] font-bold"><span class="text-lg font-medium">฿
                                </span>{{ pkg.price_per_month }}<span class="text-lg font-medium"> /
                                    เดือน</span>
                            </h5>
                            <span class="text-detail">ราคา {{ pkg.price_per_year }} บาท / ปี</span>
                            <ul class="list-disc pl-5">
                                <li class="text-primary">จำนวนผู้ใช้งานสูงสุด
                                    <span class="font-bold">{{ pkg.user_qty }} <small
                                            class="font-normal text-detail text-base">คน</small></span>

                                </li>
                                <li class="text-primary">ราคาต่อผู้ใช้งาน <span class="font-bold">{{ pkg.price_per_user
                                }}</span>
                                    <span class="text-detail">บาท/เดือน</span>
                                </li>
                                <li class="text-primary">ส่วนลดต่อปี <span class="font-bold">{{ pkg.discount_per_year
                                }}%</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else-if="pkg.id === 18" class="relative z-10 block max-w-sm p-6 bg-origin rounded-xl">
                        <div class="circle-out">
                            <h1 class="text-2xl font-bold text-primary">XL</h1>
                        </div>
                        <div class="recommendation px-[6px] py-[8px]">
                            <svg class="absolute top-0 -left-1.5 -z-10" xmlns="http://www.w3.org/2000/svg" width="26"
                                height="7" viewBox="0 0 26 7" fill="none">
                                <path d="M26 0H5.65217L0 7H26V0Z" fill="#DCA736" />
                            </svg>
                            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="23" height="22"
                                viewBox="0 0 23 22" fill="none">
                                <g clip-path="url(#clip0_52_892)">
                                    <path
                                        d="M22.032 8.44585C21.9144 8.0838 21.6015 7.81988 21.2246 7.76514L14.8354 6.83684L11.978 1.04668C11.8095 0.705289 11.4618 0.489113 11.0811 0.489113C10.7003 0.489113 10.3526 0.705289 10.1842 1.04668L7.32694 6.83676L0.937484 7.76505C0.560734 7.8198 0.247621 8.08371 0.130058 8.44577C0.0123668 8.80782 0.110507 9.20537 0.383187 9.47109L5.00658 13.9773L3.91475 20.3416C3.85042 20.7168 4.00464 21.0961 4.31264 21.3198C4.62068 21.5435 5.02888 21.5731 5.36597 21.396L11.0811 18.3915L16.7962 21.396C16.9425 21.4729 17.1023 21.5109 17.2615 21.5109C17.2629 21.5109 17.2644 21.5109 17.2657 21.5109C17.8169 21.5093 18.263 21.0621 18.263 20.5107C18.263 20.4339 18.2544 20.3591 18.238 20.2872L17.1555 13.9774L21.779 9.47117C22.0516 9.20545 22.1497 8.80799 22.032 8.44585Z"
                                        fill="#F2D23D" />
                                    <path
                                        d="M10.1842 1.04668L7.32694 6.83676L0.937484 7.76505C0.560734 7.8198 0.247621 8.08371 0.130058 8.44577C0.0123668 8.80782 0.110507 9.20537 0.383187 9.47109L5.00658 13.9773L3.91475 20.3416C3.85042 20.7168 4.00464 21.0961 4.31264 21.3198C4.62068 21.5435 5.02888 21.5731 5.36597 21.396L11.0811 18.3915V0.489113C10.7003 0.489113 10.3526 0.705289 10.1842 1.04668Z"
                                        fill="#DCA736" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_52_892">
                                        <rect width="22" height="22" fill="white" transform="translate(0.0810547)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div class="text-center text-[#dca736] text-[10px]">
                                ยอดนิยม
                            </div>
                        </div>
                        <div class="text-center text-primary mb-4 pt-12">
                            <p class="text-center text-white font-normal text-sm">เหมาะสำหรับบริษัทขนาดใหญ่ ที่มี
                                <br />จำนวนพนักงานไม่เกิน 120 คน
                            </p>
                        </div>
                        <div class="bg-white p-5 rounded-xl">
                            <h5 class="text-primary text-[40px] font-bold"><span class="text-lg font-medium">฿
                                </span>4,680<span class="text-lg font-medium"> /
                                    เดือน</span>
                            </h5>
                            <span class="text-detail">ราคา 50,544 บาท / ปี</span>
                            <ul class="list-disc p-5">
                                <li class="text-primary">จำนวนผู้ใช้งานสูงสุด <span class="font-bold">120 </span><span
                                        class="text-detail">คน</span></li>
                                <li class="text-primary">ราคาต่อผู้ใช้งาน <span class="font-bold">39 </span><span
                                        class="text-detail">บาท/เดือน</span></li>
                                <li class="text-primary">ส่วนลดต่อปี <span class="font-bold">10%</span></li>
                            </ul>
                            <div class="text-center">
                                <button class="bg-origin text-white p-2 w-full rounded-[1000px]"
                                    @click="onChoosePackage">เลือกแพ็กเกจนี้</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useStore, mapGetters } from 'vuex';
import { useRouter } from 'vue-router';
import { initFlowbite } from 'flowbite';
import $ from 'jquery';


const app_lang = localStorage.getItem("appLanguage") || 'th'
const store = useStore()
const router = useRouter()
const available_packages = ref('')
const packages = ref('');
const loading = ref(true);
const color = 'red';

function onChoosePackage() {
    router.push({ name: 'SubmitPackage', query: { package_id: 18 } })
}

const filteredPackages = computed(() => {
    return Array.isArray(packages.value) ? packages.value.filter(pkg => pkg.id != 23) : [];
})

onMounted(async () => {
    initFlowbite();
    packages.value = await store.dispatch('fetchPackages');
})


</script>
<style scoped>
ul {
    @apply pl-5 pt-[24px];

    li {
        @apply text-primary text-sm pb-[12px];

        span {
            @apply text-[16px];
        }
    }
}

li::marker {
    color: #36a1ea;
}

div.circle-out {
    border: 6px solid #36a1ea;
    position: absolute;
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
    border-radius: 100%;
}


div.circle-out h1 {
    background-color: #ffffff;
    font-size: 40px;
    border-radius: 100%;
    padding: 10px;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.recommendation {
    width: 52px;
    height: 56px;
    background-color: #FFE671;
    position: absolute;
    right: 16px;
    top: -7px;
    border-radius: 0 0 8px 8px;
}

button.slider-indicator {
    background: #E7F0FC !important;
}

button.slider-indicator[aria-current="true"] {
    background: #36a1ea !important;
}
</style>
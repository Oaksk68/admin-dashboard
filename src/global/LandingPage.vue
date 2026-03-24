<template>
    <div>
        <div class="relative z-50 min-h-screen">
            <nav class="flex justify-between items-center py-4 px-5 md:px-[120px] z-40">
                <div class="flex items-center gap-2 md:gap-10">
                    <font-awesome-icon @click="openSidebar" size="xl" color="#1a3c54" icon="fa-solid fa-bars cursor-pointer"
                        class="md:hidden p-2" />
                    <img src="@/assets/images/Onela_Logo.svg" alt="onela_logo" />
                    <div class="nav-link-container p-3 pt-8 md:p-0" :class="{ 'sidebar-open': sidebarState }">
                        <font-awesome-icon id="xMark" icon="fa-solid fa-xmark"
                            class="md:hidden absolute right-5 border p-2 text-origin rounded-[1000px]"
                            @click="closeSidebar" />
                        <img class="md:hidden pb-6" src="@/assets/images/Onela_Logo.svg" alt="onela_logo" />
                        <ul class="nav-links md:flex gap-8">
                            <li class="">
                                <RouterLink @click="closeSidebar" :to="{ name: 'Home' }">หน้าแรก</RouterLink>
                            </li>
                            <li class="text-primary">
                                <RouterLink @click="closeSidebar" :to="{ name: 'SubmitPackage' }">ใบเสนอราคา</RouterLink>
                            </li>
                            <li class="text-primary">
                                <RouterLink @click="closeSidebar" :to="{ name: 'Login' }">เข้าสู่ระบบ</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="">
                    <LanguageSwitcher></LanguageSwitcher>
                </div>
            </nav>
            <hr />
            <section id=" main" class="relative min-h-[93vh]">
                <svg class="absolute md:top-2 md:z-0 z-[-1] -left-20 md:left-0 opacity-1 md:opacity-60"
                    xmlns="http://www.w3.org/2000/svg" width="273" height="392" viewBox="0 0 273 392" fill="none">
                    <path
                        d="M163.079 346.247C337.237 244.278 285.165 46.1978 134.814 4.7217C-73.1516 -52.6528 -200.14 558.908 163.079 346.247Z"
                        fill="#E7F4FB" />
                </svg>
                <svg class="absolute md:top-14 md:left-52 z-[9] left-16" xmlns="http://www.w3.org/2000/svg" width="60"
                    height="51" viewBox="0 0 60 51" fill="none">
                    <g style="mix-blend-mode:multiply">
                        <path
                            d="M45.4415 1.93265H17.5798L3.64893 26.0604L17.5798 50.1903H45.4415L59.3723 26.0604L45.4415 1.93265Z"
                            fill="#AAB5CA" />
                    </g>
                    <path d="M41.7925 0H13.9308L0 24.1298L13.9308 48.2576H41.7925L55.7234 24.1298L41.7925 0Z"
                        fill="#C5DCFA" />
                    <path
                        d="M27.8618 27.0854C31.6155 27.0854 34.6584 23.2749 34.6584 18.5745C34.6584 13.874 31.6155 10.0635 27.8618 10.0635C24.1081 10.0635 21.0652 13.874 21.0652 18.5745C21.0652 23.2749 24.1081 27.0854 27.8618 27.0854Z"
                        fill="white" />
                    <path
                        d="M27.8617 28.266C20.7133 28.266 14.9194 35.3052 14.9194 43.988C14.9194 44.7501 14.9659 45.4981 15.0529 46.232H40.6726C40.7595 45.4981 40.806 44.7501 40.806 43.988C40.806 35.3052 35.0121 28.266 27.8617 28.266Z"
                        fill="white" />
                </svg>
                <svg class="block hour-glass absolute md:top-10 md:right-24 md:z-[51] z-[9] right-0 top-64" width="263"
                    height="319" viewBox="0 0 263 319" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.6">
                        <path
                            d="M139.346 156.288C179.235 153.34 214.385 128.982 231.151 92.6668L241.11 71.0969L127.08 18.4514L117.122 40.0213C100.356 76.3361 104.611 118.888 128.242 151.161C129.663 153.103 129.919 155.661 128.911 157.845L128.36 159.039C127.351 161.223 125.238 162.688 122.839 162.866C82.9505 165.813 47.7997 190.172 31.0338 226.487L21.0753 248.057L135.105 300.702L145.063 279.132C161.829 242.817 157.571 200.264 133.943 167.992C132.522 166.051 132.266 163.493 133.275 161.308L133.826 160.115C134.834 157.93 136.947 156.466 139.346 156.288Z"
                            fill="white" />
                        <path
                            d="M152.347 80.9312C197.102 81.8306 215.1 111.445 198.806 126.365C181.498 137.366 173.166 131.637 173.166 131.637L144.309 92.907L152.345 80.9341L152.347 80.9312Z"
                            fill="#3A5796" />
                        <path
                            d="M257.7 65.4229L120.641 2.14517C118.075 0.960427 115.034 2.08027 113.85 4.64642L112.888 6.72939C111.703 9.29554 112.823 12.3362 115.389 13.521L252.448 76.7987C255.014 77.9834 258.055 76.8636 259.24 74.2974L260.201 72.2145C261.386 69.6483 260.266 66.6076 257.7 65.4229Z"
                            fill="#3A5796" />
                        <path
                            d="M146.957 305.291L9.89837 242.013C7.33223 240.828 4.29153 241.948 3.10679 244.514L2.14512 246.597C0.960371 249.164 2.08021 252.204 4.64636 253.389L141.705 316.667C144.271 317.851 147.312 316.732 148.497 314.165L149.458 312.082C150.643 309.516 149.523 306.476 146.957 305.291Z"
                            fill="#3A5796" />
                        <path
                            d="M31.7212 248.899L127.41 293.077C88.0159 258.656 113.771 198.792 127.73 169.711L135.283 153.351C135.912 151.987 137.204 151.009 138.7 150.867C138.78 150.857 138.862 150.851 138.945 150.846C161.359 149.189 182.213 140.404 198.806 126.365C191.148 127.992 164.894 115.585 165.552 83.5776C166.213 51.5717 138.268 33.9672 122.075 42.3084C106.149 76.8059 110.198 117.279 132.645 147.938L132.66 147.959C133.548 149.18 133.632 150.811 132.999 152.181L125.402 168.636L125.408 168.639C112.327 198.125 83.468 256.556 31.7182 248.897L31.7212 248.899Z"
                            fill="#5777BA" />
                    </g>
                </svg>
                <div class="w-[7px] h-[7px] z-10 bg-[#f47862] absolute right-[22rem]"></div>
                <div class="w-[7px] h-[7px] z-20 bg-[#f47862] absolute left-[20rem] top-[18rem]"></div>
                <svg class="md:block calendar-image absolute md:z-[51] bottom-[10.75rem] z-[9] md:left-2 left-[-2rem] md:opacity-60"
                    xmlns="http://www.w3.org/2000/svg" width="228" height="198" viewBox="0 0 228 198" fill="none">
                    <g opacity="0.6">
                        <path
                            d="M162.256 143.616L131.187 27.1746L2.98315 61.3819L34.0521 177.823C36.9934 188.847 48.3149 195.399 59.3385 192.458L187.542 158.25C176.519 161.192 165.197 154.639 162.256 143.616Z"
                            fill="#A3C6DB" />
                        <path
                            d="M172.994 140.751L141.925 24.3094L13.7214 58.5167L44.7903 174.958C47.7316 185.982 59.0532 192.534 70.0767 189.593L198.28 155.385C187.257 158.327 175.935 151.774 172.994 140.751Z"
                            fill="#F1FAFF" />
                        <g style="mix-blend-mode:multiply">
                            <path d="M123.785 94.4541L108.027 98.6587L112.231 114.417L127.989 110.212L123.785 94.4541Z"
                                fill="#AAB5CA" />
                        </g>
                        <path d="M151.303 87.1116L135.545 91.3162L139.75 107.074L155.508 102.87L151.303 87.1116Z"
                            fill="#DCA736" />
                        <g style="mix-blend-mode:multiply">
                            <path d="M69.4152 108.961L53.657 113.166L57.8616 128.924L73.6198 124.719L69.4152 108.961Z"
                                fill="#AAB5CA" />
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M96.9357 101.618L81.1775 105.823L85.3821 121.581L101.14 117.376L96.9357 101.618Z"
                                fill="#AAB5CA" />
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M132.918 128.686L117.16 132.89L121.365 148.649L137.123 144.444L132.918 128.686Z"
                                fill="#AAB5CA" />
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M160.437 121.343L144.679 125.548L148.883 141.306L164.641 137.102L160.437 121.343Z"
                                fill="#AAB5CA" />
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M78.5487 143.193L62.7905 147.397L66.9951 163.156L82.7533 158.951L78.5487 143.193Z"
                                fill="#AAB5CA" />
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M106.069 135.85L90.3113 140.054L94.5159 155.813L110.274 151.608L106.069 135.85Z"
                                fill="#AAB5CA" />
                        </g>
                        <path
                            d="M94.2047 162.618C97.0303 173.208 90.7365 184.083 80.1464 186.908L208.35 152.701C218.94 149.875 225.234 139 222.408 128.41L94.2047 162.618Z"
                            fill="#DAEAF4" />
                        <path d="M151.994 21.6227L23.7905 55.8301L29.7708 78.2433L157.975 44.0359L151.994 21.6227Z"
                            fill="#DCA736" />
                        <path
                            d="M60.6366 50.4522L54.5656 52.0721C53.4132 52.3796 52.7283 53.5631 53.0357 54.7154L54.6556 60.7865C54.9631 61.9388 56.1465 62.6238 57.2989 62.3163L63.37 60.6964C64.5223 60.3889 65.2073 59.2055 64.8998 58.0531L63.2799 51.9821C62.9724 50.8297 61.789 50.1448 60.6366 50.4522Z"
                            fill="#D15B47" />
                        <path
                            d="M55.2172 35.4705L48.9125 37.1527C42.9897 38.733 39.4575 44.8362 41.0378 50.759L44.3934 49.8637C43.3069 45.7916 45.7364 41.597 49.8062 40.5111L56.1108 38.8289C60.1829 37.7424 64.3775 40.172 65.4634 44.2418L65.4988 44.3743C66.5853 48.4463 64.1557 52.641 60.0859 53.7269L58.3789 54.1823C57.4513 54.4298 56.9013 55.3802 57.1488 56.3078C57.3963 57.2354 58.3467 57.7854 59.2743 57.5379L60.9813 57.0824C66.9018 55.5027 70.4363 49.3989 68.856 43.4761L68.8207 43.3436C67.2403 37.4208 61.1371 33.8885 55.2143 35.4688L55.2172 35.4705Z"
                            fill="#99BCEB" />
                        <path
                            d="M115.006 35.9453L108.935 37.5651C107.783 37.8726 107.098 39.0561 107.405 40.2084L109.025 46.2795C109.333 47.4319 110.516 48.1168 111.669 47.8093L117.74 46.1894C118.892 45.882 119.577 44.6985 119.269 43.5461L117.65 37.4751C117.342 36.3227 116.159 35.6378 115.006 35.9453Z"
                            fill="#D15B47" />
                        <path
                            d="M109.585 20.9641L103.28 22.6463C97.3596 24.226 93.8251 30.3299 95.4055 36.2527L98.761 35.3573C97.6745 31.2853 100.104 27.0906 104.174 26.0047L110.479 24.3225C114.551 23.236 118.745 25.6656 119.831 29.7354L119.866 29.8679C120.953 33.94 118.523 38.1346 114.454 39.2205L112.747 39.6759C111.819 39.9235 111.269 40.8738 111.516 41.8014C111.764 42.729 112.714 43.279 113.642 43.0315L115.349 42.5761C121.269 40.9963 124.804 34.8925 123.224 28.9697L123.188 28.8372C121.608 22.9144 115.505 19.3821 109.582 20.9625L109.585 20.9641Z"
                            fill="#99BCEB" />
                        <g style="mix-blend-mode:multiply">
                            <path d="M116.442 66.9334L100.683 71.138L104.888 86.8962L120.646 82.6915L116.442 66.9334Z"
                                fill="#AAB5CA" />
                        </g>
                        <g style="mix-blend-mode:multiply">
                            <path d="M143.96 59.5909L128.202 63.7955L132.407 79.5537L148.165 75.3491L143.96 59.5909Z"
                                fill="#AAB5CA" />
                        </g>
                    </g>
                </svg>
                <div class="hidden md:block absolute z-[51] right-0 bottom-0 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="324" height="241" viewBox="0 0 324 241" fill="none">
                        <path
                            d="M201.883 0.0105143C0.072508 1.23933 -53.8711 198.818 55.5983 309.913C207.015 463.583 622.77 -2.55009 201.883 0.0105143Z"
                            fill="#E7F4FB" />
                    </svg>
                </div>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>
<script setup>
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery'

const store = useStore();
const sidebarState = ref(false);
const loading = ref(false);
const color = "#36A1EA";
const size = "20px";


function openSidebar() {
    sidebarState.value = true;
    console.log(sidebarState.value);
}

function closeSidebar() {
    sidebarState.value = false;
    console.log(sidebarState.value);
}

onMounted(() => {
    // store.dispatch('fetchPackages');
    console.log(loading.value)
})

</script>
<style scoped>
li a {
    color: #8A99A4;
    position: relative;
}

li a.router-link-active {
    color: #1a3c54;
    position: relative;
}


li a::after {
    content: '';
    color: #1a3c54;
    display: inline-block;
    background: #36a1ea;
    height: 4px;
    width: 100%;
    position: absolute;
    border-radius: 1000px;
    left: 0;
    bottom: -24px;
    opacity: 0;
    transition: all 0.1s ease-in;
    pointer-events: none;
}

li a:hover::after,
li a.router-link-active::after {
    color: #1a3c54 !important;
    opacity: 1;
}

@media only screen and (max-width: 768px) {
    nav div.nav-link-container {
        background-color: #fcfcfc;
        position: absolute;
        height: 100svh;
        z-index: 9999;
        top: 0;
        width: 100vw;
        left: -800px;
        transition: all 0.3s ease-in-out;
    }

    .sidebar-open {
        transform: translateX(800px);
    }

    nav div.nav-link-container ul.nav-links li {
        padding: 10px;

    }

    li a.router-link-active {
        color: #ffffff !important;
    }

    li:has(a.router-link-active) {
        background-color: #36a1ea;
    }


    nav div.nav-link-container ul.nav-links li a::after {
        display: none;
    }

}
</style>
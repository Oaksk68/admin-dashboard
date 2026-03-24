<template>
    <TransitionRoot :show="companyProfileIsOpen" as="template">
        <Dialog as="div" class="relative z-50">
            <div @click="$emit('closeModal')" class="fixed inset-0 bg-black/30">
                <div class="fixed inset-0 w-screen overflow-y-auto text-primary">
                    <div class="flex justify-center items-center p-4">
                        <TransitionChild class="w-full md:w-auto" enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel id="company__profile__modal"
                                class="relative w-full md:w-[40vw] rounded-xl bg-white p-4 mb-4 md:mb-0">
                                <DialogTitle>
                                    <h1 class="text-primary text-2xl text-center p-4">
                                        ผู้ใช้งาน
                                    </h1>
                                </DialogTitle>
                                <div class="">
                                    <div class="absolute top-2 right-3 bg-[#F5666680] px-2 rounded-full cursor-pointer">
                                        <font-awesome-icon @click="$emit('closeModal')" class="text-white mx-auto"
                                            :icon="['fas', 'x']" size="2xs" />
                                    </div>
                                    <div class="flex gap-3 md:block">
                                        <img class="object-fit w-32 h-32 md:h-40 md:w-40 mx-auto"
                                            :src="`${$img_path}${companyProfileInfo?.logo}`" alt="" />
                                        <div class="grid md:hidden gap-3 text-primary text-sm">
                                            <div class="grid w-full">
                                                <span class="md:w-40 font-medium">{{
                                                    $t("companyName")
                                                }}</span>
                                                <span v-if="!companyProfileInfo.company_name"
                                                    class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.company_name }}
                                                </span>
                                            </div>
                                            <div class="grid w-full">
                                                <span class="md:w-40 font-medium">{{
                                                    $t("payersIdNumber")
                                                }}</span>
                                                <span v-if="!companyProfileInfo.tax_id" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.tax_id }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="md:px-8 overflow-auto">
                                        <div class="my-10 md:px-8 w-full grid gap-4 text-primary text-sm">
                                            <div class="hidden md:flex w-full">
                                                <span class="w-60 font-medium">{{
                                                    $t("companyName")
                                                }}</span>
                                                <span v-if="!companyProfileInfo.company_name"
                                                    class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.company_name }}
                                                </span>
                                            </div>
                                            <div class="hidden md:flex w-full">
                                                <span class="w-60 font-medium">{{
                                                    $t("payersIdNumber")
                                                }}</span>
                                                <span v-if="!companyProfileInfo.tax_id" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.tax_id }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("branch") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.branch" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.branch }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("accountOwner") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.user.firstname ||
                                                    !companyProfileInfo.user.lastname
                                                    " class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.user.title.title }}
                                                    {{ companyProfileInfo.user.firstname }}
                                                    {{ companyProfileInfo.user.lastname }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("email") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.user.email" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.user.email }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("phone") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.user.phone" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.user.phone }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("website") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.website" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.website }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("companycode") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.company_code"
                                                    class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.company_code }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("enterpriseLevel") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.companylevels_count"
                                                    class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.companylevels_count }} ระดับ
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("holiday") }}
                                                </span>

                                                <span v-if="!companyProfileInfo.holidays_count"
                                                    class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.holidays_count }} รวม (วัน)
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("lineCode") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.line_group" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.line_group }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("regDate") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.created_at" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{
                                                        this.$moment(companyProfileInfo.created_at).format(
                                                            "DD/MM/YYYY"
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("status") }}
                                                </span>
                                                <div v-if="companyProfileInfo.active === 1" class="flex items-center gap-2">
                                                    <p class="bg-[#3FACA9] w-4 h-4 rounded-full"></p>
                                                    <span class="text-[#3FACA9] font-normal">ใช้งาน</span>
                                                </div>
                                                <div v-else class="flex items-center gap-2">
                                                    <p class="bg-h1mute w-4 h-4 rounded-full"></p>
                                                    <span class="text-h1mute font-normal">ปิด</span>
                                                </div>
                                            </div>
                                            <div class="grid md:flex md:items-center w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("allowEmployeeToReg") }}
                                                </span>
                                                <div class="flex gap-2">
                                                    <Toggle class="cursor-not-allowed"
                                                        :value="companyProfileInfo.open_register_status" disabled>
                                                    </Toggle>
                                                    <span class="text-muted">ไม่ใช้งาน</span>
                                                </div>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">NFC</span>
                                                <span class="text-[#3FACA9] font-normal">0 card</span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("editDate") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.updated_at" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{
                                                        this.$moment(companyProfileInfo.updated_at).format(
                                                            "DD/MM/YYYY"
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">
                                                    {{ $t("lastAccess") }}
                                                </span>
                                                <span v-if="!companyProfileInfo.last_access" class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{
                                                        this.$moment(companyProfileInfo.last_access).format(
                                                            "DD/MM/YYYY"
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="w-60 font-medium">อุณหภูมิที่แจ้งเตือน</span>
                                                <span v-if="!companyProfileInfo.temp_to_notify"
                                                    class="text-muted font-normal">
                                                    --
                                                </span>
                                                <span v-else class="text-muted font-normal">
                                                    {{ companyProfileInfo.temp_to_notify }} ℃
                                                </span>
                                            </div>
                                            <div class="grid gap-3">
                                                <span class="w-60 font-medium">
                                                    {{ $t("yourPackage") }}
                                                </span>
                                                <div v-for="pack in companyProfileInfo.packages" :key="pack.id"
                                                    class="box md:w-1/2 rounded-2xl px-4 py-8 md:p-4 mx-3 md:mx-0">
                                                    <div class="grid gap-4 justify-center justify-items-center">
                                                        <span class="px-4 py-2 bg-lime-400 rounded-lg">กำลังใช้งาน</span>
                                                        <h1 class="font-medium text-2xl">
                                                            Size {{ pack.name }}
                                                        </h1>
                                                        <h1 class="font-semibold text-4xl text-origin">
                                                            {{ pack.price }}
                                                        </h1>
                                                    </div>
                                                    <div class="mt-4 grid justify-center items-center gap-4">
                                                        <p>บาท / ผู้ใช้งาน / เดือน</p>
                                                        <p>
                                                            ผู้ใช้งานทั้งหมด :
                                                            <span class="text-h1mute">{{
                                                                pack.user_qty
                                                            }}</span>
                                                        </p>
                                                    </div>
                                                    <hr
                                                        class="flex justify-center items-center w-full my-4 bg-calendarBg" />
                                                    <div class="text-sm grid gap-2">
                                                        <h1 class="text-center md:text-lg font-medium">
                                                            กำหนดชำระ
                                                        </h1>
                                                        <h1>
                                                            อายุการใช้งาน :
                                                            <span class="text-h1mute">{{ pack.num_of_period }}
                                                                {{ pack.period }}</span>
                                                        </h1>
                                                        <h1>
                                                            บิลถัดไปของคุณคือ :
                                                            <span class="text-h1mute">{{
                                                                this.$moment(pack.pivot.package_end).format(
                                                                    "DD/MM/YYYY"
                                                                )
                                                            }}</span>
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button @click="$emit('closeModal')"
                                        class="w-1/4 py-2 !ring-red-400 border border-red-400 text-red-400 rounded-xl duration-300 hover:bg-red-400 hover:text-white">
                                        {{ $t("close") }}
                                    </button>
                                </div>
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
    TransitionChild,
    TransitionRoot,
    Dialog,
    DialogTitle,
    DialogPanel,
} from "@headlessui/vue";
import Toggle from "@/components/Toggle.vue";

export default {
    props: ["companyProfileIsOpen", "companyProfileInfo"],
    components: {
        TransitionChild,
        TransitionRoot,
        Dialog,
        DialogTitle,
        DialogPanel,
        Toggle,
    },
    data() {
        return {
            toggleData: false,
        };
    },
};
</script>

<style scoped></style>

<template>
    <div>
        <TransitionRoot :show="accOwnerIsOpen" as="template">
            <Dialog as="div" class="relative z-50">
                <div class="fixed inset-0 bg-black/30">
                    <div class="fixed inset-0 w-screen text-primary overflow-y-auto">
                        <div @click="$emit('closeModal')" class="flex min-h-full justify-center items-center p-4">
                            <TransitionChild class="w-full md:w-auto" enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95">
                                <DialogPanel id="acc__owner__modal" class="relative md:w-[50vw] rounded-xl bg-white p-4">
                                    <DialogTitle class="text-2xl text-center p-4 text-primary">ผู้ใช้งาน</DialogTitle>
                                    <div>
                                        <div class="absolute top-2 right-3 bg-[#F5666680] px-2 rounded-full">
                                            <font-awesome-icon @click="$emit('closeModal')"
                                                class="text-white cursor-pointer  mx-auto" :icon="['fas', 'x']"
                                                size="2xs" />
                                        </div>
                                        <div class="flex md:block gap-3 text-primary text-sm">
                                            <img class="object-fit w-32 h-32 md:h-40 md:w-40 mx-auto rounded-xl border border-slate-200 shadow-sm"
                                                :src="`${$img_path}${userProfileInfo.image}`" alt="" />
                                            <div class="grid gap-3">
                                                <div class="grid md:hidden w-full">
                                                    <span class="md:w-40 font-medium">{{
                                                        $t("employeeName")
                                                    }}</span>
                                                    <span class="text-muted font-normal">นาย บุญลือ หอมหมื่นลี้</span>
                                                </div>
                                                <div class="grid md:hidden w-full">
                                                    <span class="md:w-40 font-medium">{{ $t("username") }}</span>
                                                    <span v-if="!userProfileInfo.username"
                                                        class="text-muted font-normal">--</span>
                                                    <span v-else class="text-muted font-normal">{{ userProfileInfo.username
                                                    }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="my-10 md:px-8 w-full grid md:justify-center gap-4 text-primary text-sm">
                                            <div class="hidden md:flex w-full">
                                                <span class="md:w-40 font-medium">{{ $t("name") }}</span>
                                                <span v-if="!userProfileInfo.username"
                                                    class="text-muted font-normal">--</span>
                                                <span v-else class="text-muted font-normal">{{ userProfileInfo.title.title
                                                }}
                                                    {{ userProfileInfo.firstname }} {{ userProfileInfo.lastname }}</span>
                                            </div>
                                            <div class="hidden md:flex w-full">
                                                <span class="md:w-40 font-medium">{{ $t("username") }}</span>
                                                <span v-if="!userProfileInfo.username"
                                                    class="text-muted font-normal">--</span>

                                                <span class="text-muted font-normal">{{ userProfileInfo.username }}</span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium"> {{ $t("email") }} </span>
                                                <span v-if="!userProfileInfo.email" class="text-muted font-normal">--</span>
                                                <span class="text-muted font-normal">{{ userProfileInfo.email }}</span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium"> {{ $t("phone") }} </span>
                                                <span v-if="!userProfileInfo.phone" class="text-muted font-normal">--</span>
                                                <span class="text-muted font-normal">{{ userProfileInfo.phone }}</span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium">
                                                    {{ $t("birthday") }}
                                                </span>
                                                <span v-if="!userProfileInfo.birthdate"
                                                    class="text-muted font-normal">--</span>
                                                <span class="text-muted font-normal">{{
                                                    this.$moment(userProfileInfo.birthdate).format("DD/MM/YYYY")
                                                }}</span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium"> {{ $t("status") }} </span>
                                                <div v-if="userProfileInfo.status === 1" class="flex items-center gap-2">
                                                    <span class="w-4 h-4 bg-lime-300 rounded-full"></span>
                                                    <span class="text-muted font-normal">ใช้งาน</span>
                                                </div>
                                                <div v-else class="flex items-center gap-2">
                                                    <span class="w-4 h-4 bg-h1mute rounded-full"></span>
                                                    <span class="text-h1mute font-normal"></span>
                                                </div>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium">
                                                    {{ $t("confirm") }}{{ $t("email") }}
                                                </span>
                                                <div v-if="!!userProfileInfo.email_verified_at"
                                                    class="flex items-center gap-2">
                                                    <span class="w-4 h-4 bg-lime-300 rounded-full"></span>
                                                    <span class="text-muted font-normal">ยืนยันแล้ว</span>
                                                </div>
                                                <div v-else class="flex items-center gap-2">
                                                    <span class="w-4 h-4 bg-h1mute rounded-full"></span>
                                                    <span class="text-h1mute font-normal">ยันไม่ได้ยืนยัน</span>
                                                </div>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium"> {{ $t('role') }} </span>
                                                <span v-if="!userProfileInfo.role" class="text-muted font-normal">--</span>
                                                <span class="text-muted font-normal">{{ userProfileInfo.role }}</span>
                                            </div>
                                            <div class="grid md:flex w-full">
                                                <span class="md:w-40 font-medium">
                                                    {{ $t("company") }}
                                                </span>
                                                <div @click="$emit('showCompanyProfile', userProfileInfo.id)"
                                                    class="text-origin font-normal cursor-pointer">
                                                    {{ userProfileInfo.company_name }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button @click="$emit('closeModal')"
                                            class="w-1/4 py-2 border border-red-400 text-red-400 rounded-xl duration-300 hover:bg-red-400 hover:text-white">
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
    </div>
</template>

<script>
import {
    TransitionChild,
    TransitionRoot,
    Dialog,
    DialogTitle,
    DialogPanel,
} from "@headlessui/vue";

export default {
    name: "Account Owner Modal",
    props: ['accOwnerIsOpen', 'userProfileInfo'],
    components: {
        TransitionChild,
        TransitionRoot,
        Dialog,
        DialogTitle,
        DialogPanel,
    },
};
</script>

<style lang="scss" scoped></style>

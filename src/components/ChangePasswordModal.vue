<template>
    <div>
        <TransitionRoot :show="isOpen" as="template">
            <Dialog as="div" class="relative z-50">
                <div class="fixed inset-0 bg-black/30" aria-hidden="true">
                    <div class="fixed inset-0 w-screen overflow-y-auto text-primary">
                        <div @click="this.closeModal" class="flex min-h-full justify-center items-center p-4">
                            <TransitionChild class="md:w-[45vw] w-full" enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95">
                                <DialogPanel class="relative w-full rounded-xl bg-white p-4">
                                    <DialogTitle class="text-2xl text-center p-4 text-primary">
                                        <h1 class="text-center text-2xl text-primary">เปลี่ยนรหัสผ่าน</h1>
                                    </DialogTitle>
                                    <div class="">
                                        <form class="grid justify-center items-center gap-4">
                                            <div class="w-[22rem]">
                                                <label class="block text-primary font-normal mb-1 md:mb-0 pr-4"
                                                    for="currentPassword">
                                                    รหัสผ่านปัจจุบัน
                                                </label>
                                                <input id="currentPassword" type="password"
                                                    :class="$errorBorder('old_password')"
                                                    class="border w-full rounded-xl py-3 md:py-2 pr-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                                                    v-model="pwdForm.old_password" placeholder="รหัสผ่านปัจจุบัน"
                                                    :disabled="loading" required />
                                                <small>{{ errors.old_password }}</small>
                                            </div>
                                            <div class="w-[22rem]">
                                                <label class="block text-primary font-normal mb-1 md:mb-0 pr-4"
                                                    for="newPass">
                                                    รหัสผ่านใหม่
                                                </label>
                                                <input id="newPass" type="password" :class="$errorBorder('password')"
                                                    class="border w-full rounded-xl py-3 md:py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                                                    v-model="pwdForm.password" placeholder="รหัสผ่านใหม่"
                                                    :disabled="loading" required />
                                                <small>{{ errors.password }}</small>
                                            </div>
                                            <div class="w-[22rem]">
                                                <label class="block text-primary font-normal mb-1 md:mb-0 pr-4"
                                                    for="confNewPass">
                                                    ยืนยันรหัสผ่านใหม่
                                                </label>
                                                <input id="confNewPass" type="password"
                                                    :class="$errorBorder('password_confirmation')"
                                                    class="border w-full rounded-xl py-3 md:py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                                                    v-model="pwdForm.password_confirmation" placeholder="ยืนยันรหัสผ่านใหม่"
                                                    :disabled="loading" required />
                                                <small>{{ errors.password_confirmation }}</small>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="footer mt-8 mb-4">
                                        <div class="my-4 flex justify-around">
                                            <button @click="closeModal"
                                                class="w-1/3 border border-danger text-danger font-normal py-2 rounded-2xl hover:bg-danger hover:text-white transition-all duration-500"
                                                type="button">
                                                ยกเลิก
                                            </button>
                                            <button @click="chgPwd"
                                                class="shadow w-1/3 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-2xl"
                                                type="button">
                                                แก้ไข
                                            </button>
                                        </div>
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
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";

let pwdFormTemplate = {
    old_password: "",
    password: "",
    password_confirmation: "",
}

export default {
    name: 'ResetPasswordModal',
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    },
    data() {
        return {
            loading: false,
            isOpen: false,
            pwdForm: { ...pwdFormTemplate },
            errors: {},
        }
    },
    methods: {
        openModal() {
            this.isOpen = true
        },
        closeModal() {
            this.isOpen = false
            this.pwdForm = { ...pwdFormTemplate }
            this.errors = {}
        },
        chgPwd() {
            this.axios
                .post("change-password", this.pwdForm)
                .then((res) => {
                    if (res.data.success) {
                        this.$swal({
                            icon: "success",
                            title: "Success",
                            text: res.data.message,
                        });
                    } else {
                        this.$validateMsg(res.data.message)
                        console.log(this.errors);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        // this.openModal()
    }
}
</script>
<style scoped></style>
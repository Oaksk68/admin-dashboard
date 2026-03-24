<template>
    <BaseModal :isOpen="employeeProfile" :classList="'md:w-[40vw]'">
        <template #title>{{ $t("employee") }}</template>
        <template #container>
            <div class="">
                <div class="absolute top-2 right-3">
                    <font-awesome-icon @click="$emit('closeModal')"
                        class="text-red-400 cursor-pointer duration-300 hover:text-red-300" icon="fa-solid fa-circle-xmark"
                        size="xl" />
                </div>
                <div class="flex px-5 gap-3 md:px-0">
                    <img class="object-fit h-32 w-32 md:h-40 md:w-40 md:mx-auto" :src="`${$img_path}${employeeData.image}`"
                        alt="" />
                    <div class="grid text-sm md:hidden text-primary">
                        <div class="grid w-full">
                            <span class="font-medium">{{ $t("employeeName") }}</span>
                            <span class="text-muted font-normal"> {{ employeeData.title }}
                                {{ employeeData.firstname }} {{ employeeData.lastname }} </span>
                        </div>
                        <div class="grid w-full">
                            <span class="font-medium">{{ $t("username") }}</span>
                            <span class="text-muted font-normal"> {{ employeeData.username }} </span>
                        </div>
                    </div>
                </div>
                <div class="my-10 w-full grid gap-4 text-primary text-sm px-16">
                    <div class="hidden md:flex">
                        <span class="md:w-40 font-medium">{{ $t("employeeName") }}</span>
                        <span class="text-muted font-normal capitalize">{{ employeeData.title }}
                            {{ employeeData.firstname }} {{ employeeData.lastname }} </span>
                    </div>
                    <div class="hidden md:flex w-full">
                        <span class="md:w-40 font-medium">{{ $t("username") }}</span>
                        <span class="text-muted font-normal"> {{ employeeData.username }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("birthday") }}
                        </span>
                        <span v-if="employeeData.birthdate" class="text-muted font-normal"> {{
                            employeeData.birthdate }} </span>
                        <span v-else class="text-muted">-</span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("location") }}
                        </span>
                        <span class="text-muted font-normal">เชียงราย</span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium"> {{ $t("phone") }} </span>
                        <span class="text-muted font-normal"> {{ employeeData.phone }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium"> {{ $t("email") }} </span>
                        <span class="text-muted font-normal"> {{ employeeData.email }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("emailConfirm") }}
                        </span>
                        <div v-if="employeeData.email_verified_at" class="flex items-center gap-2">
                            <p class="bg-lime-300 w-4 h-4 rounded-full"></p>
                            <span class="text-muted font-normal">ยืนยันแล้ว</span>
                        </div>
                        <div v-else class="flex items-center gap-2">
                            <p class="bg-red-500 w-4 h-4 rounded-full"></p>
                            <span class="text-muted font-normal">ยังไม่ได้ยืนยัน</span>
                        </div>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium"> {{ $t("status") }} </span>
                        <div v-if="employeeData.status == 1" class="flex items-center gap-2">
                            <p class="bg-lime-300 w-4 h-4 rounded-full"></p>
                            <span class="text-muted font-normal">ใช้งาน</span>
                        </div>
                        <div v-else class="flex items-center gap-2">
                            <p class="bg-red-500 w-4 h-4 rounded-full"></p>
                            <span class="text-muted font-normal">ไม่ใช้งาน</span>
                        </div>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("company") }}
                        </span>
                        <span class="text-muted font-normal"> {{ employeeData.company_name }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("position") }}
                        </span>
                        <span class="text-muted font-normal"> {{ employeeData.position_name }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("department") }}
                        </span>
                        <span class="text-muted font-normal"> {{ employeeData.department_name }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">NFC ID</span>
                        <span class="text-muted font-normal"> {{ employeeData.nfc_id }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("shifttime") }}
                        </span>
                        <span class="text-muted font-normal"> {{ employeeData.shift_name }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">
                            {{ $t("employeecode") }}
                        </span>
                        <div class="flex gap-2">
                            <span class="text-muted"> {{ employeeData.employee_code }} </span>
                        </div>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">รหัส Line ID</span>
                        <span class="text-[#3FACA9] font-normal"> {{ employeeData.line_user_id }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium"> {{ $t("salary") }} </span>
                        <span class="text-muted font-normal"> {{ employeeData.salary }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium"> {{ $t("point") }} </span>
                        <span class="text-muted font-normal"> {{ employeeData.point }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">{{ $t('personalLeave') }}</span>
                        <span class="text-muted font-normal"> {{ employeeData.personal_leave }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">{{ $t('sickLeave') }}</span>
                        <span class="text-muted font-normal"> {{ employeeData.sick_leave }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">ลา{{ $t('summerLeave') }}</span>
                        <span class="text-muted font-normal"> {{ employeeData.summer_leave }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">{{ $t('specialLeave') }}</span>
                        <span class="text-muted font-normal"> {{ employeeData.special_leave }} </span>
                    </div>
                    <div class="grid md:flex w-full">
                        <span class="md:w-40 font-medium">ลาโดยไม่ได้รับค่าจ้าง</span>
                        <span class="text-muted font-normal"> {{ employeeData.withoutpay_leave }} </span>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="w-full text-center my-6">
                <button @click="$emit('closeModal')"
                    class="w-1/4 py-2 !ring-red-400 border border-red-400 text-red-400 rounded-xl duration-300 hover:bg-red-400 hover:text-white">
                    {{ $t("close") }}
                </button>
            </div>

        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/CustomModal/BaseModal.vue";
export default {
    name: "EmployeeProfileModal",
    props: ['employeeProfile', 'employeeData'],
    components: { BaseModal },
};
</script>

<style lang="scss" scoped></style>

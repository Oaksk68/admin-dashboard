<template>
    <nav class="px-4">
        <h1 class="tab mt-5 bg-white px-10 py-3 inline-block text-origin font-semibold">
            รายงาน
        </h1>
    </nav>
    <main class="px-4">
        <teleport to="body">
            <Modal v-if="loading">
                <template v-slot:container>
                    <div class="">
                        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                    </div>
                </template>
            </Modal>
        </teleport>


        <div class="bg-white rounded-tr-3xl rounded-b-3xl p-10 pb-5">
            <div class="flex justify-between items-center pb-8">
                <div class="flex gap-4">
                    <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
                    <h1 class="text-primary text-3xl">รายงานขาดลามาสาย</h1>
                </div>
            </div>
            <div class="relative mb-7">
                <div class="md:flex justify-between">
                    <div class="grid gap-2 md:flex md:gap-4">
                        <select
                            class="border md:w-56 border-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            name="page" id="" v-model="filter.listNum" @change="
                                this.$getEmployeePaginateReport(
                                    'report/monthly-late-absence-onleave',
                                    filter
                                )
                                " required>
                            <option value="" selected hidden>แสดง 10 แถว</option>
                            <option value="10">แสดง 10 แถว</option>
                            <option value="20">แสดง 20 แถว</option>
                            <option value="30">แสดง 30 แถว</option>
                            <option value="50">แสดง 50 แถว</option>
                        </select>
                        <select
                            class="border border-slate-300 md:w-40 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            name="page" id="" required>
                            <option value="">มกราคม 2023</option>
                        </select>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2 items-center mt-2 md:mt-0">
                        <div class="flex flex-row justify-end gap-2 w-full">
                            <div @click="
                                $download(
                                    'report/monthly-late-absence-onleave',
                                    'Monthly Late Absence Leave'
                                )
                                "
                                class="flex justify-center items-center p-1 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                                <img src="@/assets/images/excel.svg" alt="" />
                            </div>
                            <div
                                class="flex justify-center items-center p-2 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                                <img src="@/assets/images/printer.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid md:flex gap-3 mt-5">
                    <div class="box-card py-5 md:w-1/2 text-center">
                        <h1 class="text-primary text-lg mb-2">เฉลี่ยการเข้างานตรงเวลา</h1>
                        <h1 class="text-3xl text-primary font-medium">{{ averageLate }}</h1>
                    </div>
                    <div class="box-card py-5 md:w-1/2 text-center">
                        <h1 class="text-primary text-lg mb-2">คะแนนรวม</h1>
                        <h1 class="text-3xl text-primary font-medium">{{ totalFinePoints }}</h1>
                    </div>
                </div>
            </div>

            <!-- table -->
            <div class="overflow-auto hidden md:block">
                <table class="w-full text-sm text-left text-primary rounded border-collapse">
                    <thead class="text-md text-primary bg-calendarBg text-center">
                        <tr>
                            <th scope="col" class="px-1 py-2 font-medium rounded-l-full">
                                {{ $t('no.') }}
                            </th>
                            <th scope="col" class="px-1 py-2 font-medium">
                                {{ $t('date') }}
                            </th>
                            <th scope="col" class="px-2 py-2 font-medium">
                                {{ $t('stampinTime') }}
                            </th>
                            <th scope="col" class="px-2 py-2 font-medium">
                                {{ $t('shiftIn') }}
                            </th>
                            <th scope="col" class="px-2 py-2 font-medium">
                                {{ $t('status') }}
                            </th>
                            <th scope="col" class="px-2 py-2 font-medium ">
                                {{ $t('point') }}
                            </th>
                            <th scope="col" class="px-1 py-2 font-medium">
                                {{ $t('personalLeave') }}
                            </th>
                            <th scope="col" class="px-1 py-2 font-medium">
                                {{ $t('sickLeave') }}
                            </th>
                            <th scope="col" class="px-1 py-2 font-medium">
                                {{ $t('summerLeave') }}
                            </th>
                            <th scope="col" class="px-1 py-2 font-medium">
                                {{ $t('specialLeave') }}
                            </th>
                            <th scope="col" class="px-1 py-2 font-medium rounded-r-full">
                                {{ $t('withoutpayLeave') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-center align-text-top my-4">
                        <tr class="h-14" v-for="(data, index) in tableData" :key="index">
                            <td class=" px-1 py-3 rounded-l-xl">{{ ++index }}</td>
                            <td class="px-3 py-1">{{ this.$moment(data.date).format("DD/MM/YYYY") }}</td>
                            <td class="px-2 py-3">
                                {{ this.$moment(data.shift_start).format("DD/MM/YYYY HH:mm:ss") }}
                            </td>
                            <td class="px-2 py-3">
                                {{ this.$moment(data.shift_end).format("DD/MM/YYYY HH:mm:ss") }}
                            </td>
                            <td class="px-2 py-3 bg-[#FCF1E7]">
                                {{ data.stamp_status }}
                            </td>
                            <td class="px-2 py-3 bg-[#FCF1E7]">{{ data.point }}</td>
                            <td class="bg-[#FCF1E7]">{{ data.personalToday }}</td>
                            <td class="bg-[#FCF1E7]">
                                {{ data.sickToday }}
                            </td>
                            <td class="bg-[#FCF1E7]">
                                {{ data.summerToday }}
                            </td>
                            <td class="bg-[#FCF1E7]">
                                {{ data.specialToday }}
                            </td>
                            <td class="bg-[#FCF1E7]">
                                {{ data.withoutpayToday }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="block md:hidden">
                <div id="accordion" class="block md:hidden border-b mb-4">
                    <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
                        <button @click="this.$toggleAccordion(index, 'monthlyLAO')" class="flex items-center w-full gap-3">
                            <font-awesome-icon :id="`monthlyLAO-chevron-${index}`"
                                class="bg-origin p-2 text-white rounded-full" icon="fa-solid fa-chevron-up"
                                rotation="180" />
                            <span class="capitalize text-sm text-primary">
                                {{ this.$moment(data.date).format("DD/MM/YYYY") }}
                            </span>
                        </button>
                        <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
                            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ this.$moment(data.date).format("DD/MM/YYYY") }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ this.$moment(data.shift_start).format("DD/MM/YYYY HH:mm:ss") }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ this.$moment(data.shift_end).format("DD/MM/YYYY HH:mm:ss") }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.stamp_status }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.point }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.personalToday }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.sickToday }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.summerToday }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.specialToday }}
                                </span>
                            </div>
                            <div>
                                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                                <span class="text-h1mute text-sm capitalize">
                                    {{ data.withoutpayToday }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
                <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
                    active-color="" @update:modelValue="
                        $getEmployeePaginateReport('report/monthly-late-absence-onleave', filter)
                        " hideFirstButton hideLastButton />
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            color: "#36A1EA",
            size: "20px",
            tableData: [],
            averageLate: "",
            empName: "",
            totalFinePoints: "",
            filter: {
                per_page: "",
                listNum: "",
                searchQuery: "",
                date: new Date("2023-06-31T17:00:00.000Z"),
            },
        };
    },
    mounted() {
        this.$paginateData.current_page = 1;
        this.$getEmployeePaginateReport(
            "emp-monthly-late-absence-onleave",
            this.filter,
            "loading"
        );
    },
};
</script>

<style>
div.box-card {
    border-radius: 30px;
    background: var(--unnamed, #fff);
    box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
        0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>

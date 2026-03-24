<template>
  <main class="w-full bg-calendarBg">
    <!-- paymentHistory popup -->
    <BaseModal :isOpen="paymentHistory" @close-modal="closeModal" :classList="'w-full md:w-[50vw]'">
      <template #title>
        <h1 class="text-center font-medium text-3xl text-primary">
          {{ $t('payment_history') }}
        </h1>
      </template>
      <template #container>
        <div class="grid md:flex gap-2 md:gap-4 w-full px-14 mb-8">
          <div class="relative">
            <select class="w-full rounded-xl">
              <option value="" selected hidden>แสดง 10 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="50">แสดง 50 แถว</option>
              <option value="100">แสดง 100 แถว</option>
            </select>
          </div>
          <div class="md:w-1/4">
            <VueDatePicker input-class-name="rounded-xl" :format="$format" v-model="date" :enable-time-picker="false" />
          </div>
          <div class="relative md:w-2/4">
            <input class="rounded-xl w-full" type="text" placeholder="ค้นหา" />
            <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
          </div>
        </div>
        <div class="overflow-auto rounded-lg hidden md:block">
          <table class="w-full text-sm text-left text-primary">
            <thead class="text-md text-primary bg-calendarBg text-center">
              <tr>
                <th scope="col" class="px-6 py-3 font-normal rounded-l-full">
                  {{ $t('no.') }}
                </th>
                <th scope="col" class="px-6 py-3 font-normal">{{ $t('name') }}</th>
                <th scope="col" class="px-6 py-3 font-normal">
                  {{ $t('salary') }} ({{ $t('baht') }})
                </th>
                <th scope="col" class="px-6 py-3 font-normal">เริ่มต้น</th>
                <th scope="col" class="px-6 py-3 font-normal">สิ้นสุด</th>
                <th scope="col" class="px-6 py-3 font-normal rounded-r-full">
                  วันที่ชำระ
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(item, index) in apiData.packages" :key="index" class="bg-white">
                <th scope="row" class="px-6 py-4 font-medium text-primary whitespace-nowrap">
                  {{ ++index }}
                </th>
                <td class="px-6 py-4">
                  Size {{ item.name }} 30 วัน / ผู้ใช้งาน/ เดือน
                </td>
                <td class="px-6 py-4">{{ item.price_per_month }}฿</td>
                <td class="px-6 py-4">
                  {{
                    this.$moment(item.pivot.package_start).format("DD/MM/YYYY")
                  }}
                </td>
                <td class="px-6 py-4">
                  {{
                    this.$moment(item.pivot.package_end).format("DD/MM/YYYY")
                  }}
                </td>
                <td class="px-6 py-4">
                  {{ this.$moment(item.pivot.paid_date).format("DD/MM/YYYY") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- accordion -->
        <div id="accordion" class="block md:hidden my-5">
          <div v-for="(data, index) in apiData.packages" :key="index" class="border-t border-b mb-4 py-2 px-3"
            id="accordion">
            <button @click="toggleAccordion(index, 'extend')" class="flex items-center w-full gap-3">
              <font-awesome-icon :id="`extend-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
                icon="fa-solid fa-chevron-up" rotation="180" />
              <span class="capitalize">
                Size {{ data.name }} 30 วัน / ผู้ใช้งาน/ เดือน</span>
            </button>
            <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
              :class="data.open ? 'h-auto ' : 'h-0'" id="content">
              <div>
                <h1>{{ $t('name') }}</h1>
                <span class="text-gray-400 capitalize">{{ data.price_per_month }}฿</span>
              </div>
              <div>
                <h1>{{ $t('enterpriseLevel') }}</h1>
                <span class="text-gray-400">
                  {{
                    this.$moment(data.pivot.package_start).format("DD/MM/YYYY")
                  }}</span>
              </div>
              <div>
                <h1>ระดับสูง (UPPER)</h1>
                <span class="text-gray-400">
                  {{
                    this.$moment(data.pivot.package_end).format("DD/MM/YYYY")
                  }}</span>
              </div>
              <div>
                <h1>ระดับสูง (UPPER)</h1>
                <span class="text-gray-400">
                  {{
                    this.$moment(data.pivot.paid_date).format("DD/MM/YYYY")
                  }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="grid gap-5 justify-center md:flex md:justify-between mb-10 px-10">
          <div class="flex items-center">
            <div class="flex bg-calendarBg rounded-3xl px-1 py-0.5 justify-center md:justify-evenly items-center">
              <img src="@/assets/images/left.svg" alt="" />
              <span class="px-4">1</span>
              <img src="@/assets/images/right.svg" alt="" />
            </div>
            <span class="text-sm pl-2 text-muted">หน้า 1 จาก 10</span>
          </div>
          <button @click="paymentHistory = false"
            class="w-60 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
            type="button">
            ปิดหน้าต่าง
          </button>
        </div>
      </template>
    </BaseModal>

    <!-- history popup -->
    <BaseModal :isOpen="details" @close-modal="closeModal" :classList="'w-full md:w-[50vw]'">
      <template #title>
        <h1 class="text-center font-medium text-3xl">รายละเอียด</h1>
      </template>
      <template #container>
        <div @click.stop="" class="pl-4 py-4 bg-white rounded-lg">
          <div class="pr-5 h-auto overflow-auto">
            <div class="flex justify-end">
              <div @click="
                editHistory = true;
              details = false;
              " :class="showEditBtn ? '' : 'invisible'"
                class="relative border-2 rounded-large transition-all duration-200 hover:bg-slate-200">
                <img class="p-2 mr-0.5" src="@/assets/images/edit.svg" alt="" />
              </div>
            </div>
            <div class="container p-4">
              <div class="md:flex">
                <div class="md:w-1/3">
                  <h1 class="bg-calendarBg py-1 px-5">รายละเอียดแพ็กเกจ</h1>
                </div>
                <div class="md:w-2/3 md:pl-8">
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">{{ $t('name') }}</h1>
                    <span class="text-gray-400">{{
                      packageDetail.package?.name
                    }}</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ผู้ใช้ที่เพิ่มได้</h1>
                    <span class="text-gray-400">{{
                      packageDetail.package?.user_qty
                    }}</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ราคา / ผู้ใช้งาน</h1>
                    <span class="text-gray-400">{{ packageDetail.package?.price_per_user }}฿</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ราคา / เดือน</h1>
                    <span class="text-gray-400">{{ packageDetail.package?.price_per_month }}฿</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ส่วนลด / ปี</h1>
                    <span class="text-gray-400">{{ packageDetail.package?.discount_per_year }}%</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ราคา / ปี</h1>
                    <span class="text-gray-400">{{ packageDetail.package?.price_per_year }}฿</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">รายละเอียด</h1>
                    <span class="text-gray-400">ผู้ใช้งาน{{ packageDetail.package?.detail }}</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ระยะเวลาชำระเงิน</h1>
                    <span class="text-gray-400">
                      {{ packageDetail.payment_period?.name_th }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-3 md:mt-0 md:flex">
                <div class="md:w-1/3">
                  <h1 class="bg-calendarBg py-1 px-5">
                    รายละเอียดการชำระเงิน
                  </h1>
                </div>
                <div class="md:w-2/3 md:pl-8">
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">{{ $t('name') }}</h1>
                    <span class="text-gray-400">{{
                      packageDetail.package?.name
                    }}</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">จำนวนผู้ใช้งาน</h1>
                    <span class="text-gray-400">{{
                      packageDetail.package?.user_qty_start
                    }}</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ราคา / ผู้ใช้งาน</h1>
                    <span class="text-gray-400">{{ packageDetail.package?.price_per_user }}฿</span>
                  </div>

                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ส่วนลด / ปี</h1>
                    <span class="text-gray-400">{{ packageDetail.package?.discount_per_year }}%</span>
                  </div>
                  <div class="text-primary md:flex justify-between items-center">
                    <h1 class="py-2 font-medium">ราคา / ปี</h1>
                    <span class="text-gray-400">{{
                      packageDetail.package?.must_pay_price_per_year
                    }}฿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="grid md:flex justify-items-center md:justify-around text-center my-8 gap-4">
          <button @click="details = false"
            class="w-[80%] md:w-1/3 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
            type="button">
            ปิดหน้าต่าง
          </button>
          <button v-if="payment" @click="pay()"
            class="w-[80%] md:w-1/3 border-2 border-origin bg-origin text-white font-normal py-2 rounded-xl hover:bg-sky-700 transition-all duration-500"
            type="button">
            ชำระเงิน
          </button>
        </div>
      </template>
    </BaseModal>


    <!-- editHistory popup -->
    <BaseModal :isOpen="editHistory" @close-modal="closeModal" :classList="'w-full md:w-[50vw]'">
      <template #title>
        <h1 class="text-center font-medium text-3xl">รายละเอียด</h1>
      </template>
      <template #container>
        <div class="bg-white max-h-[90vh] overflow-y-auto rounded-lg" @click.stop="">
          <div class="container p-4">
            <div class="md:flex">
              <div class="md:w-1/3">
                <h1 class="bg-calendarBg py-1 px-5">รายละเอียดแพ็กเกจ</h1>
              </div>
              <div class="w-2/3 md:pl-8">
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">{{ $t('name') }}</h1>
                  <span class="text-gray-400">{{
                    packageDetail.package?.name
                  }}</span>
                </div>
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">ผู้ใช้ที่เพิ่มได้</h1>
                  <span class="text-gray-400">{{
                    packageDetail.package?.user_qty
                  }}</span>
                </div>
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">ราคา / ผู้ใช้งาน</h1>
                  <span class="text-gray-400">{{ packageDetail.package?.price_per_user }}฿</span>
                </div>
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">ราคา / เดือน</h1>
                  <span class="text-gray-400">{{ packageDetail.package?.price_per_month }}฿</span>
                </div>
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">ส่วนลด / ปี</h1>
                  <span class="text-gray-400">{{ packageDetail.package?.discount_per_year }}%</span>
                </div>
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">ราคา / ปี</h1>
                  <span class="text-gray-400">{{ packageDetail.package?.price_per_user }}฿</span>
                </div>
                <div class="text-primary md:flex justify-between items-center">
                  <h1 class="py-2 font-medium">รายละเอียด</h1>
                  <span class="text-gray-400">ผู้ใช้งาน{{ packageDetail.package?.detail }}</span>
                </div>
              </div>
            </div>
            <div class="my-4">
              <div class="text-primary md:flex items-center w-full">
                <div class="md:w-1/3">
                  <h1 class="bg-calendarBg py-1 px-5">ระยะเวลาชำระเงิน</h1>
                </div>
                <select
                  class="block w-full mt-2 md:mt-0 md:w-1/5 md:ml-7 px-4 py-2 text-base text-primary border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                  <option selected>2 ปี</option>
                  <option value="ทุกวัน">ทุกวัน</option>
                  <option value="1 อาทิตย์">1 อาทิตย์</option>
                  <option value="1 เดือน">1 เดือน</option>
                  <option value="1 ปี">1 ปี</option>
                </select>
              </div>
            </div>
            <div>
              <div class="text-primary md:flex items-center">
                <div class="md:w-1/3">
                  <h1 class="bg-calendarBg py-1 px-5">จำนวนผู้ใช้งาน</h1>
                </div>
                <input class="w-full mt-2 md:mt-0 md:w-2/5 md:ml-7 py-2 border-slate-400 rounded-xl" type="text"
                  placeholder="ระบุตัวเลข" />
              </div>
            </div>

          </div>
        </div>
      </template>
      <template #footer>
        <div
          class="w-full mt-8 md:mb-10 md:pt-10 grid md:flex justify-items-center md:justify-center gap-2 md:gap-5 md:pr-16">
          <button
            class="w-[80%] md:w-1/3 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
            type="button" @click="editHistory = false">
            {{ $t("cancel") }}
          </button>
          <button @click="submit"
            class="shadow w-[80%] md:w-1/3 border-2 border-origin bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
            type="button">
            {{ $t("save") }}
          </button>
        </div>
      </template>
    </BaseModal>


    <div class="">
      <div class="flex flex-wrap bg-white rounded-tr-3xl rounded-b-3xl p-8">
        <!-- card -->
        <div v-for="(data, index) in apiData.packages" :key="'package' + index"
          class="card w-80 rounded-3xl py-5 px-5 text-primary">
          <div class="flex justify-between items-center h-16">
            <div class="green flex justify-center items-center rounded-3xl w-24 h-10">
              <h1 class="font-normal text-sm text-primary">กำลังใช้งาน</h1>
            </div>

            <div class="flex">
              <div @click="getDetails(data.pivot.id, 'editHistory')"
                class="flex items-center border-2 rounded-l-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                <img src="@/assets/images/editblack.svg" alt="" />
              </div>
              <div @click="paymentHistory = !paymentHistory"
                class="flex items-center border-2 px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                <img src="@/assets/images/history.svg" alt="" />
              </div>
              <div
                class="flex items-center border-2 rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                <img src="@/assets/images/bin.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="mt-8 text-center">
            <h1 class="text-primary text-3xl">Size {{ data.name }}</h1>
            <h1 class="text-origin text-[75px]">{{ data.user_qty_start }}</h1>
            <div class="">
              <h1>บาท / ผู้ใช้งาน / เดือน</h1>
              <h1>ผู้ใช้งานทั้งหมด : {{ data.user_qty }}</h1>
              <hr class="h-0.5 my-8 mx-8 bg-calendarBg" />
            </div>
            <div>
              <h1 class="pb-4 font-medium text-base">กำหนดชำระ</h1>
              <h1 class="text-left pl-8 pb-2 text-base">
                อายุการใช้งาน :
                <span class="text-h1mute">{{
                  this.$moment(data.pivot.package_end).format("YY") -
                  this.$moment(data.pivot.package_start).format("YY")
                }}
                  ปี</span>
              </h1>
              <h1 class="text-left pl-8 text-base">
                บิลถัดไปของคุณคือ :
                <span class="text-h1mute">
                  {{
                    this.$moment(data.pivot.package_end).format("DD/MM/YYYY")
                  }}
                </span>
              </h1>
            </div>
            <div class="w-full py-5 flex justify-evenly gap-3">
              <button
                class="w-[45%] border-2 border-origin text-origin font-normal py-2 rounded-xl hover:bg-origin hover:text-white transition-all duration-500"
                type="button" @click="
                getDetails(data.pivot.id, 'details');
                this.showEditBtn = true;
                this.payment = false;
                ">
                ข้อมูล
              </button>
              <button @click="
                getDetails(data.pivot.id, 'details');
              this.showEditBtn = false;
              this.payment = true;
              "
                class="shadow w-[45%] bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
                type="button">
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import BaseModal from '@/components/CustomModal/BaseModal.vue';
import $ from 'jquery'

export default {
  name: "Extend",
  props: ["passApiData"],
  components: { BaseModal },
  data() {
    return {
      date: new Date(),
      editWarranty: false,
      details: false,
      editHistory: false,
      paymentHistory: false,
      payment: false,
      showEditBtn: true,
      apiData: "",
      packageDetail: {},
      loading: false,
      color: "#36A1EA",
      size: "20px",
    };
  },
  methods: {
    toggleAccordion(id, chevronName) {
      for (let i in this.apiData.packages) {
        if (i != id) {
          this.apiData.packages[i].open = false;
        }
      }
      this.apiData.packages[id].open = !this.apiData.packages[id].open;
      if (this.apiData.packages[id].open) {
        document
          .querySelector(`#${chevronName}-chevron-${id}`)
          .classList.toggle("rotate");
      } else {
        document
          .querySelector(`#${chevronName}-chevron-${id}`)
          .classList.remove("rotate");
      }
    },

    closeModal() {
      this.editHistory = false;
      this.editWarranty = false;
      this.details = false;
    },
    getDetails(id, edit) {
      $('#loader').show()
      this.axios
        .get("get-company-package/" + id)
        .then((response) => {
          this.packageDetail = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          $('#loader').hide()
          if (edit == "details") {
            this.details = true;
          } else if (edit == "editHistory") {
            this.editHistory = true;
          }
        });
    },
    pay() {
      this.$swal({
        icon: "success",
        html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
        confirmButtonText: "ตกลง",
      }).then(() => {
        this.details = false;
      });
    },
  },

  computed: {},

  watch: {
    passApiData(val) {
      this.apiData = val;
    },
  },
  mounted() { },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif !important;
}

div.card {
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.25),
    inset 0px 0px 4px rgba(0, 0, 0, 0.1);
}

div.green {
  background-color: #aef359;
}
</style>

<template>
  <main>
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <!-- <div class="flex justify-between items-center p-4 md:p-0 pb-8">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-3xl">อุปกรณ์</h1>
        </div>
        <div @click="addDevice"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div> -->
      <div class="flex justify-between items-center pb-8 p-7">
        <div class="flex items-center gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-[30px] font-medium">{{ $t('equipment') }}</h1>
        </div>
        <div @click="addDevice"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="relative grid md:flex gap-2 md:gap-0 items-center p-4 md:p-0 mb-7">
        <div class="md:mr-4">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPaginateNo('devices'), filter" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
        </div>

        <div class="relative md:w-1/3">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPaginateNo('devices', filter)" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>
      </div>

      <!-- pop up -->
      <BaseModal :isOpen="popUp" @close-modal="closeModal" @submit="submit" :classList="'md:w-[50%] w-full'">
        <template #title>
          <h1 class="text-center text-2xl text-primary font-medium pb-5 pt-2">
            เพิ่มอุปกรณ์
          </h1>
        </template>
        <template #container>
          <form class="w-full mx-auto grid gap-3 text-sm mb-10 md:mb-0 md:px-16" action="">
            <div class="grid md:flex md:w-full md:items-baseline gap-4  text-primary">
              <div class="md:w-1/2">
                <label class="pb-1 font-medium" for="deviceName">{{ $t('equipment_name') }}
                  <span class="text-red-600 font-bold">*</span></label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" :placeholder="$t('equipment_name')" v-model="form.device_name" required />
              </div>
              <div class="md:w-1/2">
                <label class="pb-1 font-medium" for="departmentName">Mac ID<span class="text-red-600 font-bold">*</span>
                </label>
                <div>
                  <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="$errorBorder('mac_id')" type="text" placeholder="ID แผนก" v-model="form.mac_id" required />
                  <em>{{ errors.mac_id }}</em>
                </div>
              </div>
            </div>
            <div class="hidden md:flex flex-wrap">
              <div v-for="  i   in   getDeviceCate   " :key="i" class="w-1/4 p-2">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" value=""
                  id="'device' + i.id" />
                <label :for="'device' + i.id" class="text-primary ml-2">{{
                  i.name
                }}</label>
              </div>
            </div>
            <div class="flex flex-wrap md:hidden mt-4">
              <div class="w-1/2 py-1" v-for="  deviceCat   of   getDeviceCate   " :key="deviceCat.id">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" :value="deviceCat.name"
                  :id="'device' + deviceCat.id" v-model="form.selectedDevices" />
                <label :for="'device' + deviceCat.id" class="ml-2 text-primary">
                  {{ deviceCat.name }}</label>
              </div>
            </div>
          </form>
        </template>
      </BaseModal>

      <!-- table -->
      <div class="overflow-x-auto w-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-6 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-10 py-2 font-medium"> {{ $t('equipment_name') }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">Mac ID</th>
              <th scope="col" class="px-6 py-2 font-medium">{{ $t('status') }}</th>
              <!-- <th
                scope="col"
                v-for="device in getDeviceCate"
                :key="device.id"
                class="px-6 font-medium"
              >
                {{ device.name.split(" ") }}
              </th> -->
              <th scope="col" class="px-4 py-2 font-medium w-4">Linebot</th>
              <th scope="col" class="px-6 py-2 font-medium w-4">Card</th>
              <th scope="col" class="px-6 py-2 font-medium w-4">Finger</th>
              <th scope="col" class="px-6 py-2 font-medium w-4">Face</th>
              <th scope="col" class="px-7 py-2 font-medium w-4">Pin</th>
              <th scope="col" class="px-5 py-2 font-medium w-4">Camera</th>
              <th scope="col" class="px-4 py-2 font-medium w-4">Manual</th>
              <th scope="col" class="px-4 py-2 font-medium w-4">Beacon</th>
              <th scope="col" class="py-2 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(   data, i   ) of    filteredList   " :key="i" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++i }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ data.device_name }}
              </td>
              <td class="px-1 py-2 whitespace-nowrap">{{ data.mac_id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex justify-center">
                  <div v-if="data.status" class="bg-lime-400 rounded-full h-4 w-4"></div>
                  <div v-else class="bg-red-500 rounded-full h-4 w-4"></div>
                </div>
              </td>
              <td v-for="   device    in    getDeviceCate   " :key="device.id" class="px-1 py-1 whitespace-nowrap">
                <img class="block m-auto" v-if="hasDevic(data.device_category, device.id)" src="@/assets/images/tick.svg"
                  alt="" />
                <img class="block m-auto" v-else src="@/assets/images/false.svg" alt="" />
              </td>
              <td class="px-2 py-4 text-right flex justify-center">
                <div @click="editPopUp(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="deleteDevice(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'department')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`department-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              data.device_name
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t('name') }}อุปกรณ์</h1>
              <span class="text-gray-400 capitalize">{{
                data.device_name
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">Mac ID</h1>
              <span class="text-gray-400">{{ data.mac_id }}</span>
            </div>
            <div>
              <h1 class="font-medium">สถานะ</h1>
              <div v-if="data.status" class="bg-lime-400 rounded-full h-4 w-4"></div>
              <div v-else class="bg-red-500 rounded-full h-4 w-4"></div>
            </div>
            <div>
              <h1 class="font-medium mb-2">อุปกรณ์</h1>
              <div class="flex flex-wrap">
                <div class="flex items-center mb-2 gap-2 w-1/2" v-for="   deviceCat    in    getDeviceCate   "
                  :key="deviceCat.id">
                  <img class="block" v-if="hasDevic(data.device_category, deviceCat.id)" src="@/assets/images/tick.svg"
                    alt="" />
                  <img class="block" v-else src="@/assets/images/false.svg" alt="" />
                  <span>{{ deviceCat.name }}</span>
                </div>
              </div>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="editPopUp(data.id)" class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="deleteDevice(data.id)" class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateNo('devices')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

var data = {
  id: "",
  device_name: "",
  mac_id: "",
  selectedDevices: [],
  device_category: [
    {
      linebot: false,
      card: false,
      face: false,
      pin: false,
      manual: false,
      beacon: false,
    },
  ],
};

export default {
  name: "equipmentInfo",
  data() {
    return {
      popUp: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      form: { ...data },
      errors: { ...data },
      tableData: [],
      decat: [],
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    ...mapActions(["fetchDeviceCate"]),
    hasDevic(d_category, id) {
      for (let i = 0; i < d_category.length; i++) {
        if (id == d_category[i].id) return true;
      }
      return false;
    },

    async submit() {
      this.form.device_category = [];
      for (let a of this.getDeviceCate) {
        const highlighted = document.getElementById("device" + a.id);
        if (highlighted.checked) {
          const obj = {
            id: a.id,
            name: a.name,
            type: a.type,
          };
          this.form.device_category.push(obj);
        }
      }

      if (this.form.id) {
        await this.axios
          .post("device/update/" + this.form.id, this.form)
          .then((response) => {
            console.log(response);
            if (response.data.success) {
              this.$swal({
                icon: "success",
                html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              })
                .then(() => {
                  this.popUp = false;
                })
                .finally(() => {
                  this.$getPaginateNo("devices");
                });
            } else {
              this.$swal({
                icon: "error",
                title: "Error",
                text: response.data.message,
              }).then(() => {
                this.popUp = false;
              });
            }
          });
      } else {
        await this.axios.post("device/create", this.form).then((response) => {
          console.log(response);
          console.log("Clicked");
          if (response.data.success) {
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            })
              .then(() => {
                this.popUp = false;
              })
              .finally(() => {
                this.$getPaginateNo("devices");
              });
          } else {
            this.$validateMsg(response.data.message)
          }
        });
      }
    },

    checkHighlight() {
      for (let a of this.getDeviceCate) {
        let deviceHighlight = document.querySelectorAll("#device" + a.id);
        for (let b of this.form.device_category) {
          if (a.id === b.id) {
            for (let check of deviceHighlight) {
              check.checked = true;
            }
          }
        }
      }
    },

    async editPopUp(id) {
      this.form = this.tableData.find(td => td.id === id)
      console.log(this.form);
      this.form.selectedDevices = this.form.device_category.map(dc => dc.name)
      console.log(this.form.selectedDevices);
      this.popUp = true;
      // await this.axios
      //   .get("device/edit/" + id)
      //   .then((response) => {
      //     this.form = response.data.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(async () => {
      //     this.checkHighlight();
      //     this.loading = false;
      //   });
    },

    async deleteDevice(id) {
      this.$swal({
        showCancelButton: true,
        title: "คุณต้องการลบข้อมูลนี้ ?",
        html: "<span class='text-sm'>หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้</span>",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: "success",
            html: "<h1>ลบสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการเพิ่มระดับเรียบร้อยแล้ว</span>",
            confirmButtonText: "ตกลง",
          });
          this.axios
            .delete("device/delete/" + id)
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
              this.$getPaginateNo("devices");
            });
        }
      });
    },

    closeModal() {
      this.popUp = false;
      this.form = { ...data };
      this.errors = { ...data };
    },

    addDevice() {
      this.form = { ...data };
      this.popUp = true;
    },
  },

  computed: {
    ...mapGetters(["getDeviceCate"]),

    filteredList() {
      return this.tableData.filter((list) => {
        return list.device_name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  beforeMount() {
    this.$paginateData.current_page = 1;
    this.$paginateData.last_page = null;
    this.$filter.listNum = "";
    this.$filter.searchQuery = "";
  },

  mounted() {
    this.fetchDeviceCate();
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("devices");
  },
};
</script>

<style scoped></style>

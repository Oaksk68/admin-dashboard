<template>
  <main class="bg-calendarBg">
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>
    <BaseModal :isOpen="popUp" @close-modal="closeModal" @submit="addMarker">
      <template #title>
        <h1 class="text-center text-2xl text-primary pt-5 pr-4 md:pr-0">
          แก้ไขสถานที่ เข้า-ออก งาน
        </h1>
      </template>
      <template #container>
        <div class="">
          <form class="mt-12 md:mx-10 pb-5 pr-4 md:pr-0" action="">
            <div class="pb-2 md:flex items-center justify-between">
              <label class="text-primary font-medium text-md inline-block md:w-1/3 mb-2" for="">{{ $t('name')
              }}สถานที่</label>
              <input type="text" class="rounded-lg w-full placeholder-muted border-slate-300 text-primary text-md"
                placeholder="ชื่อสถานที่" v-model="form2.name" :class="errorBorder('name')" />
            </div>
            <div class="pb-2 md:flex items-center justify-between">
              <label class="text-primary font-medium text-md inline-block md:w-1/3 mb-2" for="">ละติจูด<span
                  class="text-red-600">*</span></label>
              <input type="text" class="rounded-lg w-full placeholder-muted border-slate-300 text-primary text-md"
                :class="errorBorder('lat')" placeholder="ละติจูด" v-model="form2.lat"
                oninput="this.value=this.value.replace(/[^-?\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.[\d]{14})./g, '$1');" />
              <div :class="errorText('lat')">
                {{ errors.lat }}
              </div>
            </div>
            <div class="pb-2 md:flex items-center justify-between">
              <label class="text-primary font-medium text-md inline-block md:w-1/3 mb-2" for="">ลองจิจูด<span
                  class="text-red-600">*</span></label>
              <input type="text" class="rounded-lg w-full placeholder-muted border-slate-300 text-primary text-md"
                placeholder="ลองจิจูด" v-model="form2.lng" :class="errorBorder('lng')"
                oninput="this.value=this.value.replace(/[^-?\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.[\d]{14})./g, '$1');" />
              <div :class="errorText('lng')">
                {{ errors.lng }}
              </div>
            </div>
            <div class="pb-2 md:flex items-center justify-between">
              <label class="text-primary font-medium text-md inline-block md:w-1/3 mb-2" for="">รัศมี (เมตร)<span
                  class="text-red-600">*</span></label>
              <input type="number" class="rounded-lg w-full placeholder-muted border-slate-300 text-primary text-md"
                placeholder="รัศมี" v-model="form2.radius" oninput="this.value=this.value.replace(/[^+()-\s?\d]/g, '');"
                :class="errorBorder('radius')" />
              <div :class="errorText('radius')">
                {{ errors.radius }}
              </div>
            </div>
            <div class="pb-2">
              <label class="text-primary font-medium text-md md:inline-block block w-full md:w-1/3 mb-2"
                for="">เงื่อนไข<span class="text-red-600">*</span></label>
              <div class="flex gap-3">
                <input type="checkbox" class="w-6 h-6 text-lightGreen bg-gray-100 border-slate-300 rounded-lg"
                  :class="errorBorder('in_out')" v-model="form2.in_out" :true-value="1" :false-value="0" />
                <h1 class="md:hidden text-primary">อนุญาต</h1>
              </div>

              <div :class="errorText('in_out')">
                {{ errors.in_out }}
              </div>
            </div>
          </form>
        </div>
      </template>
    </BaseModal>

    <!-- container -->
    <div class="relative md:flex gap-4 justify-between bg-white rounded-tr-3xl rounded-b-3xl p-5 md:p-10 pb-5">
      <!-- left box -->
      <div class="md:box md:card md:w-1/2">
        <div class="flex items-start gap-2">
          <div class="inline-block h-8 w-1.5 bg-origin rounded-xl md:hidden"></div>
          <h1 class="font-medium md:text-center text-[26px] md:text-3xl text-primary md:p-8">
            เลือกสถานที่ เข้า-ออก งาน
          </h1>
        </div>

        <form class="md:mx-12 p-2 mt-4 md:mt-0 md:p-0 pb-8" @submit.prevent="addMarker()" action="">
          <label class="text-primary font-medium text-md md:inline-block md:w-1/3 mb-2 md:mb-0"
            for="">ค้นหาและปักหมุด</label>
          <GMapAutocomplete placeholder="ค้นหาจาก map"
            class="rounded-lg w-full md:w-2/3 text-md placeholder-muted text-primary p-2 border border-slate-300 hover:border-"
            @place_changed="setPlace"></GMapAutocomplete>
          <hr class="my-4 bg-calendarBg h-0.5" />
          <div class="grid gap-2">
            <div class="pb-2">
              <label class="text-primary font-medium text-md block md:inline-block md:w-1/3 mb-2 md:mb-0" for="">{{
                $t('name') }}สถานที่</label>
              <input type="text"
                class="rounded-lg w-full md:w-2/3 placeholder-muted border-slate-300 text-primary text-md"
                placeholder="ชื่อสถานที่" v-model="form.name" :class="errorBorder('name')" />
            </div>
            <div class="pb-2">
              <label class="text-primary font-medium text-md block md:inline-block md:w-1/3 mb-2 md:mb-0"
                for="">ละติจูด<span class="text-red-600">*</span></label>
              <input type="text"
                class="rounded-lg w-full md:w-2/3 placeholder-muted border-slate-300 text-primary text-md"
                :class="errorBorder('lat')" placeholder="ละติจูด" v-model="form.lat"
                oninput="this.value=this.value.replace(/[^-?\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.[\d]{14})./g, '$1');" />
              <div :class="errorText('lat')">
                {{ errors.lat }}
              </div>
            </div>
            <div class="pb-2">
              <label class="text-primary font-medium text-md block md:inline-block md:w-1/3 mb-2 md:mb-0"
                for="">ลองจิจูด<span class="text-red-600">*</span></label>
              <input type="text"
                class="rounded-lg w-full md:w-2/3 placeholder-muted border-slate-300 text-primary text-md"
                placeholder="ลองจิจูด" v-model="form.lng" :class="errorBorder('lng')"
                oninput="this.value=this.value.replace(/[^-?\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\.[\d]{14})./g, '$1');" />
              <div :class="errorText('lng')">
                {{ errors.lng }}
              </div>
            </div>
            <div class="pb-2">
              <label class="text-primary font-medium text-md block md:inline-block md:w-1/3 mb-2 md:mb-0" for="">รัศมี
                (เมตร)<span class="text-red-600">*</span></label>
              <input type="number"
                class="rounded-lg w-full md:w-2/3 placeholder-muted border-slate-300 text-primary text-md"
                placeholder="รัศมี" v-model="form.radius" oninput="this.value=this.value.replace(/[^+()-\s?\d]/g, '');"
                :class="errorBorder('radius')" />
              <div :class="errorText('radius')">
                {{ errors.radius }}
              </div>
            </div>
            <div class="pb-2">
              <label class="text-primary font-medium text-md block md:inline-block md:w-1/3 mb-2 md:mb-0"
                for="">เงื่อนไข<span class="text-red-600">*</span></label>
              <input type="checkbox" class="w-6 h-6 texw-full md:t-lightGreen bg-gray-100 border-slate-300 rounded-lg"
                :class="errorBorder('in_out')" v-model="form.in_out" :true-value="1" :false-value="0" />
              <div :class="errorText('in_out')">
                {{ errors.in_out }}
              </div>
            </div>
            <div class="text-center mt-6 hidden md:block">
              <button
                class="shadow w-2/5 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
                type="submit">
                เพิ่มสถานที่
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Map  -->
      <div class="h-80 rounded-2xl md:h-auto md:box md:card md:w-1/2 overflow-hidden">
        <GMapMap :center="center" :zoom="zoom" :option="mapOption" map-type-id="terrain" class="h-full"
          @click="set_mark_on_map($event)">
          <div v-for="(m, index) in markers" :key="index">
            <GMapMarker :position="getPosition(m)" :clickable="true" :draggable="is_marker ? true : false"
              :inheritAttrs="false" @click="toggleInfo(m, index, false)" />
            <GMapCircle :center="m.position" :radius="m.radius" :draggable="is_marker ? true : false"
              :editable="is_marker ? true : false" :clickable="is_marker ? true : false"
              @radius_changed="is_marker ? radiusChanged($event, m) : ''"
              @center_changed="is_marker ? centerChanged($event, m) : ''" :visible="true"
              :options="m.in_out == 0 ? not_allowed_option : allowed_option" :inheritAttrs="false"
              @click="toggleInfo(m, index, false)" />

            <GMapInfoWindow :options="infoOptions" :position="infoPosition" :opened="infoOpened"
              @closeclick="infoOpened = false">
              {{ form.name }}
            </GMapInfoWindow>
          </div>
        </GMapMap>
      </div>
      <div class="text-center mt-6 block md:hidden">
        <button
          class="shadow w-4/5 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
          type="submit">
          เพิ่มสถานที่
        </button>
      </div>
    </div>

    <div class="relative bg-white rounded-3xl md:p-10 my-5 pb-5">
      <div class="flex items-start gap-2 p-4">
        <div class="inline-block h-8 w-1.5 bg-origin rounded-xl md:hidden"></div>
        <h1 class="text-[26px] md:text-3xl">สถานที่ เข้า-ออก งาน</h1>
      </div>
      <div class="hidden md:flex gap-4 w-full pb-8 mt-5">
        <div class="relative">
          <select class="w-full rounded-xl border-slate-300">
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
          </select>
        </div>
        <div class="relative md:w-2/4">
          <input class="rounded-xl w-full border-slate-300" type="text" placeholder="ค้นหา" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>
      </div>

      <div class="overflow-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-3 font-semibold rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-20 py-3 font-semibold">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-3 font-semibold">ละติจูด</th>
              <th scope="col" class="px-2 py-3 font-semibold">ลองจิจูด</th>
              <th scope="col" class="px-2 py-3 font-semibold">รัศมี (เมตร)</th>
              <th scope="col" class="px-2 py-3 font-semibold">เงื่อนไข</th>
              <th scope="col" class="px-2 py-3 font-semibold rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in markers" :key="'map' + index" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 capitalize">{{ data.name }}</td>
              <td class="px-1 py-2">{{ data.lat }}</td>
              <td class="px-1 py-2">{{ data.lng }}</td>
              <td class="px-1 py-2">{{ data.radius }}</td>
              <td class="px-6 py-4">
                <div class="flex w-full justify-center">
                  <img v-if="data.in_out == 1" src="@/assets/images/tick.svg" alt="" />
                  <img v-else src="@/assets/images/false.svg" alt="" />
                </div>
              </td>
              <td class="px-6 py-4 flex justify-center">
                <div @click="editMark(data, index)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="deleteMark(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4 mt-5">
        <div v-for="(data, index) in markers" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="toggleAccordion(index, 'map')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`map-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize">{{ data.name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium">ละติจูด</h1>
              <span class="text-gray-400 capitalize">{{ data.lat }}</span>
            </div>
            <div>
              <h1 class="font-medium">ลองจิจูด</h1>
              <span class="text-gray-400">{{ data.lng }}</span>
            </div>
            <div>
              <h1 class="font-medium">รัศมี (เมตร)</h1>
              <span class="text-gray-400">{{ data.radius }}</span>
            </div>
            <div>
              <h1 class="font-medium">เงื่อนไข</h1>
              <div class="flex w-full">
                <img v-if="data.in_out == 1" src="@/assets/images/tick.svg" alt="" />
                <img v-else src="@/assets/images/false.svg" alt="" />
              </div>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="editMark(data, index)" class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="deleteMark(data.id)" class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="flex justify-end items-center gap-2 text-sm text-h1mute mt-5">
        <v-pagination
          v-model="current_page"
          :pages="last_page"
          :range-size="1"
          @update:modelValue="getPaginateNo"
          hideFirstButton
          hideLastButton
        />
      </div> -->
    </div>
  </main>
</template>

<script>
import debounce from "lodash/debounce";

var data = {
  name: "",
  lat: "",
  lng: "",
  radius: null,
  in_out: null,
};
export default {
  name: "mapview",
  inheritAttrs: false,
  data() {
    return {
      popUp: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      current_page: 1,
      pages: null,
      mapOption: {
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
      },
      is_marker: false,
      iconBase:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/",
      form: { ...data },
      form2: {
        ...data,
      },
      errors: {
        lat: "",
        lng: "",
        radius: "",
        in_out: "",
      },
      searchPoint: {
        lat: "",
        lng: "",
      },
      zoom: 17,
      center: { lat: 0, lng: 0 },
      markers: [
        {
          id: 2,
          name: "Gentech Wareshouse",
          position: { lat: 19.929579, lng: 99.8594181 },
        },
      ],
      origin_array_number: 0,
      not_allowed_option: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      },
      allowed_option: {
        strokeColor: "#4CAF50",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#4CAF50",
        fillOpacity: 0.35,
      },

      infoPosition: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },

  methods: {
    getPosition(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
      };
    },

    toggleAccordion(id, chevronName) {
      for (let i in this.markers) {
        if (i != id) {
          this.markers[i].open = false;
        }
      }
      this.markers[id].open = !this.markers[id].open;
      if (this.markers[id].open) {
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
      this.popUp = false;
      this.form = { ...data };
    },
    set_mark_on_map(event) {
      this.form = { ...data };
      // this.is_marker = true;
      this.form.lat = event.latLng.lat();
      this.form.lng = event.latLng.lng();
      // if (this.markers.length > this.origin_array_number) {
      //   this.markers.splice(-1, 1);
      // }
      // if (this.is_marker) {
      //   this.form.lat = event.latLng.lat();
      //   this.form.lng = event.latLng.lng();
      //   this.getAddress(this.form.lat, this.form.lng);
      //   this.markers.push({
      //     id: "",
      //     name: this.form.name,
      //     position: { lat: this.form.lat, lng: this.form.lng },
      //   });
      // }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(this.center.lat + "," + this.center.lng);
      });
    },
    getMarkers() {
      this.axios
        .get("map/get-markers")
        .then((response) => {
          this.markers = response.data.data;
          this.origin_array_number = response.data.data.length;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addMarker() {
      this.loading = true;
      let inside = document.getElementById("inside");
      if (inside) {
        if (inside.checked) {
          this.form.in_out = 0; //inside
        }
      }
      let outside = document.getElementById("outside");
      if (outside) {
        if (outside.checked) {
          this.form.in_out = 1; //outside
        }
      }
      this.axios
        .post("map/save-marker", this.form)
        .then((response) => {
          let successStatus = response.data.success;
          if (successStatus == false) {
            let messageError = response.data.message;
            if (
              typeof messageError === "string" ||
              messageError instanceof String
            ) {
              this.msgStatus = false;
              this.replyMsg = messageError;
            }

            let latError = response.data.message.lat;
            let lngError = response.data.message.lng;
            let radiusError = response.data.message.radius;
            let in_outError = response.data.message.in_out;

            this.errors.lat = latError ? latError[0] : "";
            this.errors.lng = lngError ? lngError[0] : "";
            this.errors.radius = radiusError ? radiusError[0] : "";
            this.errors.in_out = in_outError ? in_outError[0] : "";
          }
          if (successStatus == true) {
            this.errors.lat = ""
            this.errors.lng = ""
            this.errors.radius = ""
            this.errors.in_out = ""
            this.getMarkers();
            this.$swal
              .fire(
                this.is_marker ? "Update" : "Added!",
                response.data.message,
                "success"
              )
              .finally(() => {
                this.popUp = false;
                this.loading = false;
              });
            this.editMode = false;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          this.form = { ...data };
        });
    },
    setPlace(place) {
      this.center.lat = place.geometry.location.lat();
      this.center.lng = place.geometry.location.lng();
    },
    toggleInfo(marker, key, edit) {
      if (edit === true) {
        this.form2 = marker;
        this.form = { ...data };
        console.log("form2");
      } else if (edit === false) {
        this.form = marker;
        this.form2 = { ...data };
        console.log("form1");
      }
      this.infoPosition = this.getPosition(marker);
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
    centerChanged(e, m) {
      if (this.is_marker) {
        this.form = m;
        this.form.lat = e.lat();
        this.form.lng = e.lng();
      }
    },
    radiusChanged(radius, m) {
      if (this.is_marker) {
        this.form = m;
        this.form.radius = radius;
      }
    },
    clickCirle(m) {
      this.form = m;
    },
    show_to_edit() {
      this.is_marker = !this.is_marker;
    },
    editMark(marker, index) {
      this.is_marker = true;
      this.popUp = true;
      this.form = marker;
      this.toggleInfo(marker, index, true);
    },
    errorBorder(name) {
      return this.errors[name] ? "!border-red-500 " : "!border-slate-300";
    },
    errorText(name) {
      return this.errors[name] ? "!text-red-500 text-center" : "!text-primary";
    },
    getAddress(latitude, longitude) {
      this.axios
        .get(`map/get-address/${latitude}/${longitude}`)
        .then(() => { })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      var self = this;
      Object.keys(this.errors).forEach(function (key) {
        self.errors[key] = "";
      });
      Object.keys(this.form).forEach(function (key) {
        self.form[key] = "";
      });
    },
    deleteMark(id) {
      this.$swal({
        showCancelButton: true,
        title: "คุณต้องการลบข้อมูลนี้ ?",
        html: "<span class='text-sm'>หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้</span>",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete("map/delete-marker/" + id)
            .then(() => { })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
              this.form = { ...data };
              this.$swal({
                icon: "success",
                title: "Success",
                text: "ลบสำเร็จ!",
              }).then(() => {
                this.getMarkers();
              });
            });
        }
      });
    },
  },

  mounted() {
    this.getMarkers();
    this.geolocate();
    debounce(() => { }, 500);
  },

  watch: {
    // form: {
    //   deep: true,
    //   immediate: true,
    //   handler(val) {
    //     console.log(val);
    //     if (!isNaN(val.radius)) {
    //       val.radius = val.radius == "" ? parseInt(0) : parseInt(val.radius);
    //     }
    //     if (!isNaN(val.lat)) {
    //       val.lat = val.lat == "" ? parseFloat(0) : parseFloat(val.lat);
    //     }
    //     if (!isNaN(val.lng)) {
    //       val.lng = val.lng == "" ? parseFloat(0) : parseFloat(val.lng);
    //     }
    //   },
    // },
  },
};
</script>

<style>
div.box.card {
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 50px;
  background-color: #fff;
}

div.gmnoprint[role="menubar"] {
  left: 5px !important;
  top: 10px !important;
}

button.gm-control-active.gm-fullscreen-control {
  top: 10px !important;
  right: 5px !important;
}
</style>

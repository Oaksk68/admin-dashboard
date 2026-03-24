import { reactive } from "vue";
import moment from "moment";
import $ from "jquery";

export const globalProperties = (app) => {
  app.config.globalProperties.$validateMsg = function (errorObj) {
    var self = this;
    Object.keys(self.errors).forEach(function (key) {
      self.errors[key] = "";
    });
    Object.keys(errorObj).forEach(function (key) {
      self.errors[key] = errorObj[key][0];
    });
  };

  app.config.globalProperties.$img_path =
    "https://onela.yoursrecord.com/backend/img/user/";

  app.config.globalProperties.$logo_path =
    "https://onela.yoursrecord.com/backend/img/company/";

  app.config.globalProperties.$usr_role = "";

  app.config.globalProperties.$set_usr_role = function (role) {
    this.$usr_role = role;
  };

  app.config.globalProperties.$errorMsg = function (errorStr) {
    let eMsg = null;
    if (typeof errorStr === "string" || errorStr instanceof String) {
      eMsg = errorStr;
    }
    return eMsg;
  };

  app.config.globalProperties.$errorBorder = function (name) {
    return this.errors[name] ? "!border-red-500" : "";
  };

  app.config.globalProperties.$errorText = function (name) {
    return this.errors[name] ? "!text-red-500 !text-sm" : "";
  };

  app.config.globalProperties.$getPagination = async function (
    url,
    name,
    filter,
    loading
  ) {
    var self = this;
    if (filter && loading !== true) {
      this.$filter = filter;
      self.loading = false;
    } else if (loading == true) {
      self.loading = true;
    }

    await self.axios
      .post(`${url}?page=${this.$paginateData.current_page}`, filter)
      .then((response) => {
        const resData = response.data[name];
        this.$paginateData.last_page = resData.last_page;
        self.tableData = resData.data;
        console.log(self.tableData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        self.loading = false;
      });
  };

  app.config.globalProperties.$toggleAccordion = function (id, chevron) {
    var self = this;
    for (let i in self.tableData) {
      if (i != id) {
        self.tableData[i].open = false;
        document
          .querySelector(`#${chevron}-chevron-${i}`)
          .classList.remove("rotate");
      }
    }
    self.tableData[id].open = !self.tableData[id].open;
    if (self.tableData[id].open) {
      document
        .querySelector(`#${chevron}-chevron-${id}`)
        .classList.toggle("rotate");
    } else {
      document
        .querySelector(`#${chevron}-chevron-${id}`)
        .classList.remove("rotate");
    }
  };
  // app.config.globalProperties.$filteredList = function (data) {
  //   var self = this;
  //   return data.filter((list) => {
  //     return list.name.toLowerCase().includes(self.filter.search.toLowerCase());
  //   });
  // };

  app.config.globalProperties.$format = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  app.config.globalProperties.$paginateData = reactive({
    current_page: 1,
    last_page: null,
  });

  app.config.globalProperties.$filter = reactive({
    listNum: "",
    searchQuery: "",
  });

  app.config.globalProperties.$getPaginateNo = async function (
    url,
    filter,
    loading
  ) {
    var self = this;
    if (filter && loading !== true) {
      this.$filter = filter;
      self.loading = false;
      $("#loader").hide();
    } else if (loading == true) {
      self.loading = true;
      $("#loader").show();
    }

    await self.axios
      .post(`${url}?page=${this.$paginateData.current_page}`, filter)
      .then((response) => {
        const resData = response.data[url];
        this.$paginateData.last_page = resData.last_page;
        self.tableData = resData.data;
        console.log(self.tableData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        self.loading = false;
        $("#loader").hide();
      });
  };

  app.config.globalProperties.$getEmployeePaginateNo = async function (
    url,
    name,
    filter,
    loading
  ) {
    var self = this;
    if (filter && loading !== true) {
      this.$filter = filter;
      self.loading = false;
      $("#loader").hide();
    } else if (loading == true) {
      self.loading = true;
      $("#loader").show();
    }

    if (!name) {
      await self.axios
        .post(`${url}?page=${this.$paginateData.current_page}`, filter)
        .then((response) => {
          const resData = response.data[url];
          this.$paginateData.last_page = resData.last_page;
          self.tableData = resData.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          self.loading = false;
          $("#loader").hide();
        });
    } else {
      await self.axios
        .post(`${url}?page=${this.$paginateData.current_page}`, filter)
        .then((response) => {
          const resData = response.data[name];
          this.$paginateData.last_page = resData.last_page;
          self.tableData = resData.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          self.loading = false;
          $("#loader").hide();
        });
    }
  };

  app.config.globalProperties.$getEmployeePaginateReport = async function (
    url,
    filter,
    loading,
    name
  ) {
    var self = this;
    if (!filter && loading !== "loading") {
      this.$filter = filter;
      self.loading = false;
    } else {
      self.loading = true;
    }
    if (!name) {
      await self.axios
        .post(`${url}?page=${this.$paginateData.current_page}`, filter)
        .then((response) => {
          this.$paginateData.last_page =
            response.data.employee.monthly_laos.last_page;
          self.tableData = response.data.employee.monthly_laos.data;
          self.averageLate = response.data.averageLate;
          self.totalFinePoints = response.data.totalFinePoints;
          self.data = response.data.employee;
          self.empName = response.employee_name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          self.loading = false;
        });
    } else {
      await self.axios
        .post(`${url}?page=${this.$paginateData.current_page}`, filter)
        .then((res) => {
          this.$paginateData.last_page = res.data[name].last_page;
          self.avg_intime = res.data.avg_intime;
          self.avgEO = res.data.averageEO;
          self.avgOT = res.data.averageOT;
          self.cal_point = res.data.cal_point;
          self.tableData = res.data[name].data;
          self.data = res.data.employees;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          self.loading = false;
        });
    }
  };

  app.config.globalProperties.$getPaginateReport = async function (
    url,
    filter,
    loading
  ) {
    var self = this;
    if (!filter && loading !== "loading") {
      this.$filter = filter;
      self.loading = false;
    } else {
      self.loading = true;
      filter.date = filter.month.year + "-" + filter.month.month;
      console.log(filter);
    }
    await self.axios
      .post(`${url}?page=${this.$paginateData.current_page}`, filter)
      .then((response) => {
        this.$paginateData.last_page = response.data.employees.last_page;
        self.tableData = response.data.employees.data;
        self.data = response.data.employees;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        self.loading = false;
      });
  };

  app.config.globalProperties.$deleteData = function (url, id) {
    var self = this;
    self
      .$swal({
        showCancelButton: true,
        html: "<h1 class='text-[25px] md:text-3xl'>คุณต้องการลบข้อมูลนี้ ?</h1> <br/> <span class='text-sm'>หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้</span>",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      })
      .then((result) => {
        if (result.isConfirmed) {
          self.axios
            .delete(`${url}/delete/${id}`)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              self.loading = false;
              self
                .$swal({
                  icon: "success",
                  html: "<h1 class='text-[25px] md:text-3xl'>ลบสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการลบข้อมูลเรียบร้อยแล้ว</span>",
                  confirmButtonText: "ตกลง",
                })
                .then(() => {
                  this.$getPaginateNo(url + "s");
                });
            });
        }
      });
  };

  app.config.globalProperties.$deleteCompanyList = function (url1, url2, id) {
    var self = this;
    self
      .$swal({
        showCancelButton: true,
        html: "<h1 class='text-[25px] md:text-3xl'>คุณต้องการลบข้อมูลนี้ ?</h1> <br/> <span class='text-sm'>หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้</span>",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      })
      .then((result) => {
        if (result.isConfirmed) {
          self.axios
            .delete(`${url1}/delete/${id}`)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              self.loading = false;
              self
                .$swal({
                  icon: "success",
                  html: "<h1 class='text-[25px] md:text-3xl'>ลบสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการลบข้อมูลเรียบร้อยแล้ว</span>",
                  confirmButtonText: "ตกลง",
                })
                .then(() => {
                  this.$getPaginateNo(url2);
                });
            });
        }
      });
  };

  app.config.globalProperties.$download = function (url, name) {
    let self = this;
    self.axios
      .post(url, self.filter, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${name}.xlsx`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  app.config.globalProperties.$moment = moment;
};

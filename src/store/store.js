import { createStore } from "vuex";
import authentication from "./modules/authentication";
import employee from "./modules/employee";
import shiftTime from "./modules/shiftTime";
import department from "./modules/department";
import checkin from "./modules/checkin";
import devices from "./modules/devices";
import leaveDays from "./modules/leaveDays";
import manageLevel from "./modules/manageLevel";
import userInfo from "./modules/userInfo";
import chartData from "./modules/chartData";
import packages from "./modules/packages";
import modifyCompany from "./modules/modifyCompany";

export default createStore({
  modules: {
    authentication,
    employee,
    shiftTime,
    department,
    checkin,
    devices,
    leaveDays,
    manageLevel,
    userInfo,
    chartData,
    packages,
    modifyCompany,
  },
});

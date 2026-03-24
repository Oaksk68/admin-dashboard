import { createRouter, createWebHistory, RouterView } from "vue-router";
import store from "@/store/store";
import VueCookies from "vue-cookies";

const routes = [
  //global routes
  {
    path: "/",
    redirect: "/th/login",
    component: () => import("@/global/LoginView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:lang",
    redirect: () => {
      return `/${store.state.authentication.appLanguage}/login`;
    },
    meta: {
      requiresAuth: false,
    },
    component: () => import("@/global/LoginView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      requiresAuth: false,
    },
    component: () => import("@/global/404.vue"),
  },
  {
    path: "/:lang",
    component: RouterView,
    children: [
      {
        path: "landing",
        name: "Landing",
        meta: {
          hideMenu: true,
          requiresAuth: false,
        },
        component: () => import("@/global/LandingPage.vue"),
        children: [
          {
            path: "",
            name: "Home",
            meta: {
              hideMenu: true,
              requiresAuth: false,
            },
            component: () => import("@/global/Home.vue"),
          },
          {
            path: "",
            name: "SubmitPackage",
            meta: {
              hideMenu: true,
              requiresAuth: false,
            },
            component: () => import("@/global/SubmitPackage.vue"),
          },
          {
            path: "",
            name: "SubmitSuccess",
            meta: {
              hideMenu: true,
              requiresAuth: false,
            },
            component: () => import("@/global/SubmitSuccess.vue"),
          },
        ],
      },

      {
        path: "login",
        name: "Login",
        meta: { hideMenu: true, requiresAuth: false },
        component: () => import("@/global/LoginView.vue"),
      },
      {
        path: "choose",
        name: "Choose",
        meta: { hideMenu: true, requiresAuth: false },
        component: () => import("@/global/ChooserView.vue"),
      },
      {
        path: "register",
        name: "Register",
        meta: { hideMenu: true, requiresAuth: false },
        component: () => import("@/global/RegisterView.vue"),
      },
      {
        path: "companyreg",
        name: "Companyreg",
        meta: { hideMenu: true, requiresAuth: false },
        component: () => import("@/global/CompanyRegView.vue"),
      },
      {
        path: "reset-password-form",
        name: "ResetPassword",
        meta: { hideMenu: true, requiresAuth: false },
        component: () => import("@/global/ResetPassword.vue"),
      },
      {
        path: "forgotpassword",
        name: "Forgot",
        meta: { hideMenu: true, requiresAuth: false },
        component: () => import("@/global/ForgotPassword.vue"),
      },
    ],
  },

  // admin routes
  {
    path: "/:lang",
    redirect: "/th/login",
    component: () => import("@/MainContent.vue"),
    children: [
      {
        path: "company-list",
        meta: { requiresAuth: true, role: 0 },
        children: [
          {
            path: "",
            name: "CompanyList",
            meta: { requiresAuth: true, role: 0 },
            component: () => import("@/admin/views/Company/CompanyList.vue"),
            props: true,
          },
          {
            path: "companyinfo/:id?",
            name: "CompanyInfo",
            meta: { requiresAuth: true, role: 0 },
            component: () => import("@/admin/views/Company/CompanyView.vue"),
            props: true,
          },
          {
            path: "employee-list/:id?",
            name: "EmployeeList",
            meta: { requiresAuth: true, role: 0 },
            component: () =>
              import("@/admin/views/Company/Employee/EmployeeList.vue"),
            props: true,
          },
          {
            path: "attendance",
            name: "Attendance",
            meta: { requiresAuth: true, role: 0 },
            component: () =>
              import("@/admin/views/Company/Attendance/Attendance.vue"),
          },
          {
            path: "devices/:id?",
            name: "DeviceList",
            meta: { requiresAuth: true, role: 0 },
            component: () =>
              import("@/admin/views/Company/Device/DeviceList.vue"),
          },
        ],
      },
      {
        path: "company-group",
        children: [
          {
            path: "",
            name: "CompanyGroup",
            meta: { requiresAuth: true, role: 0 },
            component: () =>
              import("@/admin/views/CompanyGroup/CompanyGroup.vue"),
          },
          {
            path: "add-company-group/",
            name: "AddCompanyGroup",
            meta: { requiresAuth: true, role: 0 },
            component: () =>
              import("@/admin/views/CompanyGroup/ModifyCompany.vue"),
          },
          {
            path: "modify-company/?:id",
            name: "ModifyCompany",
            meta: { requiresAuth: true, role: 0 },
            component: () =>
              import("@/admin/views/CompanyGroup/ModifyCompany.vue"),
          },
        ],
      },
      {
        path: "admin",
        name: "Admin",
        meta: { requiresAuth: true, role: 0 },
        component: () => import("@/admin/views/AdminPage/Admin.vue"),
      },
      {
        path: "admin-equipment",
        name: "Admin-Equipment",
        meta: { requiresAuth: true, role: 0 },
        component: () => import("@/admin/views/Equipment/EquipmentInfo.vue"),
      },
      {
        path: "package",
        children: [
          {
            path: "",
            name: "Package",
            component: () => import("@/admin/views/PackagePage/Package.vue"),
          },
          {
            path: "company-package/:id?",
            name: "companyPackage",
            component: () =>
              import("@/admin/views/PackagePage/CompanyPackage.vue"),
          },
        ],
      },
      {
        path: "device-category",
        name: "DeviceCategory",
        meta: { requiresAuth: true, role: 0 },
        component: () =>
          import("@/admin/views/DeviceCategory/DeviceCategory.vue"),
      },
      {
        path: "activity-log",
        name: "ActivityLog",
        meta: { requiresAuth: true, role: 0 },
        component: () => import("@/admin/views/ActivityLog/ActivityLog.vue"),
      },
      {
        path: "suggestion",
        name: "Suggestion",
        meta: { requiresAuth: true, role: 0 },
        component: () => import("@/admin/views/Suggestion/Suggestion.vue"),
      },
    ],
  },

  // company routes
  {
    path: "/:lang",
    component: () => import("@/MainContent.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { requiresAuth: true, role: 1 },
        component: () => import("@/company/views/Dashboard/DashboardView.vue"),
      },
      {
        path: "company",
        name: "Company",
        redirect: "company/companyinfo",
        children: [
          {
            path: "companyinfo",
            name: "companyInfo",
            meta: { requiresAuth: true, role: 1 },
            component: () => import("@/company/views/Company/CompanyView.vue"),
          },
          {
            path: "department",
            name: "DepartmentInfo",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Department/DepartmentView.vue"),
          },
          {
            path: "checkin",
            name: "CheckIn",
            meta: { requiresAuth: true, role: [1, 2] },
            component: () => import("@/company/views/CheckIn/CheckIn.vue"),
          },
          {
            path: "map",
            name: "MapView",
            meta: { requiresAuth: true, role: 1 },
            component: () => import("@/company/views/Map/Map.vue"),
          },
        ],
      },
      {
        path: "employee",
        meta: { requiresAuth: true, role: 1 },
        children: [
          {
            path: "",
            name: "Employee",
            meta: { requiresAuth: true, role: 1 },
            component: () => import("@/company/views/Employee/EmployeeTab.vue"),
          },
          {
            path: "employeeInfo/:id",
            name: "employeeInfo",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Employee/EmployeeInfo.vue"),
            props: true,
          },
          {
            path: "edit/:id",
            name: "editEmployee",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Employee/EditEmployeeInfo.vue"),
            props: true,
          },
          {
            path: "add",
            name: "addEmployee",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Employee/EditEmployeeInfo.vue"),
            props: true,
          },
        ],
      },

      {
        path: "equipment",
        name: "Equipment",
        meta: { requiresAuth: true, role: 1 },
        component: () => import("@/company/views/Equipment/EquipmentTab.vue"),
      },
      {
        path: "history",
        name: "History",
        meta: { requiresAuth: true, role: 1 },
        component: () => import("@/company/views/History/HistoryViewTab.vue"),
      },
      {
        path: "health",
        name: "Health",
        meta: { requiresAuth: true, role: 1 },
        component: () => import("@/company/views/Health/HealthViewTab.vue"),
      },
      {
        path: "calendar",
        name: "Calendar",
        meta: { requiresAuth: true, role: [1, 2] },
        component: () => import("@/company/views/Calendar/CalendarViewTab.vue"),
      },
      {
        path: "report",
        redirect: "report/monthlyattendance",
        children: [
          {
            path: "monthlyattendance",
            name: "MonthlyAttendance",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import(
                "@/company/views/Report/MonthlyAttendance/MonthlyAttendanceTab.vue"
              ),
          },
          {
            path: "monthlycheckin-out",
            name: "MonthlyCheckIn-Out",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import(
                "@/company/views/Report/MonthlyCheck-in-out/MonthlyCheckin-out-Tab.vue"
              ),
          },

          {
            path: "monthlylateattendance",
            name: "MonthlyLateAttendance",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import(
                "@/company/views/Report/LateAttendance/MonthlyLateAttendanceTab.vue"
              ),
          },
          {
            path: "monthly-early-leave",
            name: "MonthlyEarlyLeave",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import(
                "@/company/views/Report/EarlyLeave/MonthlyEarlyLeaveTab.vue"
              ),
          },
          {
            path: "monthlyovertime",
            name: "MonthlyOvertime",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Report/Overtime/MonthlyOvertimeTab.vue"),
          },
          {
            path: "annual-leave",
            name: "AnnualLeave",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Report/AnnualLeave/AnnualLeaveTab.vue"),
          },
          {
            path: "annual-in-out",
            name: "Annual-In-Out",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import(
                "@/company/views/Report/Annual-In-Out/Annual-In-Out-Tab.vue"
              ),
          },
          {
            path: "healthreport",
            name: "HealthReport",
            meta: { requiresAuth: true, role: 1 },
            component: () =>
              import("@/company/views/Report/HealthReport/HealthReportTab.vue"),
          },
        ],
      },
    ],
  },

  //employee routes
  {
    path: "/:lang",
    component: () => import("@/MainContent.vue"),
    children: [
      {
        path: "employee-dashboard",
        name: "employee-dashboard",
        meta: { requiresAuth: true, role: 2 },
        component: () => import("@/employee/views/Dashboard/DashboardView.vue"),
      },

      {
        path: "employee-attendance",
        name: "Attendance",
        meta: { requiresAuth: true, role: 2 },
        component: () =>
          import("@/employee/views/Attendance/AttendanceTab.vue"),
      },

      {
        path: "request-leave",
        name: "RequestLeave",
        meta: { requiresAuth: true, role: 2 },
        component: () =>
          import("@/employee/views/RequestLeave/RequestLeave.vue"),
      },

      {
        path: "approve-leave",
        name: "ApproveLeave",
        meta: { requiresAuth: true, role: 2 },
        component: () =>
          import("@/employee/views/ApproveLeave/ApproveLeave.vue"),
      },

      {
        path: "employee-calendar",
        name: "employeeCalendar",
        meta: { requiresAuth: true, role: 2 },
        component: () =>
          import("@/employee/views/Calendar/CalendarViewTab.vue"),
      },
      {
        path: "report",
        redirect: "report/monthlyattendance",
        children: [
          {
            path: "employee-monthly-attendance",
            name: "Employee-MonthlyAttendance",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/MonthlyAttendance/MonthlyAttendanceTab.vue"
              ),
          },
          {
            path: "employee-monthy-intime-attendance",
            name: "Employee-MonthlyInTimeAttendance",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/MonthlyInTimeAttendance/MonthlyInTimeAttendance.vue"
              ),
          },
          {
            path: "employee-monthly-late-absence-onleave",
            name: "Employee-MonthlyLateAbsenceOnLeave",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/MonthlyLateAbsenceOnLeave/MonthlyLateAbsenceOnLeave.vue"
              ),
          },
          {
            path: "employee-monthlycheckin-out",
            name: "Employee-MonthlyCheckIn-Out",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/MonthlyCheck-in-out/MonthlyCheckin-out-Tab.vue"
              ),
          },

          {
            path: "employee-monthlylateattendance",
            name: "Employee-MonthlyLateAttendance",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/LateAttendance/MonthlyLateAttendanceTab.vue"
              ),
          },
          {
            path: "monthly-early-leave",
            name: "Employee-MonthlyEarlyLeave",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/EarlyLeave/MonthlyEarlyLeaveTab.vue"
              ),
          },
          {
            path: "employee-monthlyovertime",
            name: "Employee-MonthlyOvertime",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import("@/employee/views/Report/Overtime/MonthlyOvertimeTab.vue"),
          },
          {
            path: "employee-annual-leave",
            name: "Employee-AnnualLeave",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import("@/employee/views/Report/AnnualLeave/AnnualLeaveTab.vue"),
          },
          {
            path: "employee-annual-in-out",
            name: "Employee-Annual-In-Out",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/Annual-In-Out/Annual-In-Out-Tab.vue"
              ),
          },
          {
            path: "employee-healthreport",
            name: "Employee-HealthReport",
            meta: { requiresAuth: true, role: 2 },
            component: () =>
              import(
                "@/employee/views/Report/HealthReport/HealthReportTab.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   let locale = store.state.authentication.appLanguage || "th";
//   let authenticated = VueCookies.get("token");
//   let role = store.state.authentication.usr_role;

//   console.log(to);
//   console.log(from);
//   console.log(role);

//   // sessionStorage.setItem("path", to.name);
//   // sessionStorage.setItem("params", JSON.stringify(to.params));

//   if (to.meta.requiresAuth && !authenticated) {
//     next({ path: `/${locale}/login` });
//   } else if (to.meta.requiresAuth && authenticated) {
//     if (typeof to.meta.role == "object" && to.meta.role.includes(role)) {
//       return true;
//     }
//     if (to.meta.role == role) {
//       return true;
//     } else return false;
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   let role = store.state.userInfo.role;
//   let locale = store.state.authentication.appLanguage || "th";
//   let authenticated = VueCookies.get("token");
//   console.log(!!authenticated);
//   console.log("to", to);
//   console.log("from", from);
//   console.log("role", role);
//   const currentUserRoute = {
//     0: { name: "CompanyList", params: { lang: locale } },
//     1: { name: "dashboard", params: { lang: locale } },
//     2: { name: "employee-dashboard", params: { lang: locale } },
//   };

//   if (to.meta.requiresAuth && !authenticated) {
//     next({ path: `/${locale}/login` });
//   } else if (to.meta.requiresAuth && authenticated) {
//     if (role == null) {
//       //fetch user info if user role is empty due to refreshing or if url is being typed manually
//       console.log("role is null so fetch user info again");
//       await store.dispatch("fetchUserInfo");
//       role = store.state.userInfo.role;
//     }
//     if (Array.isArray(to.meta.role) && to.meta.role.includes(role)) {
//       console.log("array isArray line has passed the route");
//       next();
//     } else if (to.meta.role === role) {
//       next();
//       console.log("to.meta.role line has passed the route");
//     } else {
//       console.log(role);
//       console.log(currentUserRoute[role]);
//       next(currentUserRoute[role]); // Cancel navigation
//       // router.back(); // goes back to previous route
//       console.log("cancel navigation");
//     }
//   } else {
//     next(); // Proceed to the route if no auth required
//     console.log("no auth required has passed route");
//   }
// });

export default router;

<template>
  <div class="relative">
    <div v-if="!collapsed && windowWidth < 768" id="backdrop" @click="handleClickBackdrop"
      class="fixed w-screen h-screen bg-black opacity-25 z-[41] top-0 left-0"></div>
    <aside v-if="role == 0" id="admin-sidebar"
      class="md:flex flex-col fixed bg-[#fff] min-h-screen overflow-hidden rounded-r-3xl z-50 top-0 bottom-0 left-0 shadow-xl duration-300"
      :class="collapsed ? 'w-0 md:w-[58px]' : 'w-[60%] md:w-[275px]'">
      <div class="flex justify-between items-center my-3 mx-2">
        <div :class="`${collapsed ? 'invisible' : 'visible'
          } box flex justify-center items-center bg-white rounded-xl w-32 md:w-40 h-12 duration-200 ease-in-out`">
          <div @click="clickedLogo" class="flex justify-center items-center cursor-pointer" href="">
            <img class="w-3/4 h-auto" src="@/assets/images/Logo.png" alt="" />
          </div>
        </div>
        <button @click="sideBarExpand" :class="`${collapsed ? 'absolute left-4' : 'relative'
          } duration-200 ease-in-out`">
          <font-awesome-icon class="hidden md:inline text-3xl duration-200 text-origin pr-6 hover:text-blue-300"
            icon="fa-solid fa-bars" />
          <font-awesome-icon class="inline md:hidden text-3xl duration-200 text-origin pr-6 hover:text-blue-300"
            icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div id="scrollBar" class="pb-16">
        <ul class="text-sm md:text-base">
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'CompanyList' }"
              class="admin-sidebar flex items-center h-12 rounded-xl my-2 text-origin pl-[10px]">
              <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="admin-menu">
                <path
                  d="M21.7714 23.1579V24.885H0.0243256V23.1579C0.0243256 22.8503 0.276151 22.5984 0.583813 22.5984H1.53251H1.55684V22.5741V1.16763C1.55684 0.534002 2.06651 0.0243256 2.70014 0.0243256H19.0956C19.7292 0.0243256 20.2389 0.534001 20.2389 1.16763V22.5741V22.5984H20.2632H21.2119C21.5195 22.5984 21.7714 22.8503 21.7714 23.1579ZM3.84344 22.5254L3.84341 22.5498H3.86776H9.34101H9.36534V22.5255V19.2658C9.36534 18.9582 9.61716 18.7064 9.92482 18.7064H11.8709C12.1785 18.7064 12.4304 18.9582 12.4304 19.2658V22.5255V22.5498H12.4547H17.9279H17.9523V22.5255V2.3839V2.35966L17.928 2.35958L3.89217 2.31093L3.86779 2.31084L3.86776 2.33522L3.84344 22.5254ZM6.25167 7.20036V5.25432C6.25167 4.94666 6.50349 4.69483 6.81115 4.69483H8.7572C9.06486 4.69483 9.31669 4.94666 9.31669 5.25432V7.20036C9.31669 7.50803 9.06486 7.75985 8.7572 7.75985H6.81115C6.50349 7.75985 6.25167 7.50803 6.25167 7.20036ZM14.9845 7.75985H13.0385C12.7308 7.75985 12.479 7.50803 12.479 7.20036V5.25432C12.479 4.94666 12.7308 4.69483 13.0385 4.69483H14.9845C15.2922 4.69483 15.544 4.94666 15.544 5.25432V7.20036C15.544 7.50803 15.2922 7.75985 14.9845 7.75985ZM8.7572 12.4304H6.81115C6.50349 12.4304 6.25167 12.1785 6.25167 11.8709V9.92483C6.25167 9.61716 6.50349 9.36534 6.81115 9.36534H8.7572C9.06486 9.36534 9.31669 9.61716 9.31669 9.92483V11.8709C9.31669 12.1785 9.06486 12.4304 8.7572 12.4304ZM14.9845 12.4304H13.0385C12.7308 12.4304 12.479 12.1785 12.479 11.8709V9.92483C12.479 9.61716 12.7308 9.36534 13.0385 9.36534H14.9845C15.2922 9.36534 15.544 9.61716 15.544 9.92483V11.8709C15.544 12.1785 15.2922 12.4304 14.9845 12.4304ZM9.31669 14.5953V16.5414C9.31669 16.849 9.06486 17.1009 8.7572 17.1009H6.81115C6.50349 17.1009 6.25167 16.849 6.25167 16.5414V14.5953C6.25167 14.2877 6.50349 14.0358 6.81115 14.0358H8.7572C9.06486 14.0358 9.31669 14.2877 9.31669 14.5953ZM14.9845 17.1009H13.0385C12.7308 17.1009 12.479 16.849 12.479 16.5414V14.5953C12.479 14.2877 12.7308 14.0358 13.0385 14.0358H14.9845C15.2922 14.0358 15.544 14.2877 15.544 14.5953V16.5414C15.544 16.849 15.2922 17.1009 14.9845 17.1009Z"
                  stroke-width="0.0486511" />
              </svg>
              <span :class="`${collapsed ? 'hidden' : ''}`" class="ml-5">{{
                $t("company")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'CompanyGroup' }"
              class="admin-sidebar flex items-center h-12 rounded-xl my-2 text-origin pl-[10px]">
              <!-- <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="admin-menu">
                <path
                  d="M21.7714 23.1579V24.885H0.0243256V23.1579C0.0243256 22.8503 0.276151 22.5984 0.583813 22.5984H1.53251H1.55684V22.5741V1.16763C1.55684 0.534002 2.06651 0.0243256 2.70014 0.0243256H19.0956C19.7292 0.0243256 20.2389 0.534001 20.2389 1.16763V22.5741V22.5984H20.2632H21.2119C21.5195 22.5984 21.7714 22.8503 21.7714 23.1579ZM3.84344 22.5254L3.84341 22.5498H3.86776H9.34101H9.36534V22.5255V19.2658C9.36534 18.9582 9.61716 18.7064 9.92482 18.7064H11.8709C12.1785 18.7064 12.4304 18.9582 12.4304 19.2658V22.5255V22.5498H12.4547H17.9279H17.9523V22.5255V2.3839V2.35966L17.928 2.35958L3.89217 2.31093L3.86779 2.31084L3.86776 2.33522L3.84344 22.5254ZM6.25167 7.20036V5.25432C6.25167 4.94666 6.50349 4.69483 6.81115 4.69483H8.7572C9.06486 4.69483 9.31669 4.94666 9.31669 5.25432V7.20036C9.31669 7.50803 9.06486 7.75985 8.7572 7.75985H6.81115C6.50349 7.75985 6.25167 7.50803 6.25167 7.20036ZM14.9845 7.75985H13.0385C12.7308 7.75985 12.479 7.50803 12.479 7.20036V5.25432C12.479 4.94666 12.7308 4.69483 13.0385 4.69483H14.9845C15.2922 4.69483 15.544 4.94666 15.544 5.25432V7.20036C15.544 7.50803 15.2922 7.75985 14.9845 7.75985ZM8.7572 12.4304H6.81115C6.50349 12.4304 6.25167 12.1785 6.25167 11.8709V9.92483C6.25167 9.61716 6.50349 9.36534 6.81115 9.36534H8.7572C9.06486 9.36534 9.31669 9.61716 9.31669 9.92483V11.8709C9.31669 12.1785 9.06486 12.4304 8.7572 12.4304ZM14.9845 12.4304H13.0385C12.7308 12.4304 12.479 12.1785 12.479 11.8709V9.92483C12.479 9.61716 12.7308 9.36534 13.0385 9.36534H14.9845C15.2922 9.36534 15.544 9.61716 15.544 9.92483V11.8709C15.544 12.1785 15.2922 12.4304 14.9845 12.4304ZM9.31669 14.5953V16.5414C9.31669 16.849 9.06486 17.1009 8.7572 17.1009H6.81115C6.50349 17.1009 6.25167 16.849 6.25167 16.5414V14.5953C6.25167 14.2877 6.50349 14.0358 6.81115 14.0358H8.7572C9.06486 14.0358 9.31669 14.2877 9.31669 14.5953ZM14.9845 17.1009H13.0385C12.7308 17.1009 12.479 16.849 12.479 16.5414V14.5953C12.479 14.2877 12.7308 14.0358 13.0385 14.0358H14.9845C15.2922 14.0358 15.544 14.2877 15.544 14.5953V16.5414C15.544 16.849 15.2922 17.1009 14.9845 17.1009Z"
                  stroke-width="0.0486511" />
              </svg> -->
              <svg class="admin-menu" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"
                fill="none">
                <g clip-path="url(#clip0_268_3950)">
                  <mask id="path-1-inside-1_268_3950" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M13.5192 22.0151V19.9504H9.94402V17.1272C9.94402 16.8491 9.74638 16.6216 9.50483 16.6216H8.04088C7.79932 16.6216 7.60169 16.8491 7.60169 17.1272V19.9504H3.48432L3.50262 2.46361L14.0614 2.50575V11.6596H15.8181V1.45232C15.8181 0.891905 15.4265 0.44104 14.9398 0.44104H2.60594C2.11918 0.44104 1.72757 0.891905 1.72757 1.45232V19.9925H1.01389C0.772341 19.9925 0.574707 20.2201 0.574707 20.4982V22.0151H13.5192ZM4.59524 4.86729V6.54665C4.59524 6.82375 4.82196 7.05046 5.09905 7.05046H6.77841C7.05551 7.05046 7.28222 6.82375 7.28222 6.54665V4.86729C7.28222 4.5902 7.05551 4.36348 6.77841 4.36348H5.09905C4.82196 4.36348 4.59524 4.5902 4.59524 4.86729ZM10.473 7.05046H12.1524C12.4295 7.05046 12.6562 6.82375 12.6562 6.54665V4.86729C12.6562 4.5902 12.4295 4.36348 12.1524 4.36348H10.473C10.1959 4.36348 9.96921 4.5902 9.96921 4.86729V6.54665C9.96921 6.82375 10.1959 7.05046 10.473 7.05046ZM6.77841 11.0809H5.09905C4.82196 11.0809 4.59524 10.8542 4.59524 10.5771V8.89776C4.59524 8.62067 4.82196 8.39396 5.09905 8.39396H6.77841C7.05551 8.39396 7.28222 8.62067 7.28222 8.89776V10.5771C7.28222 10.8542 7.05551 11.0809 6.77841 11.0809ZM10.473 11.0809H12.1524C12.4295 11.0809 12.6562 10.8542 12.6562 10.5771V8.89776C12.6562 8.62067 12.4295 8.39396 12.1524 8.39396H10.473C10.1959 8.39396 9.96921 8.62067 9.96921 8.89776V10.5771C9.96921 10.8542 10.1959 11.0809 10.473 11.0809ZM7.28222 12.9282V14.6076C7.28222 14.8847 7.05551 15.1114 6.77841 15.1114H5.09905C4.82196 15.1114 4.59524 14.8847 4.59524 14.6076V12.9282C4.59524 12.6511 4.82196 12.4244 5.09905 12.4244H6.77841C7.05551 12.4244 7.28222 12.6511 7.28222 12.9282ZM10.473 15.1114H12.1524C12.4295 15.1114 12.6562 14.8847 12.6562 14.6076V12.9282C12.6562 12.6511 12.4295 12.4244 12.1524 12.4244H10.473C10.1959 12.4244 9.96921 12.6511 9.96921 12.9282V14.6076C9.96921 14.8847 10.1959 15.1114 10.473 15.1114Z" />
                  </mask>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M13.5192 22.0151V19.9504H9.94402V17.1272C9.94402 16.8491 9.74638 16.6216 9.50483 16.6216H8.04088C7.79932 16.6216 7.60169 16.8491 7.60169 17.1272V19.9504H3.48432L3.50262 2.46361L14.0614 2.50575V11.6596H15.8181V1.45232C15.8181 0.891905 15.4265 0.44104 14.9398 0.44104H2.60594C2.11918 0.44104 1.72757 0.891905 1.72757 1.45232V19.9925H1.01389C0.772341 19.9925 0.574707 20.2201 0.574707 20.4982V22.0151H13.5192ZM4.59524 4.86729V6.54665C4.59524 6.82375 4.82196 7.05046 5.09905 7.05046H6.77841C7.05551 7.05046 7.28222 6.82375 7.28222 6.54665V4.86729C7.28222 4.5902 7.05551 4.36348 6.77841 4.36348H5.09905C4.82196 4.36348 4.59524 4.5902 4.59524 4.86729ZM10.473 7.05046H12.1524C12.4295 7.05046 12.6562 6.82375 12.6562 6.54665V4.86729C12.6562 4.5902 12.4295 4.36348 12.1524 4.36348H10.473C10.1959 4.36348 9.96921 4.5902 9.96921 4.86729V6.54665C9.96921 6.82375 10.1959 7.05046 10.473 7.05046ZM6.77841 11.0809H5.09905C4.82196 11.0809 4.59524 10.8542 4.59524 10.5771V8.89776C4.59524 8.62067 4.82196 8.39396 5.09905 8.39396H6.77841C7.05551 8.39396 7.28222 8.62067 7.28222 8.89776V10.5771C7.28222 10.8542 7.05551 11.0809 6.77841 11.0809ZM10.473 11.0809H12.1524C12.4295 11.0809 12.6562 10.8542 12.6562 10.5771V8.89776C12.6562 8.62067 12.4295 8.39396 12.1524 8.39396H10.473C10.1959 8.39396 9.96921 8.62067 9.96921 8.89776V10.5771C9.96921 10.8542 10.1959 11.0809 10.473 11.0809ZM7.28222 12.9282V14.6076C7.28222 14.8847 7.05551 15.1114 6.77841 15.1114H5.09905C4.82196 15.1114 4.59524 14.8847 4.59524 14.6076V12.9282C4.59524 12.6511 4.82196 12.4244 5.09905 12.4244H6.77841C7.05551 12.4244 7.28222 12.6511 7.28222 12.9282ZM10.473 15.1114H12.1524C12.4295 15.1114 12.6562 14.8847 12.6562 14.6076V12.9282C12.6562 12.6511 12.4295 12.4244 12.1524 12.4244H10.473C10.1959 12.4244 9.96921 12.6511 9.96921 12.9282V14.6076C9.96921 14.8847 10.1959 15.1114 10.473 15.1114Z"
                    fill="#36A1EA" />
                  <path
                    d="M13.5192 22.0151V22.0571H13.5611V22.0151H13.5192ZM13.5192 19.9504H13.5611V19.9084H13.5192V19.9504ZM9.94402 19.9504H9.90203V19.9924H9.94402V19.9504ZM7.60169 19.9504V19.9924H7.64368V19.9504H7.60169ZM3.48432 19.9504L3.44233 19.9504L3.44229 19.9924H3.48432V19.9504ZM3.50262 2.46361L3.50278 2.42163L3.46068 2.42146L3.46063 2.46357L3.50262 2.46361ZM14.0614 2.50575H14.1034V2.46393L14.0616 2.46376L14.0614 2.50575ZM14.0614 11.6596H14.0194V11.7015H14.0614V11.6596ZM15.8181 11.6596V11.7015H15.8601V11.6596H15.8181ZM1.72757 19.9925V20.0345H1.76956V19.9925H1.72757ZM0.574707 22.0151H0.532723V22.0571H0.574707V22.0151ZM13.5611 22.0151V19.9504H13.4772V22.0151H13.5611ZM13.5192 19.9084H9.94402V19.9924H13.5192V19.9084ZM9.986 19.9504V17.1272H9.90203V19.9504H9.986ZM9.986 17.1272C9.986 16.8317 9.77493 16.5796 9.50483 16.5796V16.6636C9.71784 16.6636 9.90203 16.8666 9.90203 17.1272H9.986ZM9.50483 16.5796H8.04088V16.6636H9.50483V16.5796ZM8.04088 16.5796C7.77078 16.5796 7.55971 16.8317 7.55971 17.1272H7.64368C7.64368 16.8666 7.82787 16.6636 8.04088 16.6636V16.5796ZM7.55971 17.1272V19.9504H7.64368V17.1272H7.55971ZM7.60169 19.9084H3.48432V19.9924H7.60169V19.9084ZM3.5263 19.9505L3.5446 2.46365L3.46063 2.46357L3.44233 19.9504L3.5263 19.9505ZM3.50245 2.50559L14.0612 2.54773L14.0616 2.46376L3.50278 2.42163L3.50245 2.50559ZM14.0194 2.50575V11.6596H14.1034V2.50575H14.0194ZM14.0614 11.7015H15.8181V11.6176H14.0614V11.7015ZM15.8601 11.6596V1.45232H15.7762V11.6596H15.8601ZM15.8601 1.45232C15.8601 0.874467 15.4551 0.399056 14.9398 0.399056V0.483024C15.398 0.483024 15.7762 0.909342 15.7762 1.45232H15.8601ZM14.9398 0.399056H2.60594V0.483024H14.9398V0.399056ZM2.60594 0.399056C2.09063 0.399056 1.68559 0.874467 1.68559 1.45232H1.76956C1.76956 0.909342 2.14773 0.483024 2.60594 0.483024V0.399056ZM1.68559 1.45232V19.9925H1.76956V1.45232H1.68559ZM1.72757 19.9506H1.01389V20.0345H1.72757V19.9506ZM1.01389 19.9506C0.743794 19.9506 0.532723 20.2026 0.532723 20.4982H0.616691C0.616691 20.2375 0.800888 20.0345 1.01389 20.0345V19.9506ZM0.532723 20.4982V22.0151H0.616691V20.4982H0.532723ZM0.574707 22.0571H13.5192V21.9731H0.574707V22.0571ZM4.63723 6.54665V4.86729H4.55326V6.54665H4.63723ZM5.09905 7.00848C4.84514 7.00848 4.63723 6.80056 4.63723 6.54665H4.55326C4.55326 6.84694 4.79877 7.09245 5.09905 7.09245V7.00848ZM6.77841 7.00848H5.09905V7.09245H6.77841V7.00848ZM7.24024 6.54665C7.24024 6.80056 7.03232 7.00848 6.77841 7.00848V7.09245C7.0787 7.09245 7.32421 6.84694 7.32421 6.54665H7.24024ZM7.24024 4.86729V6.54665H7.32421V4.86729H7.24024ZM6.77841 4.40547C7.03232 4.40547 7.24024 4.61338 7.24024 4.86729H7.32421C7.32421 4.56701 7.0787 4.3215 6.77841 4.3215V4.40547ZM5.09905 4.40547H6.77841V4.3215H5.09905V4.40547ZM4.63723 4.86729C4.63723 4.61338 4.84514 4.40547 5.09905 4.40547V4.3215C4.79877 4.3215 4.55326 4.56701 4.55326 4.86729H4.63723ZM12.1524 7.00848H10.473V7.09245H12.1524V7.00848ZM12.6142 6.54665C12.6142 6.80056 12.4063 7.00848 12.1524 7.00848V7.09245C12.4527 7.09245 12.6982 6.84694 12.6982 6.54665H12.6142ZM12.6142 4.86729V6.54665H12.6982V4.86729H12.6142ZM12.1524 4.40547C12.4063 4.40547 12.6142 4.61338 12.6142 4.86729H12.6982C12.6982 4.56701 12.4527 4.3215 12.1524 4.3215V4.40547ZM10.473 4.40547H12.1524V4.3215H10.473V4.40547ZM10.0112 4.86729C10.0112 4.61338 10.2191 4.40547 10.473 4.40547V4.3215C10.1727 4.3215 9.92722 4.56701 9.92722 4.86729H10.0112ZM10.0112 6.54665V4.86729H9.92722V6.54665H10.0112ZM10.473 7.00848C10.2191 7.00848 10.0112 6.80056 10.0112 6.54665H9.92722C9.92722 6.84694 10.1727 7.09245 10.473 7.09245V7.00848ZM5.09905 11.1229H6.77841V11.039H5.09905V11.1229ZM4.55326 10.5771C4.55326 10.8774 4.79877 11.1229 5.09905 11.1229V11.039C4.84514 11.039 4.63723 10.831 4.63723 10.5771H4.55326ZM4.55326 8.89776V10.5771H4.63723V8.89776H4.55326ZM5.09905 8.35197C4.79877 8.35197 4.55326 8.59748 4.55326 8.89776H4.63723C4.63723 8.64386 4.84514 8.43594 5.09905 8.43594V8.35197ZM6.77841 8.35197H5.09905V8.43594H6.77841V8.35197ZM7.32421 8.89776C7.32421 8.59748 7.0787 8.35197 6.77841 8.35197V8.43594C7.03232 8.43594 7.24024 8.64386 7.24024 8.89776H7.32421ZM7.32421 10.5771V8.89776H7.24024V10.5771H7.32421ZM6.77841 11.1229C7.0787 11.1229 7.32421 10.8774 7.32421 10.5771H7.24024C7.24024 10.831 7.03232 11.039 6.77841 11.039V11.1229ZM12.1524 11.039H10.473V11.1229H12.1524V11.039ZM12.6142 10.5771C12.6142 10.831 12.4063 11.039 12.1524 11.039V11.1229C12.4527 11.1229 12.6982 10.8774 12.6982 10.5771H12.6142ZM12.6142 8.89776V10.5771H12.6982V8.89776H12.6142ZM12.1524 8.43594C12.4063 8.43594 12.6142 8.64386 12.6142 8.89776H12.6982C12.6982 8.59748 12.4527 8.35197 12.1524 8.35197V8.43594ZM10.473 8.43594H12.1524V8.35197H10.473V8.43594ZM10.0112 8.89776C10.0112 8.64386 10.2191 8.43594 10.473 8.43594V8.35197C10.1727 8.35197 9.92722 8.59748 9.92722 8.89776H10.0112ZM10.0112 10.5771V8.89776H9.92722V10.5771H10.0112ZM10.473 11.039C10.2191 11.039 10.0112 10.831 10.0112 10.5771H9.92722C9.92722 10.8774 10.1727 11.1229 10.473 11.1229V11.039ZM7.32421 14.6076V12.9282H7.24024V14.6076H7.32421ZM6.77841 15.1534C7.0787 15.1534 7.32421 14.9079 7.32421 14.6076H7.24024C7.24024 14.8615 7.03232 15.0694 6.77841 15.0694V15.1534ZM5.09905 15.1534H6.77841V15.0694H5.09905V15.1534ZM4.55326 14.6076C4.55326 14.9079 4.79877 15.1534 5.09905 15.1534V15.0694C4.84514 15.0694 4.63723 14.8615 4.63723 14.6076H4.55326ZM4.55326 12.9282V14.6076H4.63723V12.9282H4.55326ZM5.09905 12.3824C4.79877 12.3824 4.55326 12.628 4.55326 12.9282H4.63723C4.63723 12.6743 4.84514 12.4664 5.09905 12.4664V12.3824ZM6.77841 12.3824H5.09905V12.4664H6.77841V12.3824ZM7.32421 12.9282C7.32421 12.628 7.0787 12.3824 6.77841 12.3824V12.4664C7.03232 12.4664 7.24024 12.6743 7.24024 12.9282H7.32421ZM12.1524 15.0694H10.473V15.1534H12.1524V15.0694ZM12.6142 14.6076C12.6142 14.8615 12.4063 15.0694 12.1524 15.0694V15.1534C12.4527 15.1534 12.6982 14.9079 12.6982 14.6076H12.6142ZM12.6142 12.9282V14.6076H12.6982V12.9282H12.6142ZM12.1524 12.4664C12.4063 12.4664 12.6142 12.6743 12.6142 12.9282H12.6982C12.6982 12.628 12.4527 12.3824 12.1524 12.3824V12.4664ZM10.473 12.4664H12.1524V12.3824H10.473V12.4664ZM10.0112 12.9282C10.0112 12.6743 10.2191 12.4664 10.473 12.4664V12.3824C10.1727 12.3824 9.92722 12.628 9.92722 12.9282H10.0112ZM10.0112 14.6076V12.9282H9.92722V14.6076H10.0112ZM10.473 15.0694C10.2191 15.0694 10.0112 14.8615 10.0112 14.6076H9.92722C9.92722 14.9079 10.1727 15.1534 10.473 15.1534V15.0694Z"
                    fill="#36A1EA" mask="url(#path-1-inside-1_268_3950)" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M18.0924 13.2985C18.0924 12.8696 17.7447 12.5219 17.3158 12.5219C16.8868 12.5219 16.5391 12.8696 16.5391 13.2985V16.4052L13.4324 16.4052C13.0035 16.4052 12.6558 16.7529 12.6558 17.1818C12.6558 17.6108 13.0035 17.9585 13.4324 17.9585H16.5391V21.0652C16.5391 21.4941 16.8868 21.8419 17.3158 21.8419C17.7447 21.8419 18.0924 21.4941 18.0924 21.0652V17.9585H21.1991C21.628 17.9585 21.9758 17.6108 21.9758 17.1819C21.9758 16.7529 21.628 16.4052 21.1991 16.4052L18.0924 16.4052V13.2985Z"
                    fill="#36A1EA" />
                </g>
                <defs>
                  <clipPath id="clip0_268_3950">
                    <rect width="21.5741" height="21.5741" fill="white" transform="translate(0.574219 0.440063)" />
                  </clipPath>
                </defs>
              </svg>
              <span :class="`${collapsed ? 'hidden' : ''}`" class="ml-5">{{
                $t("companyGroup")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Admin' }"
              class="admin-sidebar flex items-center h-12 rounded-xl my-2 text-origin pl-[10px] ">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20" fill="none"
                class="admin-menu">
                <path xmlns="http://www.w3.org/2000/svg"
                  d="M0 18.1874L0.568357 18.188C0.569926 16.5504 1.04311 14.9479 1.93133 13.5721C2.81955 12.1963 4.08522 11.1054 5.57701 10.4299L6.38595 10.0636L5.71454 9.48243C5.16965 9.01078 4.73261 8.42742 4.43306 7.77195C4.13352 7.11649 3.9785 6.40425 3.9785 5.68358C3.9785 4.32694 4.51743 3.02586 5.47672 2.06657C6.43601 1.10728 7.73708 0.568358 9.09372 0.568358C10.4504 0.568358 11.7514 1.10728 12.7107 2.06657C13.67 3.02586 14.2089 4.32694 14.2089 5.68358C14.209 6.40425 14.0539 7.11649 13.7544 7.77195L14.2713 8.00819L13.7544 7.77195C13.4548 8.42742 13.0178 9.01078 12.4729 9.48243L11.8015 10.0636L12.6104 10.4299C14.1022 11.1054 15.3679 12.1963 16.2561 13.5721C17.1443 14.9479 17.6175 16.5504 17.6191 18.188L18.1874 18.1874H17.6191C17.6191 18.3382 17.5592 18.4827 17.4526 18.5893C17.346 18.6959 17.2015 18.7558 17.0507 18.7558C16.9 18.7558 16.7554 18.6959 16.6488 18.5893C16.5423 18.4827 16.4824 18.3382 16.4824 18.1874C16.4824 16.2279 15.7039 14.3485 14.3183 12.9629C12.9326 11.5772 11.0533 10.7988 9.09372 10.7988C7.13413 10.7988 5.2548 11.5772 3.86916 12.9629C2.48352 14.3485 1.70507 16.2279 1.70507 18.1874C1.70507 18.3382 1.64519 18.4827 1.53861 18.5893L1.94049 18.9912L1.5386 18.5893C1.43202 18.6959 1.28746 18.7558 1.13672 18.7558C0.985975 18.7558 0.841412 18.6959 0.734827 18.5893L0.332936 18.9912L0.734825 18.5893C0.628239 18.4827 0.568358 18.3382 0.568358 18.1874H0ZM0 18.1874C0.00167308 16.4407 0.506401 14.7313 1.45384 13.2638C2.29041 11.968 3.44088 10.9092 4.79412 10.1831L0 18.1874ZM19.2938 9.58299L19.7404 9.08008C20.3951 8.34281 20.8227 7.43201 20.9719 6.45734C21.121 5.48268 20.9853 4.48567 20.5811 3.58634C20.1768 2.68701 19.5212 1.92368 18.6932 1.38825C17.8653 0.852815 16.9002 0.568094 15.9142 0.568358L15.914 0.568358C15.7633 0.568358 15.6187 0.628238 15.5121 0.734826C15.4055 0.841414 15.3457 0.985979 15.3457 1.13672C15.3457 1.28745 15.4055 1.43202 15.5121 1.53861C15.6187 1.64519 15.7633 1.70507 15.914 1.70507C16.9692 1.70507 17.9811 2.12424 18.7272 2.87035C19.4734 3.61646 19.8925 4.62841 19.8925 5.68358V5.68511C19.8906 6.38166 19.7059 7.06552 19.3568 7.66829C19.0077 8.27106 18.5065 8.77161 17.9033 9.11988L17.9031 9.12C17.8188 9.1686 17.7484 9.23802 17.6987 9.32162C17.649 9.40507 17.6215 9.49987 17.6189 9.59696C17.6166 9.69329 17.6388 9.78863 17.6835 9.87402C17.7283 9.95953 17.7941 10.0322 17.8747 10.0853L17.8775 10.0872L18.2986 10.3679L18.4102 10.428C19.8725 11.1247 21.1061 12.2235 21.9666 13.5959C22.8292 14.9718 23.2809 16.5655 23.2686 18.1893M19.2938 9.58299L22.7002 18.1874M19.2938 9.58299L19.8641 9.93944M19.2938 9.58299L19.8641 9.93944M23.2686 18.1893C23.2686 18.1902 23.2686 18.1911 23.2685 18.1919L22.7002 18.1874M23.2686 18.1893C23.2686 18.1887 23.2686 18.1881 23.2686 18.1874H22.7002M23.2686 18.1893C23.2691 18.3394 23.3289 18.4832 23.435 18.5893C23.5416 18.6959 23.6862 18.7558 23.8369 18.7558C23.9877 18.7558 24.1322 18.6959 24.2388 18.5893L24.6407 18.9912M22.7002 18.1874C22.7002 18.4889 22.82 18.7781 23.0331 18.9912C23.2463 19.2044 23.5354 19.3242 23.8369 19.3242C24.1384 19.3242 24.4275 19.2044 24.6407 18.9912M24.6407 18.9912L24.2388 18.5893C24.3454 18.4827 24.4053 18.3382 24.4053 18.1874V18.1844C24.4141 16.537 24.0014 14.9146 23.2066 13.4715C22.4118 12.0285 21.2612 10.8126 19.8641 9.93944M24.6407 18.9912L19.8641 9.93944M20.1653 9.45747C20.3277 9.55896 20.487 9.66482 20.6429 9.77489C20.6255 9.79498 20.608 9.81497 20.5903 9.83486L20.1653 9.45747ZM20.1653 9.45747C20.2924 9.31436 20.4118 9.16537 20.5232 9.01114C20.5043 8.9992 20.4855 8.98732 20.4666 8.9755L20.1653 9.45747ZM13.2827 9.48937C13.2153 9.45695 13.1475 9.4253 13.0793 9.39441L12.8449 9.91216L13.2169 10.3419C13.2768 10.29 13.3356 10.2371 13.3933 10.1831L13.2827 9.48937ZM6.88339 8.99158C7.53765 9.42875 8.30685 9.66208 9.09372 9.66208C10.1489 9.66208 11.1608 9.24292 11.907 8.49681C12.6531 7.75069 13.0722 6.73874 13.0722 5.68358C13.0722 4.8967 12.8389 4.1275 12.4017 3.47324C11.9646 2.81898 11.3432 2.30904 10.6162 2.00792C9.88926 1.7068 9.08931 1.62801 8.31756 1.78152C7.5458 1.93503 6.8369 2.31395 6.2805 2.87035C5.72409 3.42675 5.34518 4.13566 5.19167 4.90741C5.03815 5.67916 5.11694 6.47911 5.41807 7.20608C5.71919 7.93306 6.22912 8.55442 6.88339 8.99158Z"
                  stroke-width="1.13672" />
              </svg>
              <div class="ml-5" :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("admin")
              }}</div>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Admin-Equipment' }"
              class="admin-sidebar flex justify-start items-center h-12 rounded-xl my-3 text-origin pl-[10px] ">
              <font-awesome-icon size="xl" icon="fa-solid fa-mobile-screen-button" class="admin-menu" />
              <div class="ml-5" :class="`${collapsed ? 'hidden' : ''}`">
                {{ $t("equipment") }}</div>
            </router-link>
          </li>

          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Package' }"
              class="admin-sidebar flex justify-start items-center h-12 rounded-xl my-3 text-origin pl-[10px] active:text-blue-200">
              <font-awesome-icon size="lg" icon="fa-solid fa-list-check" class="admin-menu" />
              <div class="ml-5" :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("package")
              }}</div>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'DeviceCategory' }"
              class="admin-sidebar flex justify-start items-center h-12 rounded-xl my-3 text-origin pl-[10px] active:text-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                class="admin-menu">
                <path
                  d="M280-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640v80H160v480h120v80Zm160-100q25 0 42.5-17.5T500-320q0-25-17.5-42.5T440-380q-25 0-42.5 17.5T380-320q0 25 17.5 42.5T440-260Zm-80 100v-71q-19-17-29.5-40T320-320q0-26 10.5-49t29.5-40v-71h160v71q19 17 29.5 40t10.5 49q0 26-10.5 49T520-231v71H360Zm480 0H640q-17 0-28.5-11.5T600-200v-360q0-17 11.5-28.5T640-600h200q17 0 28.5 11.5T880-560v360q0 17-11.5 28.5T840-160Zm-160-80h120v-280H680v280Zm0 0h120-120Z" />
              </svg>
              <span class="ml-5" :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("deviceCategories")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'ActivityLog' }"
              class="admin-sidebar flex justify-start items-center h-12 rounded-xl my-3 text-origin pl-[10px] active:text-blue-200">
              <font-awesome-icon icon="fa-solid fa-file-lines" size="lg" class="admin-menu w-[22px]" />
              <div class="ml-5" :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("log")
              }}</div>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Suggestion' }"
              class="admin-sidebar pl-[10px] flex justify-start items-center h-12 rounded-xl my-3 text-origin active:text-blue-200">
              <font-awesome-icon size="lg" icon="fa-regular fa-message" class="admin-menu" />
              <div class="ml-5" :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("feedback")
              }}</div>
            </router-link>
          </li>
        </ul>
        <div class="absolute left-0 bottom-0 bg-[#fff] w-full border-t border-teal-50">
          <li class="list-none">
            <button id="logout" @click="logout"
              class="flex items-center h-12 rounded-xl pl-5 text-origin active:text-blue-200">
              <font-awesome-icon class="mr-4" icon="fa-solid fa-arrow-right-from-bracket" size="lg" />
              <span :class="`${collapsed ? 'hidden' : ''}`">ออกจากระบบ</span>
            </button>
          </li>
        </div>
      </div>
    </aside>
    <aside v-else-if="role == 1" id="company-sidebar"
      class="md:flex flex-col fixed duration-300 bg-origin min-h-screen overflow-hidden rounded-r-3xl z-50 top-0 bottom-0 left-0 shadow-2xl"
      :class="collapsed ? 'md:w-[53px] w-0' : 'md:w-[275px] w-[60%]'">
      <div class="flex justify-between items-center my-3 mx-2">
        <div @click="this.$router.push('/th/dashboard')" :class="`${collapsed ? 'invisible' : 'visible'
          } flex justify-center items-center bg-white rounded-xl w-32 h-12 duration-200 ease-in-out cursor-pointer`">
          <img class="w-3/4 h-auto" src="@/assets/images/Logo.png" alt="" />
        </div>
        <button @click="sideBarExpand" :class="`${collapsed ? 'absolute left-4' : 'relative'
          } duration-200 ease-in-out`">
          <font-awesome-icon class="hidden md:inline text-3xl text-white pr-6 duration-200 hover:text-white/80"
            icon="fa-solid fa-bars" />
          <font-awesome-icon class="hidde md:hidden text-3xl text-white pr-6 duration-200 hover:text-white/80"
            icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div id="scrollBar" class="text-sm md:text-base mb-16">
        <ul class="md:text-base">
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'dashboard' }"
              class="flex items-center h-12 rounded-xl my-2 pl-[10px] text-white">
              <font-awesome-icon class="mr-5 text-lg" icon="fa-solid fa-table-columns" />
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("dashboard")
              }}</span>
            </router-link>
          </li>
          <li class="relative px-2">
            <a :class="`${companyMenu ? 'router-link-active' : ''}`" href="" @click="companyMenuExpand"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white">
              <font-awesome-icon class="mr-5" size="xl" icon="fa-solid fa-building " />
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("company")
              }}</span>
              <font-awesome-icon v-if="companyMenu && !collapsed" class="absolute right-8"
                icon="fa-solid fa-caret-down" />
            </a>

            <!-- expand on clicking company -->
            <ul v-if="companyMenu" class="bg-box rounded-lg p-5 list-disc overflow-hidden">
              <li @click="comMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link class="block w-full" ref="cm" id="companyMenu" :to="{ name: 'companyInfo' }">
                  {{ $t("company_info") }}</router-link>
              </li>
              <li @click="comMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link class="block w-full" ref="cm" id="companyMenu" :to="{ name: 'DepartmentInfo' }">
                  {{ $t("department") }}
                </router-link>
              </li>
              <li @click="comMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link class="block w-full" ref="cm" id="companyMenu" :to="{ name: 'CheckIn' }">{{
                  $t("work_shift")
                }}</router-link>
              </li>
              <li @click="comMenuSelected" class="text-boxMuted ml-4">
                <router-link class="block w-full" ref="cm" id="companyMenu" :to="{ name: 'MapView' }">
                  {{ $t("map") }}</router-link>
              </li>
            </ul>

            <!-- expand company section ends -->
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Employee' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white">
              <font-awesome-icon class="mr-5 text-md" icon="fa-solid fa-user-group" />
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("employee")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Equipment' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white">
              <font-awesome-icon class="mr-5" :icon="['fas', 'mobile']" size="xl" />
              <span :class="`${collapsed ? 'hidden' : ''}`">
                {{ $t("equipment") }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'History' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white">
              <font-awesome-icon class="mr-5" size="lg" icon="fa-solid fa-list-check" />
              <span :class="`${collapsed ? 'hidden' : ''}`">
                {{ $t("atdHistory") }}</span>
            </router-link>
          </li>

          <!-- TBD -->
          <!-- <li class="px-2">
          <router-link
            @click="closeMenus"
            :to="{ name: 'Health' }"
            class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white"
          >
            <font-awesome-icon
              class="mr-5"
              size="lg"
              icon="fa-solid fa-heart-pulse"
            />
            <span :class="`${collapsed ? 'hidden' : ''}`">{{
              $t("health")
            }}</span>
          </router-link>
        </li> -->

          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Calendar' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white">
              <font-awesome-icon class="mr-5" size="lg" icon="fa-solid fa-calendar" />
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("calendar") + " | " + $t("holiday")
              }}</span>
            </router-link>
          </li>
          <li class="relative px-2 cursor-pointer">
            <a :class="`${statMenu ? 'router-link-active' : ''}`" href=""
              class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white" @click="statMenuExpand">
              <font-awesome-icon class="mr-5" size="lg" icon="fa-solid fa-chart-simple" />
              <span :class="`${collapsed ? 'hidden' : ''}`">
                {{ $t("mthly/yearly_report") }}</span>
              <font-awesome-icon v-if="statMenu" class="absolute right-8" icon="fa-solid fa-caret-down" />
            </a>

            <!-- expand report session -->

            <ul v-if="statMenu"
              class="bg-box rounded-lg p-5 mb-16 list-disc max-h-[18rem] md:max-h-none overflow-auto md:max-h-auto">
              <li @click="statMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link :to="{ name: 'MonthlyAttendance' }" class="focus:text-white block w-full" id="companyMenu">
                  {{ $t("monthlyAttd") }}</router-link>
              </li>
              <li @click="statMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link :to="{ name: 'MonthlyCheckIn-Out' }" class="focus:text-white block w-full"
                  id="companyMenu">
                  {{ $t("monthlyCheckInOut") }}
                </router-link>
              </li>
              <li @click="statMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link :to="{ name: 'MonthlyLateAttendance' }" class="focus:text-white block w-full"
                  id="companyMenu">
                  {{ $t("monthlyLateAttd") }}</router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4 mb-6">
                <router-link :to="{ name: 'MonthlyEarlyLeave' }" class="focus:text-white block w-full" id="companyMenu">
                  {{ $t("monthlyearlyLeave") }}</router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4 mb-6">
                <router-link :to="{ name: 'MonthlyOvertime' }" class="focus:text-white block w-full" id="companyMenu">
                  {{ $t("monthlyOvertime") }}
                </router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4 mb-6">
                <router-link :to="{ name: 'Annual-In-Out' }" class="focus:text-white block w-full" id="companyMenu">
                  {{ $t("annualAttd") }}</router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4">
                <router-link :to="{ name: 'AnnualLeave' }" class="focus:text-white block w-full" id="companyMenu">
                  {{ $t("annualLeave") }}</router-link>
              </li>

              <!-- <li @click="statMenuSelected" class="text-boxMuted ml-4">
              <router-link
                :to="{ name: 'HealthReport' }"
                class="focus:text-white"
                id="companyMenu"
              >
                รายงานสุขภาพ</router-link
              >
            </li> -->
            </ul>
          </li>
        </ul>
        <div class="absolute left-0 bottom-0 bg-origin w-full border-t border-teal-50">
          <li class="list-none">
            <button id="logout" @click="logout" class="flex items-center h-12 rounded-xl pl-5 text-white">
              <font-awesome-icon class="mr-4" icon="fa-solid fa-arrow-right-from-bracket" size="lg" />
              <span :class="`${collapsed ? 'hidden' : ''}`">ออกจากระบบ</span>
            </button>
          </li>
        </div>
      </div>
    </aside>
    <aside v-else-if="role == 2" id="employee-sideBar"
      class="md:z-[40] md:flex flex-col fixed duration-300 bg-origin min-h-screen overflow-hidden rounded-r-3xl z-50 top-0 bottom-0 left-0 shadow-2xl"
      :class="collapsed ? 'md:w-[53px] w-0' : 'md:w-[275px] w-[60%]'">
      <div class="flex justify-between items-center my-3 mx-2">
        <div :class="`${collapsed ? 'invisible' : 'visible'
          } flex justify-center items-center bg-white rounded-xl w-32 h-12 duration-200 ease-in-out cursor-pointer`">
          <img class="w-3/4 h-auto" src="../assets/images/Logo.png" alt="" />
        </div>
        <button @click="sideBarExpand" :class="`${collapsed ? 'absolute left-4' : 'relative'
          } duration-200 ease-in-out`">
          <font-awesome-icon class="hidden md:inline text-3xl text-white pr-6 duration-200 hover:text-white/80"
            icon="fa-solid fa-bars" />
          <font-awesome-icon class="hidde md:hidden text-3xl text-white pr-6 duration-200 hover:text-white/80"
            icon="fa-solid fa-xmark" />
        </button>
      </div>
      <div id="scrollBar" class="text-sm md:text-base mb-16">
        <ul class="md:text-base">
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'employee-dashboard' }"
              class="flex items-center h-12 rounded-xl my-2  text-white" :class="collapsed ? '' : 'pl-[10px]'">
              <font-awesome-icon class="mr-5 text-lg" icon="fa-solid fa-table-columns"
                :class="`${collapsed ? '!mx-auto' : ''}`" />
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("dashboard")
              }}</span>
            </router-link>
          </li>
          <li class="px-2" v-if="user.can_add_shift === 1">
            <router-link @click="closeMenus" :to="{ name: 'CheckIn' }"
              class="flex items-center h-12 rounded-xl my-2  text-white" :class="collapsed ? '' : 'pl-[10px]'">
              <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mr-5 w-5 h-5"
                :class="collapsed ? '!mx-auto' : ''">
                <path fill="currentColor"
                  d="m19.65 20.35l.7-.7l-1.85-1.85V15h-1v3.2zM10 6h4V4h-4zm8 17q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v4.275q-.875-.625-1.9-.95T18 11q-2.9 0-4.95 2.05T11 18q0 .775.163 1.538T11.675 21z" />
              </svg>
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("work_shift")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Attendance' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3  text-white" :class="collapsed ? '' : 'pl-[10px]'">
              <font-awesome-icon class="mr-5" size="lg" icon="fa-solid fa-list-check"
                :class="`${collapsed ? '!mx-auto' : ''}`" />
              <span :class="`${collapsed ? 'hidden' : ''}`">
                {{ $t("atdHistory") }}</span>
            </router-link>
          </li>
          <!-- TBD -->
          <!-- <li class="px-2">
          <router-link
            @click="closeMenus"
            :to="{ name: 'Health' }"
            class="flex items-center h-12 rounded-xl my-2 md:my-3 pl-[10px] text-white"
          >
            <font-awesome-icon
              class="mr-5"
              size="lg"
              icon="fa-solid fa-heart-pulse"
            />
            <span :class="`${collapsed ? 'hidden' : ''}`">{{
              $t("health")
            }}</span>
          </router-link>
        </li> -->
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'Calendar' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 text-white" :class="collapsed ? '' : 'pl-[10px]'">
              <font-awesome-icon class="mr-5" size="lg" icon="fa-solid fa-calendar"
                :class="`${collapsed ? '!mx-auto' : ''}`" />
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("calendar")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'RequestLeave' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 text-white active:text-origin"
              :class="collapsed ? '' : 'pl-[10px]'">
              <div class="w-[37px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 26 25"
                  :class="`${collapsed ? '!mx-auto' : ''}`">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M21.9864 1.63828C21.8853 1.86517 21.9873 2.13106 22.2142 2.23216C22.441 2.33326 22.7069 2.23128 22.808 2.00439L23.1741 1.18273C23.2752 0.955842 23.1733 0.689952 22.9464 0.588854C22.7195 0.487756 22.4536 0.589733 22.3525 0.816626L21.9864 1.63828ZM18.4666 0.669619C18.6729 0.531276 18.9523 0.586372 19.0907 0.792679L19.5916 1.53978C19.73 1.74609 19.6749 2.02549 19.4686 2.16383C19.2623 2.30217 18.9829 2.24707 18.8445 2.04077L18.3435 1.29366C18.2052 1.08736 18.2603 0.807961 18.4666 0.669619ZM11.176 2.01327C8.68812 1.12847 6.56178 1.59773 4.87571 2.53666C3.2229 3.45708 1.99133 4.82783 1.20504 5.76155L0.433963 6.67721L1.54191 7.13046L7.17284 9.43402L2.70508 22.3117H1.00002C0.518379 22.3117 0.12793 22.7021 0.12793 23.1838C0.12793 23.6654 0.518379 24.0559 1.00002 24.0559H3.3256H13.2093H20.7675H23.3837C23.8654 24.0559 24.2558 23.6654 24.2558 23.1838C24.2558 22.7021 23.8654 22.3117 23.3837 22.3117H21.6396V20.2768H23.3837C23.8654 20.2768 24.2558 19.8863 24.2558 19.4047C24.2558 18.9231 23.8654 18.5326 23.3837 18.5326H20.7675H13.5319L9.70711 15.2542C9.34142 14.9407 8.79086 14.9831 8.47742 15.3488C8.16397 15.7145 8.20632 16.265 8.57201 16.5785L12.3372 19.8058V22.3117H4.55125L8.79835 10.0701L14.938 12.3724L15.9072 12.7359L16.1009 11.719C16.3212 10.5623 16.3152 8.61543 15.6695 6.73116C15.0155 4.82275 13.6729 2.90131 11.176 2.01327ZM19.8954 20.2768V22.3117H14.0814V20.2768H19.8954ZM23.2968 5.04755C23.2968 6.28954 22.2899 7.29637 21.048 7.29637C19.806 7.29637 18.7991 6.28954 18.7991 5.04755C18.7991 3.80556 19.806 2.79873 21.048 2.79873C22.2899 2.79873 23.2968 3.80556 23.2968 5.04755ZM22.8142 8.02749C22.7212 7.79716 22.4591 7.68585 22.2288 7.77887C21.9985 7.87188 21.8871 8.134 21.9802 8.36433L22.317 9.19841C22.41 9.42873 22.6721 9.54004 22.9025 9.44703C23.1328 9.35402 23.2441 9.0919 23.1511 8.86157L22.8142 8.02749ZM25.2001 4.08777C25.4152 3.96357 25.4889 3.6885 25.3647 3.47338C25.2405 3.25826 24.9654 3.18456 24.7503 3.30875L23.9713 3.75852C23.7562 3.88272 23.6825 4.15779 23.8067 4.37291C23.9309 4.58803 24.2059 4.66173 24.4211 4.53753L25.2001 4.08777ZM18.228 4.25749C18.125 4.48355 17.8583 4.58335 17.6323 4.4804L16.8136 4.10758C16.5876 4.00463 16.4878 3.73792 16.5907 3.51186C16.6937 3.2858 16.9604 3.186 17.1864 3.28895L18.0051 3.66177C18.2311 3.76472 18.3309 4.03143 18.228 4.25749ZM19.5155 9.42839C19.2886 9.32729 19.1866 9.0614 19.2877 8.83451L19.6538 8.01286C19.7549 7.78596 20.0208 7.68398 20.2477 7.78508C20.4746 7.88618 20.5766 8.15207 20.4755 8.37896L20.1094 9.20062C20.0083 9.42751 19.7424 9.52949 19.5155 9.42839ZM24.7981 7.20261C25.02 7.31415 25.2904 7.22464 25.4019 7.00269C25.5134 6.78074 25.4239 6.5104 25.202 6.39886L24.3982 5.99496C24.1763 5.88343 23.9059 5.97294 23.7944 6.19489C23.6829 6.41684 23.7724 6.68718 23.9943 6.79871L24.7981 7.20261Z" />
                </svg>
              </div>
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("reqLeave")
              }}</span>
            </router-link>
          </li>
          <li class="px-2">
            <router-link @click="closeMenus" :to="{ name: 'ApproveLeave' }"
              class="flex items-center h-12 rounded-xl my-2 md:my-3 text-white" :class="collapsed ? '' : 'pl-[10px]'">
              <div class="w-[37px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 25"
                  :class="`${collapsed ? '!mx-auto' : ''}`">
                  <path
                    d="M6.33712 2.50775L10.8371 2.50775L14.9511 6.01033L14.9511 10.8642L1.83717 6.01033L6.33712 2.50775Z" />
                  <path
                    d="M1 22.312C0.518356 22.312 0.127907 22.7024 0.127907 23.1841C0.127907 23.6657 0.518356 24.0562 1 24.0562V22.312ZM23.3837 24.0562C23.8654 24.0562 24.2558 23.6657 24.2558 23.1841C24.2558 22.7024 23.8654 22.312 23.3837 22.312V24.0562ZM23.3837 20.2771C23.8654 20.2771 24.2558 19.8867 24.2558 19.405C24.2558 18.9234 23.8654 18.5329 23.3837 18.5329V20.2771ZM9.70709 15.2545C9.34139 14.9411 8.79084 14.9834 8.47739 15.3491C8.16394 15.7148 8.20629 16.2653 8.57198 16.5788L9.70709 15.2545ZM1.87209 6.32362L1.20502 5.76187L0.43394 6.67753L1.54189 7.13078L1.87209 6.32362ZM15.2442 11.5562L14.938 12.3727L15.9072 12.7362L16.1009 11.7194L15.2442 11.5562ZM10.8837 2.83526L10.5915 3.65694L10.8837 2.83526ZM14.0814 23.1841V19.405H12.3372V23.1841H14.0814ZM13.2093 20.2771H20.7674V18.5329H13.2093V20.2771ZM20.7674 20.2771H23.3837V18.5329H20.7674V20.2771ZM13.2093 24.0562H20.7674V22.312H13.2093V24.0562ZM20.7674 24.0562H23.3837V22.312H20.7674V24.0562ZM19.8953 19.405V23.1841H21.6395V19.405H19.8953ZM13.7769 18.7429L9.70709 15.2545L8.57198 16.5788L12.6418 20.0672L13.7769 18.7429ZM1 24.0562H3.32558V22.312H1V24.0562ZM3.32558 24.0562H13.2093V22.312H3.32558V24.0562ZM4.1495 23.4699L9.09136 9.22575L7.44353 8.65405L2.50167 22.8982L4.1495 23.4699ZM1.54189 7.13078L7.93724 9.74706L8.59764 8.13274L2.2023 5.51646L1.54189 7.13078ZM7.96123 9.75647L14.938 12.3727L15.5504 10.7396L8.57365 8.12333L7.96123 9.75647ZM16.1009 11.7194C16.3212 10.5626 16.3152 8.61575 15.6695 6.73148C15.0155 4.82307 13.6729 2.90163 11.1759 2.01359L10.5915 3.65694C12.455 4.31968 13.4864 5.74125 14.0195 7.29689C14.5608 8.87666 14.5548 10.5149 14.3875 11.393L16.1009 11.7194ZM11.1759 2.01359C8.6881 1.12879 6.56175 1.59805 4.87569 2.53699C3.22288 3.4574 1.99131 4.82815 1.20502 5.76187L2.53917 6.88537C3.30326 5.978 4.36508 4.81773 5.72428 4.06082C7.05022 3.32243 8.65449 2.96805 10.5915 3.65694L11.1759 2.01359Z" />
                </svg>
              </div>
              <span :class="`${collapsed ? 'hidden' : ''}`">{{
                $t("approveLeave")
              }}</span>
            </router-link>
          </li>
          <li class="relative px-2 cursor-pointer">
            <a :class="statMenu ? 'router-link-active' : '', collapsed ? '' : 'pl-[10px]'" href=""
              class="flex items-center h-12 rounded-xl my-2 md:my-3  text-white" @click.prevent="statMenuExpand">
              <font-awesome-icon class="mr-5" size="lg" icon="fa-solid fa-chart-simple"
                :class="`${collapsed ? '!mx-auto' : ''}`" />
              <span :class="`${collapsed ? 'hidden' : ''}`">
                {{ $t("mthly/yearly_report") }}</span>
              <font-awesome-icon v-if="statMenu" class="absolute right-8" icon="fa-solid fa-caret-down" />
            </a>
            <!-- expand report session -->
            <ul v-if="statMenu"
              class="bg-box rounded-lg p-5 mb-16 list-disc max-h-[18rem] md:max-h-none overflow-auto md:max-h-auto">
              <li @click="statMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link :to="{ name: 'Employee-AnnualLeave' }" class="focus:text-white" id="companyMenu">
                  {{ $t("annualLeave") }}</router-link>
              </li>
              <li @click="statMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link :to="{ name: 'Employee-MonthlyInTimeAttendance' }" class="focus:text-white"
                  id="companyMenu">
                  การเข้างานตรงเวลารายเดือน
                </router-link>
              </li>
              <li @click="statMenuSelected" class="mb-6 text-boxMuted ml-4">
                <router-link :to="{ name: 'Employee-MonthlyLateAbsenceOnLeave' }" class="focus:text-white"
                  id="companyMenu">
                  รายงานขาดลามาสาย</router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4 mb-6">
                <router-link :to="{ name: 'Employee-MonthlyEarlyLeave' }" class="focus:text-white" id="companyMenu">
                  ออกงานก่อนเวลารายเดือน</router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4 mb-6">
                <router-link :to="{ name: 'Employee-MonthlyOvertime' }" class="focus:text-white" id="companyMenu">
                  ทำงานล่วงเวลารายเดือน
                </router-link>
              </li>
              <li @click="statMenuSelected" class="text-boxMuted ml-4 mb-6">
                <router-link :to="{ name: 'Employee-Annual-In-Out' }" class="focus:text-white" id="companyMenu">
                  การเข้า-ออกงานประจำปี </router-link>
              </li>
              <!-- <li @click="statMenuSelected" class="text-boxMuted ml-4">
              <router-link :to="{ name: '404' }" class="focus:text-white" id="companyMenu">
                รายงานสุขภาพ</router-link>
            </li> -->

              <!-- <li @click="statMenuSelected" class="text-boxMuted ml-4">
              <router-link
                :to="{ name: 'HealthReport' }"
                class="focus:text-white"
                id="companyMenu"
              >
                รายงานสุขภาพ</router-link
              >
            </li> -->
            </ul>
          </li>
        </ul>
        <div class="absolute left-0 bottom-0 bg-origin w-full border-t border-teal-50">
          <li class="list-none">
            <button id="logout" @click="logout" class="flex items-center h-12 rounded-xl pl-5 text-white">
              <font-awesome-icon class="mr-4" icon="fa-solid fa-arrow-right-from-bracket" size="lg" />
              <span :class="`${collapsed ? 'hidden' : ''}`">ออกจากระบบ</span>
            </button>
          </li>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "./js/state";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      windowWidth: window.innerWidth,
      companyMenu: localStorage.getItem("companyMenuExpanded") === "true",
      statMenu: localStorage.getItem("statMenuExpanded") === "true",
      role: this.$store.state.userInfo.role || 2,
      message: "",
    };
  },

  methods: {
    sideBarExpand() {
      toggleSidebar();
      this.companyMenu = false
      this.statMenu = false
    },
    companyMenuExpand(e) {
      e.preventDefault();
      this.collapsed = false;
      this.companyMenu = !this.companyMenu;
      this.statMenu = false;
    },
    comMenuSelected() {
      localStorage.setItem("companyMenuExpanded", this.companyMenu);
      localStorage.setItem("statMenuExpanded", false);
      console.log(this.companyMenu);
      if (this.windowWidth <= 768) {
        toggleSidebar();
      }
    },
    statMenuExpand(e) {
      e.preventDefault();
      this.collapsed = false;
      this.statMenu = !this.statMenu;
      this.companyMenu = false;
    },
    statMenuSelected() {
      localStorage.setItem("statMenuExpanded", this.statMenu);
      localStorage.setItem("companyMenuExpanded", false);
      if (this.windowWidth <= 768) {
        toggleSidebar();
      }
    },
    closeMenus() {
      this.companyMenu = false;
      this.statMenu = false;
      localStorage.setItem("companyMenuExpanded", false);
      localStorage.setItem("statMenuExpanded", false);
      if (this.windowWidth <= 768) {
        toggleSidebar();
      }
    },
    logout() {
      this.axios
        .post("/logout")
        .then((response) => {
          if (response.data.success == true) {
            this.$cookies.set("token", "");
            this.$store.commit("setAuthentication", false);
            this.$store.commit("SET_USER_ROLE", null);
            // sessionStorage.setItem("user-role", "")
            this.axios.defaults.headers.authorization = "";
            this.$router.push({ name: "Login" });
          } else if (response.data.success == false) {
            this.message = "You are unauthenticated. Please login again";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    // checkSidebarMenu() {
    //   const svgs = document.querySelectorAll('svg.admin-menu')
    //   const adminSidebarMenus = document.querySelectorAll('.admin-sidebar')
    //   if (this.collapsed) {
    //     for (let svg of svgs) {
    //       svg.classList.add('mx-auto')
    //     }
    //     for (let adminSidebarMenu of adminSidebarMenus) {
    //       adminSidebarMenu.classList.remove('pl-[10px]')
    //     }
    //   } else {
    //     for (let svg of svgs) {
    //       svg.classList.remove('mx-auto')
    //     }
    //     for (let adminSidebar of adminSidebarMenus) {
    //       adminSidebar.classList.add('pl-[10px]')
    //     }
    //   }
    // },
    handleClickBackdrop() {
      this.collapsed = true
      document.body.style.overflow = ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.userInfo.user
    })
  },

  watch: {
    // collapsed(val) {
    //   this.checkSidebarMenu()
    // }
  },

  mounted() {
    if (this.windowWidth < 768) {
      sessionStorage.setItem("expanded", true);
    } else if (this.companyMenu || this.statMenu) {
      this.collapsed = false;
      sessionStorage.setItem("expanded", false);
    }
    if (!collapsed && windowWidth < 768) {
      document.body.style.overflow = 'hidden'
      console.log(document.body.style.overflow);
    }
    // this.checkSidebarMenu()
    // let sidebarState = sessionStorage.getItem("expanded")
    // console.log('sidebarState', sidebarState);
    // if (sidebarState) {
    //   this.companyMenu = false
    //   this.statMenu = false
    // }

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
ul li a#companyMenu:hover,
ul li a#companyMenu.router-link-active,
ul li a#companyMenu.router-link-exact-active {
  color: white;
  background-color: inherit;
  transition: all 0.3s ease;
  box-shadow: none;
}

a#logout:hover,
a#logout.router-link-active,
a#logout.router-link-exact-active {
  color: #a3dafd;
  background-color: #36a1ea;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25) !important;
}

a:hover {
  background-color: #ffffff;
  color: #36a1ea;

  path {
    fill: #36a1ea;
  }
}

a.admin-sidebar:hover {
  background-color: #36a1ea;
  color: #ffffff;

  path {
    fill: #ffffff;
  }
}

a {
  fill: #ffffff;
}

a.admin-sidebar.router-link-active,
a.admin-sidebar.router-link-exact-active {
  color: #ffffff;
  background-color: #36a1ea;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
}

a.admin-sidebar path {
  fill: #36a1ea;
}

a.admin-sidebar.router-link-active path {
  fill: #ffffff;
}

a.router-link-active,
a.router-link-exact-active {
  color: #36a1ea;
  background-color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
  fill: #36a1ea;
}

#scrollBar {
  overflow: hidden;
}

#scrollBar:hover {
  overflow: auto;
  transition: all 0.3 ease-in-out;
}

@media only screen and(max-width: 800px) {
  #scrollBar {
    overflow: scroll;
  }
}

.disabled {
  pointer-events: none;
}
</style>

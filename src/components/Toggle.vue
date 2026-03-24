<template>
    <Switch v-model="toggleState" :class="toggleState ? 'bg-origin' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 items-center rounded-full">
        <span class="sr-only">Enable notifications</span>
        <span :class="toggleState ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
    </Switch>
</template>

<script>
import { Switch } from '@headlessui/vue';

export default {
    components: { Switch },
    props: ['value'],
    data() {
        return {
        }
    },

    computed: {
        toggleState() {
            return this.value === 1;
        }

    }
}

</script>
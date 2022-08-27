<template>
    <div>
        <!-- <qrcode-vue :value="value" :size="size" level="H" /> -->
        <!-- <QRCodeStyling/> -->
        <Chrome v-model="colors" class="w-82"/>
    </div>
</template>

<script setup>
// import QrcodeVue from 'qrcode.vue'
// import QRCodeVue3 from "qrcode-vue3";
import QRCodeStyling from '../../components/QRCodeStyling.vue';
import { ref } from 'vue'
import { Chrome } from '@ckpack/vue-color'
// import pickr from '@r-tek/colr_pickr';
// import pickrcsss from '@r-tek/colr_pickr/build/colr_pickr.css'

const colors = ref('#000000')
</script>

<style>

</style>
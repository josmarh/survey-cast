<template>
    <div>
        <div id="qr-code"></div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Extension
} from 'qr-code-styling'

const options = ref({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'mailto:support@simplesoftware.io',
    image: '/favicon.ico',
    margin: 10,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous',
    },
    dotsOptions: {
        color: '#000000',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
        // },
        type: 'rounded'
    },
    backgroundOptions: {
        color: '#ffffff',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
    },
    cornersSquareOptions: {
        color: '#35495E',
        type: 'extra-rounded',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
    },
    cornersDotOptions: {
        color: '#35495E',
        type: 'dot',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
    }
})

const qrCode = ref(new QRCodeStyling(options.value))

watch(options, (newVal, oldVal) => {
    qrCode.value.update(newVal)
}, {deep:true})

function download() {

}

onMounted(() => {
    qrCode.value.append(document.getElementById("qr-code"));
})
</script>

<style>

</style>
<template>
  <page-component title="Dashboard">
    <video-player 
      :options="videoOptions" 
      :playlistOptions="playlist" 
      :shareOptions="share"
      :videoTitle="vidTitle"
      @vtitle="displayVtitle"
      class="player"
    />

    <div class="flex">
      <div class="">
        <span 
          class="inline-flex items-center px-3
          text-sm text-gray-900 bg-gray-200 
          border border-gray-300 
          dark:bg-gray-600 dark:text-gray-400 
          dark:border-gray-600"
          :style="{background: cPicker.color}"
        ></span>
        <input type="text" id="bg-color" 
          class="rounded-none bg-gray-50 
          text-gray-900 block flex-1 min-w-0 
          text-sm border-gray-300 p-2 border-0"
          v-model="cPicker.colorHex"
          @click="cPickerShow = true"
          @blur="cPickerShow = false"
        >
      </div>
      <div class="px-10">
        ksks      
      </div>
    </div>
    
    <ColorPicker
      theme="light"
      :color="cPicker.color"
      :sucker-hide="true"
      :sucker-canvas="cPicker.suckerCanvas"
      :sucker-area="cPicker.suckerArea"
      @changeColor="changeColor"
      @openSucker="openSucker"
      v-show="cPickerShow == true"
      class="z-5"
    />
  </page-component>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import VideoPlayer from '../components/VideoPlayer.vue';
// import 'vue-color-kit/dist/vue-color-kit.css'
// import { ColorPicker } from 'vue-color-kit'
import { ref } from 'vue';

let vidTitle = ref('')

const videoOptions = {
  autoplay: false,
  controls: true,
  muted: false,
  loop: false,
  // playbackRates: [0.5, 1, 1.5, 2],
  sources: [
    {
      src: 'https://muxed.s3.amazonaws.com/ink.mp4',
      type: 'video/mp4',
    }
  ],
}

const playlist = [
  {
    name: 'Sintel',
    sources: [{
      src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
      type: 'video/mp4',
    }],
    // poster: 'http://media.w3.org/2010/05/sintel/poster.png',
    thumbnail: [
      {
        srcset: 'http://media.w3.org/2010/05/sintel/poster.png',
        type: ['image/jpeg', 'image/png'],
        media: '(min-width: 400px;)'
      },
      {
        src: 'http://media.w3.org/2010/05/sintel/poster.png'
      }
    ],
    // duration: 90,
  },
  {
    name: 'Ocean',
    sources: [{
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }],
    // poster: 'http://vjs.zencdn.net/v/oceans.mp4#t=0.5',
    thumbnail: [
      {
        srcset: 'http://vjs.zencdn.net/v/oceans.mp4#t=0.5',
        type: ['image/jpeg', 'image/png'],
        media: '(min-width: 400px;)'
      },
      {
        src: 'http://vjs.zencdn.net/v/oceans.mp4#t=0.5'
      }
    ],
    // duration: 90,
  }
];

const share = {
  socials: ['fbFeed', 'tw', 'reddit', 'gp', 'messenger', 'linkedin', 'telegram', 'whatsapp', 'viber', 'vk', 'ok', 'mail'],

  url: window.location.href+'/skdllskks',
  title: 'videojs-share',
  description: 'video.js share plugin',
  image: 'https://dummyimage.com/1200x630',

  // required for Facebook and Messenger
  fbAppId: '279285723885189',
  // optional for Facebook
  redirectUri: window.location.href + '#close',

  // optional for VK
  isVkParse: true,
  
  // optinal embed code
  embedCode : '<iframe src="' + window.location.href + '" width="560" height="315" frameborder="0" allowfullscreen></iframe>'
}

const displayVtitle = (data) => {
  let arr = data.split('/');
  let len = arr.length -1;

  vidTitle.value = arr[len];
}

let cPicker = ref({
  color: '#59c7f9',
  colorHex: '#59c7f9',
  suckerCanvas: null,
  suckerArea: [],
  isSucking: false,
});
let cPickerShow = ref(false)

const changeColor = (color) => {
  const { r, g, b, a } = color.rgba
  cPicker.value.color = `rgba(${r}, ${g}, ${b}, ${a})`
  cPicker.value.colorHex = color.hex
}

const openSucker = (isOpen) => {
  if (isOpen) {
    // ... canvas be created
    // cPicker.value.suckerCanvas = canvas
    // cPicker.value.suckerArea = [x1, y1, x2, y2]
  } else {
    // cPicker.value.suckerCanvas && cPicker.value.suckerCanvas.remove
  }
}

</script>

<style scoped>

</style>
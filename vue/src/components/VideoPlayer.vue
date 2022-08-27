<template>
  <div class="grid grid-cols-12">
    <div class="col-span-10">
      <div class="container">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered"></video>
        <div class="overlay">
          {{ vTitle }}
        </div>
      </div>
    </div>
    <div class="vjs-playlist col-span-2"></div>
  </div>
</template>

<script>
import videojs from 'video.js';
import videocss from 'video.js/dist/video-js.css';
import playlist from 'videojs-playlist/dist/videojs-playlist.js';
import playlistUi from 'videojs-playlist-ui';
import playlistUicss from 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css';
import share from 'videojs-share';
import sharecss from 'videojs-share/dist/videojs-share.css';
import titleoverlay from 'videojs-titleoverlay';
import eventTracking from 'videojs-event-tracking';
import seekButtons from 'videojs-seek-buttons';
import seekButtonscss from 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import linearTvPrototype from 'videojs-linear-tv-prototype';
import moment from 'moment';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    playlistOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    shareOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    videoTitle: {
      type: String
    }
  },
  data() {
    return {
      player: null,
      vTitle: null
    }
  },
  methods: {
    playerCustomization(playBtn, playerId, pregressBar) {      
      playBtn.style.border = '0';
      playBtn.style.borderRadius = '0';

      playerId.addEventListener('mouseover',function(){
        playBtn.style.backgroundColor = '#6366F1';
      })
      playerId.addEventListener('mouseleave',function(){
        playBtn.style.backgroundColor = '';
      })
      playBtn.addEventListener('mouseover',function(){
        playBtn.style.backgroundColor = '#6366F1';
      })
      playBtn.addEventListener('mouseleave',function(){
        playBtn.style.backgroundColor = '';
      })
      pregressBar.style.backgroundColor = '#6366F1';
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
    });

    this.player.eventTracking(true)
    this.player.fluid(true)
    // this.player.playlist(this.playlistOptions);
    // this.player.playlist.autoadvance(0);
    // this.player.playlistUi();
    this.player.share(this.shareOptions);
    this.player.seekButtons({
      forward: 15,
      back: 10
    });

    // event tracking
    let playerId = document.getElementById('vjs_video_3_html5_api');
    this.player.on('tracking:firstplay', (e, data) => {
      console.log(data)
      let vidSrc = playerId.getAttribute('src');
      let arr = vidSrc.split('/');
      let len = arr.length -1;

      this.vTitle = arr[len];
      this.$emit('vtitle', this.vTitle)
    })
    this.player.on('pause', () => {
      document.getElementsByClassName('overlay')[0].style.opacity = 1;
    })
    this.player.on('play', function() {
      document.getElementsByClassName('overlay')[0].style.opacity = 0;
    });

    // big play button customization
    let playBtn = document.getElementsByClassName('vjs-big-play-button')[0];
    let pregressBar = document.getElementsByClassName('vjs-play-progress')[0];
    this.playerCustomization(playBtn, playerId, pregressBar)

    // Linear Tv
    var programs = [
      {
        title: "Elephants Dream",
        start: moment(new Date("Aug 19, 2021 21:25:00")).unix(),
        end: moment(new Date("Aug 19, 2021 22:00:00")).unix(),
        duration: 7208,
        media: {
          type: "video/mp4",
          src: "https://s3b-assets-bucket.s3.amazonaws.com/test-videos/ElephantsDream.mp4",
        },
      },
      {
        title: "Sintel",
        start: moment(new Date("Aug 19, 2021 09:49:00")).unix() + 7208,
        end: moment(new Date("Aug 19, 2021 09:49:00")).unix() + 7208 + 7208,
        duration: 7208,
        media: {
          type: "video/mp4",
          src: "https://s3b-assets-bucket.s3.amazonaws.com/test-videos/Sintel.mp4",
        },
      },
      {
        title: "Tears Of Steel",
        start: moment(new Date("Aug 19, 2021 20:01:00")).unix(),
        end: moment(new Date("Aug 19, 2021 20:01:00")).unix() + 634,
        duration: 634,
        media: {
          type: "application/dash+xml",
          src: "https://s3b-assets-bucket.s3.amazonaws.com/test-videos/TearsOfSteel.mp4",
        },
      },
      {
        title: "Big BuckBunny",
        start: moment(new Date("Aug 19, 2021 21:05:00")).unix(),
        end: moment(new Date("Aug 19, 2021 21:05:00")).unix() + 7208,
        duration: 7208,
        media: {
          type: "video/mp4",
          src: "https://s3b-assets-bucket.s3.amazonaws.com/test-videos/BigBuckBunny.mp4",
        },
      },
    ];

    var adverts = {
      media: {
        type: "video/mp4",
        src: "https://s3b-assets-bucket.s3.amazonaws.com/test-videos/ForBiggerBlazes.mp4",
      },
    };

    // this.player.linearTvPrototype({
    //   programs: programs,
    //   adverts: adverts,
    // });
    
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}

</script>
<style>
.container{
  position: relative;
}
.overlay {
  position: absolute; 
  top: 0; 
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0); /* Black see-through */
  color: #f1f1f1; 
  width: 100%;
  transition: .5s ease;
  opacity:0;
  color: white;
  font-size: 20px;
  padding: 10px;
  text-align: left;
}

/* .container:hover .overlay {
  opacity: 1;
}
.container:focus .overlay {
  opacity: 1;
} */

</style>
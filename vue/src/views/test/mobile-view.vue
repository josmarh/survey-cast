<template>
    <div class="smartphone">
        <div class="content">
          <iframe src="https://www.tubetargeterapp.com" style="width:100%;border:none;height:100%" />
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
/* The device with borders */
.smartphone {
  position: relative;
  width: 330px;
  height: 550px;
  margin: auto;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
}

/* The horizontal line on the top of the device */
.smartphone:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.smartphone .content {
  width: 300px;
  height: 430px;
  background: white;
}
</style>
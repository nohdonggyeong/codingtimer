<template>
  <div id="app">
    <div class="nes-container with-title is-centered">
      <h1 class="title">{{ title }}</h1>
      <div class="gif"></div>
      <div class="num">
        <span>{{ hours }}</span>
        <span>:</span>
        <span>{{ minutes }}</span>
        <span>:</span>
        <span>{{ seconds }}</span>
      </div>
      <div class="btns">
        <button class="nes-btn" :class="{'is-error': !status, 'is-disabled': status}"
          @click="totalTime > 0 ? totalTime -= 600 : totalTime = 0"
          :disabled="status">-</button>
        <button class="nes-btn" :class="{'is-primary': !status, 'is-disabled': status}"
          @click="totalTime <= 85800 ? totalTime += 600 : totalTime = totalTime"
          :disabled="status">+</button>
        <!--
        <button class="nes-btn is-success full" @click="toggleFullScreen">FULL</button>
        -->
      </div>
      <div class="btns">
        <button class="nes-btn" :class="{'is-disabled': status}"
          @click="changeTimer(30 * 60)" :disabled="status">30M</button>
        <button class="nes-btn" :class="{'is-disabled': status}"
          @click="changeTimer(60 * 60)" :disabled="status">1H</button>
        <button class="nes-btn" :class="{'is-disabled': status}"
          @click="changeTimer(180 * 60)" :disabled="status">3H</button>
      </div>
      <div class="btns control">
        <button class="nes-btn is-error" v-if="timer" @click="stopTimer">PAUSE</button>
        <button class="nes-btn is-warning" v-else @click="startTimer">START</button>
        <button class="nes-btn" v-if="status" @click="resetTimer">RESET</button>
      </div>
    </div>

    <!--
    <div class="footer">
      <a href="https://github.com/moonspam/8-bit-Timer">@GitHub</a>
      <span> / </span>
      <a href="https://moonspam.github.io/Lets-make-a-Timer/">Blog</a>
    </div>
    -->

    <dialog class="nes-dialog is-rounded" id="dialog-rounded">
      <form method="dialog">
        <!--
        <p class="title">Alert</p>
        -->
        <p>Time is over.</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary">CONFIRM</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
const noSleep = new NoSleep(); // no sleep event
const initTime = 60 * 60;

export default {
  name: 'app',
  data() {
    return {
      title: '8bit-like TIMER',
      timer: null,
      totalTime: initTime,
      setTime: initTime,
      status: false,
    };
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.status = true;
      noSleep.enable(); // no sleep event
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.status = true;
      noSleep.disable(); // no sleep event
    },
    changeTimer(e) {
      this.setTime = e;
      this.totalTime = e;
      this.resetTimer();
    },
    resetTimer() {
      clearInterval(this.timer);
      this.totalTime = this.setTime;
      this.timer = null;
      this.status = false;
      noSleep.disable(); // no sleep event
    },
    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime -= 1;
        if (this.totalTime === 300) {
          navigator.vibrate([500, 250, 500]);
        }
      } else {
        const dialog = document.getElementById('dialog-rounded');
        clearInterval(this.timer);
        this.totalTime = 0;
        this.resetTimer();
        dialogPolyfill.registerDialog(dialog);
        dialog.showModal();
        navigator.vibrate([500, 250, 500, 250, 500]);
        noSleep.disable(); // no sleep event
      }
    },
    pad(time) {
      return (time < 10 ? '0' : '') + time;
    },
    toggleFullScreen() {
      const doc = window.document;
      const docEl = doc.documentElement;
      const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen
        || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen
        || doc.webkitExitFullscreen || doc.msExitFullscreen;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement
        && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }
    },
  },
  computed: {
    hours() {
      const hours = Math.floor(this.totalTime / 60 / 60);
      return this.pad(hours);
    },
    minutes() {
      const minutes = Math.floor((this.totalTime / 60) - (this.hours * 60));
      return this.pad(minutes);
    },
    seconds() {
      const seconds = this.totalTime - (this.hours * 60 * 60 + this.minutes * 60);
      return this.pad(seconds);
    },
  },
};
</script>

<style lang="scss">
html, body, pre, code, kbd, samp {
  font-family: 'Press Start 2P', cursive;
}

body {
  //세로 모드, 뷰포트의 높이가 너비에 비해 상대적으로 크면 실행
  @media all and (orientation:portrait){
    height: 100vh;
    background: lighten(#209cee, 30%) url('https://media.giphy.com/media/TrhpJt1hFqgCI/giphy.gif') no-repeat center center/cover;
  }

  //가로 모드, 뷰포트의 너비가 높이에 비해 상대적으로 크면 실행
  @media all and (orientation:landscape){
    height: 80vh;
    background: lighten(#209cee, 30%) url('https://media.giphy.com/media/TrhpJt1hFqgCI/giphy.gif') no-repeat center center/cover;
  }
}

menu { padding: 0 }

@keyframes burnInDetector {
  20%  {margin: 0 0 0 -4px}
  40%  {margin: -4px 0 0 0}
  60%  {margin: 0 -4px 0 0}
  80%  {margin: 0 0 -4px 0}
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000;

  .nes-container{
    max-width: 95vw;
    background-color: #fff;
    animation: 60s burnInDetector steps(1, start) infinite;

    .gif {
      margin: auto;
      margin-top: 3vh;
      margin-bottom: 1vh;
      background: lighten(#209cee, 30%) url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHFtcHJxeDhwc3hpNzdhdzVoamhrbDN0ZnFtMDRuNm02MGl1eHUwMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f9w0K7c8vqYwuSPRHU/giphy.gif') no-repeat center center/cover;
    
      //세로 모드, 뷰포트의 높이가 너비에 비해 상대적으로 크면 실행
      @media all and (orientation:portrait){
        height: 30vh;
        max-width: 80%;
      }

      //가로 모드, 뷰포트의 너비가 높이에 비해 상대적으로 크면 실행
      @media all and (orientation:landscape){
        height: 20vh;
        max-width: 10vw;
      }
    }

    .num {
      padding: 2rem 0;
      font-size: 0;
      span {
        display: inline-block;
        font-size: 1.5rem;
      }
    }

    .btns {
      display: flex;
      margin-top: 8px;
      &.control {
        font-size: 16px;
      }
      button {
        flex: 1;
      }
      .full {
        margin-left: 10px;
      }
    }
  }

  .footer {
    padding: 10px 0 0;
    a {
      opacity: 0.5;
      color: #000;
    }
  }
}
</style>

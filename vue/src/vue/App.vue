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
          @click="totalTime > 300 ? totalTime -= 300 : totalTime = 0"
          :disabled="status">-</button>
        <button class="nes-btn" :class="{'is-primary': !status, 'is-disabled': status}"
          @click="totalTime <= 86100 ? totalTime += 300 : totalTime = totalTime"
          :disabled="status">+</button>
        <!--
        <button class="nes-btn is-success full" @click="toggleFullScreen">FULL</button>
        -->
      </div>
      <div class="btns">
        <button class="nes-btn" :class="{'is-disabled': status}"
          @click="changeTimer(10 * 60)" :disabled="status">10M</button>
        <button class="nes-btn" :class="{'is-disabled': status}"
          @click="changeTimer(30 * 60)" :disabled="status">30M</button>
        <button class="nes-btn" :class="{'is-disabled': status}"
          @click="changeTimer(60 * 60)" :disabled="status">1H</button>
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
        this.beep();
        this.beep();
        this.beep();
        this.beep();
        this.beep();
        this.beep();
        dialog.showModal();
        navigator.vibrate([500, 250, 500, 250, 500]);
        noSleep.disable(); // no sleep event
      }
    },
    beep() {
      const snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
      snd.play();
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
    background-image : url(../images/mario_background.gif);
    background-size: cover ;
    background-repeat: no-repeat;
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

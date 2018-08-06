<template>
  <div class="slide-show">
    <div class="slide-img">
      <transition name="slide-trans">
        <img v-if="isShow"
             :src="slides[nowIndex].src" />
      </transition>
      <transition name="slide-trans-old">
        <img v-if="!isShow"
             :src="slides[nowIndex].src" />
      </transition>
    </div>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides"
          @click="goto(index)"
          :key="index">
        <a :class="{on: index === nowIndex}">{{index + 1}}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowIndex: 0,
      isShow: false,
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          pervIndex: 0
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          pervIndex: 1,
        }
      ],
    }
  },
  mounted() {
    this.socket = io("ws://localhost:8081");
    this.socket.on("incident", data => {
      if (data == 'prevIndex') {
        if (this.nowIndex === 0) {
          this.goto(this.slides.length - 1)
        } else {
          this.goto(this.nowIndex - 1)
        }
      }

      if (data == 'nextIndex') {
        if (this.nowIndex === this.slides.length - 1) {
          this.goto(0)
        } else {
          this.goto(this.nowIndex + 1)
        }
      }
    });
  },
  methods: {
    goto(index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      })
    }
  },
  computed: {
    prevIndex() {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  }
}
</script>

<style>
.slide-show {
  position: relative;
  width: 100%;
  height: 500px;
  margin: 15px 15px 15px 0;
  overflow: hidden;
}
.slide-img {
  width: 100%;
  height: 100%;
}
.slide-img img {
  position: absolute;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  color: #fff;
  background-color: #000;
  opacity: 0.5;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
.slide-trans-enter-active {
  transition: all 0.5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all 0.5s;
  transform: translateX(-900px);
}
</style>



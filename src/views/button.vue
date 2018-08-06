<template>
  <div>
    <button @click="test('prevIndex')">上一页</button>
    <button @click="test('nextIndex')">下一页</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.socket = io("ws://localhost:8081");
  },
  methods: {
    test(data) {
      this.socket.emit("click", data);
    }
  }
}
</script>

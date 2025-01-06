<template>
  <div class="iframeInner">
    <p>grandson</p>
    <input id="text" type="text" v-model="inputValue" />
    <button id="sendMessage" @click="sendMessageToParent">发送消息</button>
  </div>
</template>

<script setup lang="ts">
const inputValue = ref("")
function sendMessageToParent() {
  if (inputValue.value) {
    // var receiver = document.getElementById("receiver").contentWindow
    // receiver.postMessage("Hello " + val + "！", "https://c.runoob.com")
    console.log("向上级页面传递的数据", inputValue.value)
    window.parent.postMessage(inputValue.value, "*")
  }
}

window.addEventListener(
  "message",
  function receiveMessage(event) {
    let data = event.data
    console.log("son接收到的数据", data)
  },
  false
)
</script>
<style lang="less" scoped>
.iframeInner {
  height: 100%;
  padding: 16px;
  background-image: linear-gradient(135deg,#42e695,#3bb2b8);
}
input {
  width: 100%;
}
</style>

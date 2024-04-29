<template>
  <div class="iframeInner">
    <p>son</p>
    <input id="text" type="text" v-model="inputValue" />
    <button id="sendMessage" @click="sendMessageToParent">发送消息</button>
    <iframe ref="myIframe" :src="baseUrl + '/h5/iframe/postMessage/grandson'" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
let baseUrl = location.origin

const inputValue = ref("")
function sendMessageToParent() {
  if (inputValue.value) {
    // var receiver = document.getElementById("receiver").contentWindow
    // receiver.postMessage("Hello " + val + "！", "https://c.runoob.com")
    console.log("向父页面传递的数据", inputValue.value)
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
  padding: 16px;
  height: 100%;
  padding: 16px;
  background-image: linear-gradient(135deg, #17ead9, #6078ea);
}
iframe {
  padding: 16px;
  width: 100%;
  height: 60%;
  display: block;
}
input {
  width: 100%;
}
</style>

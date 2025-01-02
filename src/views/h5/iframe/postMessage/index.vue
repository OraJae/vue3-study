<template>
  <div class="father">
    <p>father</p>
    <input id="text" type="text" v-model="inputValue" />
    <button id="sendMessage" @click="sendMessageToSon">发送消息</button>

    <p style="margin-top: 16px">从子站点接收到的消息: {{ sonMessage }}</p>

    <iframe ref="myIframe" :src="baseUrl + '/#/h5/iframe/postMessage/son'" frameborder="0"></iframe>
    <!-- <iframe ref="myIframe" src="http://localhost:5174/#/h5/iframe/postMessage/grandson" frameborder="0"></iframe> -->
  </div>
</template>

<script setup lang="ts">
let baseUrl = location.origin;
console.log(import.meta.env);
const sonMessage = ref("")

window.addEventListener(
  "message",
  function receiveMessage(event) {
    sonMessage.value = event.data
    console.log("father接收到的数据", sonMessage.value);
  },
  false
);

const inputValue = ref("");
const myIframe = ref();

function sendMessageToSon() {
  console.log("向子页面传递的数据", inputValue.value);
  myIframe.value.contentWindow.postMessage(inputValue.value, "*");
}
</script>
<style lang="less" scoped>
.father {
  padding: 16px;
  height: 100vh;
  background-image: linear-gradient(135deg, #fce38a, #f38181);
}
iframe {
  padding: 16px;
  width: 100%;
  height: 80%;
  // iframe=inline frame它是一个内联元素，默认是跟baseline对齐的，iframe后边有个看不见、摸不着的行内空白节点， 空白节点占据着高度，iframe与空白节点的基线对齐，导致了div被撑开，从而出现滚动条。
  display: block;
}
</style>

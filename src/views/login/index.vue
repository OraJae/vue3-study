<template>
  <div class="container">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="center">
      <!-- <h2>请输入接头暗号</h2> -->
      <!-- <input v-model="password" placeholder="暗号" @keyup.enter="login" />
      <a-button type="primary" block>登陆</a-button> -->

      <a-input-group compact size="large" style="margin-top: 1rem">
        <a-input v-model:value="password" style="width: calc(100% - 79px)" @keyup.enter="login" />
        <a-button type="primary" @click="login">登录</a-button>
      </a-input-group>
      <h2>&nbsp;</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";

const password = ref("admin321");
function login() {
  if (password.value == "admin321") {
    sessionStorage.setItem("token", "admin321");
    setTimeout(() => {
      location.href = "/";
      message.success("登陆成功");
    }, 0);
  } else {
    message.error("暗号错误");
  }
}
</script>
<style lang="less">
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: "Raleway", sans-serif;
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // &:hover,
  // &:active {
  .top,
  .bottom {
    &:before,
    &:after {
      margin-left: 200px;
      transform-origin: -200px 50%;
      transition-delay: 0s;
    }
  }

  .center {
    opacity: 1;
    transition-delay: 0.2s;
  }
  // }
}

.top,
.bottom {
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 200vmax;
    height: 200vmax;
    top: 50%;
    left: 50%;
    margin-top: -100vmax;
    transform-origin: 0 50%;
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
    z-index: 10;
    opacity: 0.65;
    transition-delay: 0.2s;
  }
}

.top {
  &:before {
    transform: rotate(45deg);
    background: #e46569;
  }

  &:after {
    transform: rotate(135deg);
    background: #ecaf81;
  }
}

.bottom {
  &:before {
    transform: rotate(-45deg);
    background: #60b8d4;
  }

  &:after {
    transform: rotate(-135deg);
    background: #3745b5;
  }
}

.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;

  h2 {
    font-size: 2rem;
  }
  input {
    width: 100%;
    // padding: 6px 12px;
    // margin: 1rem;
    // height: 3rem;
    border-radius: 1px;
    border: 1px solid #ccc;
    font-family: inherit;
  }
}
</style>

<template>
  <div class="seal-page">
    <a-flex justify="center" align="center">
      <vue-pdf-embed :source="source2" ref="pdfEmbedRef" @rendered="rendered" group="people" v-if="renderFlag" />
    </a-flex>
    <div class="seal-container">
      <img src="@/assets/imgs/seal.png" alt="" />
      <button @click="removeSignature">删除印章</button>
      <!-- <button @click="tttttt">添加印章</button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import VuePdfEmbed from "vue-pdf-embed";
import XEUtils from "xe-utils";

const source2 = new URL("@/assets/files/20230815.pdf", import.meta.url).href;

const mainImagelist = [
  new URL("@/assets/imgs/sign.png", import.meta.url).href,
  new URL("@/assets/imgs/seal.png", import.meta.url).href,
];

const canvasEles = reactive([]);

function rendered() {
  let pdfPages = document.getElementsByClassName("vue-pdf-embed__page");

  for (let index = 0; index < pdfPages.length; index++) {
    let canvasDom = document.createElement("canvas");
    canvasDom.width = pdfPages[index].clientWidth;
    canvasDom.height = pdfPages[index].clientHeight;
    canvasDom.id = "seal-" + index;
    pdfPages[index].appendChild(canvasDom);

    canvasDom.addEventListener("click", (e) => {
      console.log(e.offsetX, e.offsetY);
    });

    let canvasEle = new fabric.Canvas(canvasDom);
    // console.log(canvasEle)

    // // canvasEle.on("mouse:up", (e) => {
    // //   console.log("mouseup", e.pointer);
    // //   addSeal(e.pointer.x, e.pointer.y);
    // // });
    canvasEle.on("drop", ({ e }) => {
      addSeal(canvasEle, e.layerX, e.layerY);
    });
    canvasEles.push(canvasEle);
  }
  // let canvas = document.querySelectorAll(".vue-pdf-embed__page canvas")[0];
  // console.log(canvas)
  // let canvasData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
  // console.log(canvasData);
  // let canvasEle = new fabric.Canvas(canvas);
  // canvasEle.putImageData(canvasData, canvas.width, canvas.height);
  // let imgUrl = new URL("./assets/imgs/seal.png", import.meta.url).href;

  // fabric.Image.fromURL(imgUrl, (img) => {
  //   img.left = x - img.width / 2;
  //   img.top = y - img.height / 2;
  //   fabric.canvas.add(img);
  // });
}

let renderFlag = ref(true);

// 监听窗口大小变化，节流 重新渲染
window.addEventListener("resize", () => {
  console.log('131331')
  XEUtils.debounce(() => {
    renderFlag.value = false;
    setTimeout(() => {
      renderFlag.value = true;
    }, 100);
  }, 300);
});

function addSeal(ctx, x, y) {
  let imgUrl = new URL("@/assets/imgs/seal.png", import.meta.url).href;

  fabric.Image.fromURL(imgUrl, (img) => {
    img.left = x - img.width / 2;
    img.top = y - img.height / 2;
    ctx.add(img);
  });
}
// 删除签章
function removeSignature() {
  canvasEles.forEach((item) => {
    console.log(item);
    let activeObjects = item.getActiveObjects();
    for (let index = 0; index < activeObjects.length; index++) {
      item.remove(activeObjects[index]);
    }
  });
}

onMounted(() => {});
</script>

<style lang="less" scoped>
.seal-page {
  padding: 16px 0;
}
.vue-pdf-embed {
  // overflow-y: auto;
  width: 80%;
  // height: 100%;
  > * + * {
    margin-top: 4px;
  }
  :deep(canvas) {
    width: 100% !important;
  }
}
:deep(.canvas-container) {
  // width: 100% !important;
  border: 1px solid #000;
  position: absolute !important;
  z-index: 1;
  top: 0;
}
:deep([id^="seal"]) {
  position: absolute;
  left: 0;
  top: 0;
}
.seal-container {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  img {
    width: 100px;
  }
}
</style>

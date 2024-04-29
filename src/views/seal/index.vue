<template>
  <div class="pdf-contanier">
    <div class="left">
      <div class="left-title">我的印章</div>
      <!-- <button @click="tttttt">添加印章</button> -->
      <button @click="removeSignature">删除印章</button>
      <img src="@/assets/imgs/seal.png" alt="" />
    </div>

    <vue-pdf-embed :source="source2" ref="pdfEmbedRef" @rendered="rendered" group="people" />
  </div>
</template>

<script lang="ts" setup>
import VuePdfEmbed from "vue-pdf-embed"
const source2 = new URL("@/assets/files/20230815.pdf", import.meta.url).href

const mainImagelist = [
  new URL("@/assets/imgs/sign.png", import.meta.url).href,
  new URL("@/assets/imgs/seal.png", import.meta.url).href,
]

const canvasEles = reactive([])

// function tttttt() {
//   for (let index = 0; index < canvasEles.length; index++) {
//     console.log(canvasEles[index]);
//   }
// }

function rendered() {
  let pdfPages = document.getElementsByClassName("vue-pdf-embed__page")

  for (let index = 0; index < pdfPages.length; index++) {
    let canvasDom = document.createElement("canvas")
    canvasDom.width = pdfPages[index].clientWidth
    canvasDom.height = pdfPages[index].clientHeight
    canvasDom.id = "seal-" + index
    pdfPages[index].appendChild(canvasDom)

    canvasDom.addEventListener("click", (e) => {
      console.log(e.offsetX, e.offsetY)
    })

    let canvasEle = new fabric.Canvas(canvasDom)
    // console.log(canvasEle)

    // // canvasEle.on("mouse:up", (e) => {
    // //   console.log("mouseup", e.pointer);
    // //   addSeal(e.pointer.x, e.pointer.y);
    // // });
    canvasEle.on("drop", ({ e }) => {
      addSeal(canvasEle, e.layerX, e.layerY)
    })
    canvasEles.push(canvasEle)
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

function addSeal(ctx, x, y) {
  let imgUrl = new URL("@/assets/imgs/seal.png", import.meta.url).href

  fabric.Image.fromURL(imgUrl, (img) => {
    img.left = x - img.width / 2
    img.top = y - img.height / 2
    ctx.add(img)
  })
}
// 删除签章
function removeSignature() {
  canvasEles.forEach((item) => {
    console.log(item)
    let activeObjects = item.getActiveObjects()
    for (let index = 0; index < activeObjects.length; index++) {
      item.remove(activeObjects[index])
    }
  })
}

onMounted(() => {})
</script>

<style scoped>
.pdf-contanier {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.left {
  position: fixed;
  left: 400px;
  top: 400px;
}
.vue-pdf-embed {
  overflow-y: auto;
  width: 40%;
  height: 100%;
}
:deep(.vue-pdf-embed__page) {
  border: 1px solid #000;
  margin-bottom: 4px;
  box-sizing: border-box;
}
:deep(.canvas-container) {
  position: absolute !important;
  z-index: 1;
  top: 0;
}
:deep([id^="seal"]) {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

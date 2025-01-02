<template>
  <div :class="['mdReader', { mobile: isSmallScreen }]" ref="mdReader">
    <div
      v-if="isSmallScreen"
      ref="floatBtn"
      :class="['float-btn', { light: showFloatBtn }]"
      @click="drawerVisible = true"
    >
      <UnorderedListOutlined style="font-size: 1em" />
    </div>

    <div class="preview" ref="previewElement"></div>
    <div class="outline" ref="outlineElement"></div>
  </div>
  <a-drawer
    v-if="isSmallScreen"
    bodyStyle="padding: 16px 0"
    forceRender
    placement="right"
    :closable="false"
    width="50%"
    v-model:open="drawerVisible"
    :maskClosable="true"
  >
    <div ref="mobileOutlineElement"></div>
  </a-drawer>
</template>

<script setup lang="ts">
// import fixedMenu from '@/components/fixedMenu'
// import axios from 'axios'
import { UnorderedListOutlined } from "@ant-design/icons-vue";
import Vditor from "vditor";
import mdFile from "@/assets/files/array.md?raw";
import enquireJs from "enquire.js";
import XEUtils from "xe-utils";

// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// 配置 S3 客户端
// const s3Client = new S3Client({
//   region: "WuHan",
//   credentials: {
//     accessKeyId: "database:FTj3WChc95bdmgdtOto8",
//     secretAccessKey: "TcYJDjPZ9sUzNOYS2IRQvuHdhqTNxg57",
//   },
//   endpoint: "http://192.168.31.139:8010", // 示例: 'https://你的NAS_IP:port'
//   forcePathStyle: true,
// });

// const params = {
//   Bucket: "database",
//   Key: "note/array.md", // 想要下载的文件名
// };

// const command = new GetObjectCommand(params);
// console.log(command);
// const response = await s3Client.send(command);
// console.log(response);

const outlineElement = ref<HTMLDivElement | null>(null);
const previewElement = ref<HTMLDivElement | null>(null);
const mobileOutlineElement = ref<HTMLDivElement | null>(null);
const mdReader = ref<HTMLDivElement | null>(null);
const floatBtn = ref<HTMLDivElement | null>(null);
const isSmallScreen = ref(false);
const drawerVisible = ref(false);

const showFloatBtn = ref(true);

onMounted(async () => {
  if (previewElement.value && outlineElement.value) {
    renderVditor();
  }

  // 判断当前设备屏幕宽度是否小于等于 768px
  enquireJs.register("screen and (max-width: 767.99px)", {
    match: () => {
      isSmallScreen.value = true;
    },
    unmatch: () => {
      isSmallScreen.value = false;
      initOutline();
    },
  });
});

let timer: any = null;
window.addEventListener("scroll", () => {
  if (timer) {
    clearTimeout(timer);
  }
  showFloatBtn.value = true;
  timer = setTimeout(() => {
    showFloatBtn.value = false;
  }, 1500);
});

function renderVditor() {
  Vditor.preview(previewElement.value, mdFile, {
    mode: "light",
    markdown: {
      toc: true,
    },
    speech: {
      enable: true,
    },
    anchor: 1,
    after() {
      // if (window.innerWidth <= 768) {
      //   return;
      // }
      const menuEl = isSmallScreen.value ? mobileOutlineElement.value : outlineElement.value;
      Vditor.outlineRender(previewElement.value, menuEl);
      console.log(menuEl.innerText);
      if (menuEl.innerText.trim() !== "") {
        menuEl.style.display = "block";
        initOutline();
      }
    },
    lazyLoadImage: "https://unpkg.com/vditor/dist/images/img-loading.svg",
    renderers: {
      renderHeading: (node, entering) => {
        const id = Lute.GetHeadingID(node);
        if (entering) {
          return [
            `<h${node.__internal_object__.HeadingLevel} id="${id}" class="vditor__heading"><span class="prefix"></span><span>`,
            Lute.WalkContinue,
          ];
        } else {
          return [
            `</span><a id="vditorAnchor-${id}" class="vditor-anchor" href="#${id}"><svg viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a></h${node.__internal_object__.HeadingLevel}>`,
            Lute.WalkContinue,
          ];
        }
      },
    },
  });
}
const initOutline = () => {
  console.log("sdjfnsdhkbsjkb jkbsjkb");
  const headingElements = [];
  Array.from(previewElement.value.children).forEach((item) => {
    if (item.tagName.length === 2 && item.tagName !== "HR" && item.tagName.indexOf("H") === 0) {
      headingElements.push(item);
    }
  });

  let toc = [];
  console.log(previewElement.value);
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    toc = [];
    headingElements.forEach((item) => {
      toc.push({
        id: item.id,
        offsetTop: item.offsetTop,
      });
    });

    const currentElement = document.querySelector(".vditor-outline__item--current");
    for (let i = 0, iMax = toc.length; i < iMax; i++) {
      if (scrollTop < toc[i].offsetTop - 30) {
        if (currentElement) {
          currentElement.classList.remove("vditor-outline__item--current");
        }
        let index = i > 0 ? i - 1 : 0;
        document
          .querySelector('span[data-target-id="' + toc[index].id + '"]')
          .classList.add("vditor-outline__item--current");
        break;
      }
    }
  });
};

onUnmounted(() => {
  window.removeEventListener("scroll", () => {
    console.log(111)
  });
});
</script>

<style lang="less" scoped>
.mdReader {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, rgba(159, 219, 252, 0.15) 3%, transparent 0),
    linear-gradient(1turn, rgba(159, 219, 252, 0.15) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  padding-bottom: 100px;
}
.float-btn {
  opacity: 0.2;
  position: fixed;
  right: 48px;
  bottom: 48px;
  width: 2.5em;
  height: 2.5em;
  border-radius: 48px;
  background: #1677ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: #fff;
  transition: all 0.3s linear;
  &.light {
    opacity: 1;
  }
}
.mobile {
  .preview {
    width: 100%;
    padding-right: 16px;
  }
  .outline {
    padding-left: 0;
    width: 100%;
  }
}
.preview {
  // width: calc(100% - 200px);
  padding-right: 220px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  // padding-right: 30px;
  margin: 0 auto;
}

.outline {
  display: none;
  position: fixed;
  width: 186px;
  top: 64px;
  right: 20px;
  bottom: 20px;
  overflow: auto;
  font-size: 16px;
  border-left: 1px solid var(--border-color);
  border-right: 0;
  z-index: 10;
  --border-color: #eee;
  --toolbar-icon-hover-color: #4285f4;
  --textarea-text-color: #616161;
  --hover-background-color: #f6f8fa;
  :deep(li > span.vditor-outline__item--current) {
    border-left: 1px solid #4285f4;
    color: #4285f4;
    background-color: #f6f8fa;
  }
  :deep(li > span:hover) {
    color: #4285f4;
    background-color: #f6f8fa;
  }
}
</style>

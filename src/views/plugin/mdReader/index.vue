<template>
  <div :class="['mdReader', { mobile: isSmallScreen }]" ref="mdReader">
    <div v-if="isSmallScreen" ref="floatBtn" :class="['float-btn', { light: showFloatBtn }]"
      @click="drawerVisible = true">
      <UnorderedListOutlined style="font-size: 1em" />
    </div>

    <div class="preview" ref="previewElement"></div>
    <div class="outline" ref="outlineElement"></div>
  </div>
  <a-drawer v-if="isSmallScreen" bodyStyle="padding: 16px 0" forceRender placement="right" :closable="false" width="50%"
    v-model:open="drawerVisible" :maskClosable="true">
    <div ref="mobileOutlineElement"></div>
  </a-drawer>
</template>

<script setup lang="ts">
// import fixedMenu from '@/components/fixedMenu'
import axios from 'axios'
import { UnorderedListOutlined } from "@ant-design/icons-vue";
import Vditor from "vditor";
// import mdFile from "@/assets/files/array.md?raw";
import enquireJs from "enquire.js";
import { getNoteContent } from '@/api/notes'

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

const handleScroll = () => {
  if (timer) {
    clearTimeout(timer);
  }
  showFloatBtn.value = true;
  timer = setTimeout(() => {
    showFloatBtn.value = false;
  }, 1500);
};

window.addEventListener("scroll", handleScroll);

// let url = "http://192.168.31.139:8010/note/array.md?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=database%3AFTj3WChc95bdmgdtOto8%2F20250111%2FWuHan%2Fs3%2Faws4_request&X-Amz-Date=20250111T060157Z&X-Amz-Expires=3600&X-Amz-Signature=3ae3d6f097ab0842b130ccaf53e8ec2c1352cc31a648426e99edb9403d49c8d5&X-Amz-SignedHeaders=host&x-id=GetObject"

// function readMD() {
//   axios.get(documentData.url).then((res) => {
//     markedStr = res.data;
//     renderVditor();
//   });
// },

async function renderVditor() {
  let mdFile
  await getNoteContent({
    fileName: 'array.md'
  }).then((res) => {
    console.log(res)
    mdFile = res.data
  })
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
      // console.log(menuEl.innerText);
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
  const headingElements = [];
  Array.from(previewElement.value.children).forEach((item) => {
    if (item.tagName.length === 2 && item.tagName !== "HR" && item.tagName.indexOf("H") === 0) {
      headingElements.push(item);
    }
  });

  let toc = [];
  // console.log(previewElement.value);
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
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="less" scoped>
.mdReader {
  position: absolute;
  width: 100%;
  // height: 100%;
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

<template>
  <!-- <a-card class="p-r"> -->
  <div>
    <div id="preview" ref="previewElement"></div>
    <div id="outline" ref="outlineElement"></div>
  </div>
  <!-- </a-card> -->
</template>

<script setup lang="ts">
// import fixedMenu from '@/components/fixedMenu'
// import axios from 'axios'
import Vditor from "vditor";
import mdFile from "@/assets/files/array.md?raw";
// const mdFile = new URL("@/assets/files/array.md", import.meta.url).href;

const outlineElement = ref<HTMLDivElement | null>(null);
const previewElement = ref<HTMLDivElement | null>(null);
onMounted(() => {
  if (previewElement.value && outlineElement.value) {
    renderVditor();
  }
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
      if (window.innerWidth <= 768) {
        return;
      }
      Vditor.outlineRender(previewElement.value, outlineElement.value);
      if (outlineElement.value.innerText.trim() !== "") {
        outlineElement.value.style.display = "block";
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

  const initOutline = () => {
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
}
</script>

<style lang="less" scoped>
.docTitle {
  width: 1100px;
  margin: 0 auto 48px;
  padding-left: 30px;
}
.el-card {
  height: 100%;
  background-image: linear-gradient(90deg, rgba(159, 219, 252, 0.15) 3%, transparent 0),
    linear-gradient(1turn, rgba(159, 219, 252, 0.15) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  // >>> .el-card__body {
  //   padding: 96px 0 48px;
  // }
}
.mobile {
  #preview {
    width: 400px;
  }
}
#preview {
  width: 1100px;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-right: 30px;
  margin: 0 auto;
}
#outline {
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
  /deep/ li > span.vditor-outline__item--current {
    border-left: 1px solid #4285f4;
    color: #4285f4;
    background-color: #f6f8fa;
  }
  /deep/ li > span:hover {
    color: #4285f4;
    background-color: #f6f8fa;
  }
}
:deep(#app) {
  overflow: hidden !important;
}
</style>

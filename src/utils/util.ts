import { message } from "ant-design-vue";
import { onMounted, onBeforeUnmount } from "vue";
import { getFileType } from "./file";

export const useLockScroll = () => {
  let winX = null;
  let winY = null;

  function iScroll() {
    if (winX !== null && winY !== null) {
      window.scrollTo(winX, winY);
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", iScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", iScroll);
  });

  function disableWindowScroll() {
    winX = window.scrollX;
    winY = window.scrollY;
  }

  function enableWindowScroll() {
    winX = null;
    winY = null;
  }

  return {
    disableWindowScroll,
    enableWindowScroll,
  };
};

export function scrollSmooth(targetEl: HTMLElement) {
  if (typeof window.getComputedStyle(document.body).scrollBehavior == "undefined") {
    // scrollTo(0, targetEl.offsetTop)
    // IE
    const targetElemPosition = targetEl.offsetTop;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const step = function () {
      let distance = targetElemPosition - scrollTop;
      scrollTop = scrollTop + distance / 5;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, targetElemPosition);
      } else {
        window.scrollTo(0, scrollTop);
        setTimeout(step, 20);
      }
    };
    step();
  } else {
    targetEl.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  }
}

export async function copyToClipboard(str) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(str);
      message.success("复制成功");
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = str;
      textArea.style.position = "absolute";
      textArea.style.opacity = "0";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy") ? message.success("复制成功") : message.error("复制失败，请重试");
      textArea.remove();
    }
  } catch (e) {
    console.error("copyToClipboard", e);
    message.error("复制失败，请重试");
  }
}

const blobMap = {
  word: "application/msword",
  excel: "application/vnd.ms-excel",
  ppt: "application/vnd.ms-powerpoint",
  zip: "application/zip",
  video: "video/x-msvideo;video/3gpp",
  pdf: "application/pdf",
  ttf: "font/ttf", // FIXME:
};

export function downloadFile(url, fileName) {
  const type = getFileType(url);
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const blobType = blobMap[type] || "";
      const url = window.URL.createObjectURL(
        new Blob([blob], {
          type: blobType,
        })
      );
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.setAttribute("download", "Fabric Excel Format.xlsx");
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error(error);
      window.open(url);
    });
}

export function viewNewsDetail(newsInfo) {
  console.log("newsInfo", newsInfo);
  if ((newsInfo.origin == 3 || newsInfo.origin == null) && newsInfo.urlAdress && isUrl(newsInfo.urlAdress)) {
    window.open(newsInfo.urlAdress);
    return;
  }

  window.open(window.location.origin + "/news-detail/" + newsInfo.id);
}

export function isUrl(url) {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(url);
}

const img = ["png", "jpg", "jpeg", "bmp", "gif", "webp"];
const w = ["doc", "dot", "wps", "wpt", "docx", "dotx", "docm", "dotm", "rtf", "word"];
const s = ["xls", "xlt", "et", "xlsx", "xltx", "csv", "xlsm", "xltm", "excel"];
const p = ["ppt", "pptx", "pptm", "ppsx", "ppsm", "pps", "potx", "potm", "dpt", "dps"];
const f = ["pdf"];
const zip = ["zip", "rar", "tar", "jar", "cab", "arj", "gzip", "7-zip", "z", "iso", "ace", "uue"];
const video = ["flv", "avi", "mov", "mp4", "wmv", "mpg", "mpeg", "rm", "ram", "swf", "m3u8", "mkv", "3gp"];

function getExtension(fileName: string) {
  let ext = null;
  const name = fileName.toLowerCase();
  const i = name.lastIndexOf(".");
  if (i > -1) {
    ext = name.slice(i + 1);
  }
  return ext;
}

export function isImg(fileName: string) {
  const extension = getExtension(fileName);
  return img.includes(extension);
}

export function isVideo(fileName: string) {
  const extension = getExtension(fileName);
  return video.includes(extension);
}

export function isZip(fileName: string) {
  const extension = getExtension(fileName);
  return zip.includes(extension);
}

export function getFileType(fileName: string) {
  if (wpsFileType(fileName) === "w") return "word";
  if (wpsFileType(fileName) === "s") return "excel";
  if (wpsFileType(fileName) === "p") return "ppt";
  if (wpsFileType(fileName) === "f") return "pdf";
  if (isImg(fileName)) return "image";
  if (isZip(fileName)) return "zip";
  if (isVideo(fileName)) return "video";
  return getExtension(fileName);
}

export function isWpsFile(fileName: string) {
  const extension = getExtension(fileName);
  return [...w, ...s, ...p, ...f].includes(extension);
}

export function wpsFileType(fileName: string) {
  const extension = getExtension(fileName);
  if (w.includes(extension)) {
    return "w";
  }
  if (s.includes(extension)) {
    return "s";
  }
  if (p.includes(extension)) {
    return "p";
  }
  if (f.includes(extension)) {
    return "f";
  }
  return "";
}

export function getFileTypeImg(fileName: string) {
  const type = getFileType(fileName);
  return new URL(`../assets/imgs/files/${type}.png`, import.meta.url).href;
}

export function checkImageWH(file, width, height) {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();
    fr.onload = (e) => {
      let src = e.target.result;
      const image = new Image();
      image.onload = function () {
        // @ts-ignore
        if (this.width > width || this.height > height) {
          // @ts-ignore
          reject({ width: this.width, height: this.height });
        } else {
          resolve(true);
        }
      };
      image.onerror = reject;
      image.src = src as any;
    };
    fr.readAsDataURL(file);
  });
}

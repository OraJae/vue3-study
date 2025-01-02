<template>
  <a-button type="primary" @click="exportSheet">导出</a-button>
  <a-table :data-source="raw_data" row-key="date">
    <a-table-column title="会议时间" data-index="date" key="date" />
    <a-table-column title="上午/下午" data-index="morningOrAfternoon" key="morningOrAfternoon" />
    <a-table-column title="会议主题" data-index="theme" key="theme" />
    <a-table-column title="地点" data-index="location" key="location" />
    <a-table-column title="内部参会人员" data-index="inner" key="inner" />
    <a-table-column title="外部参会人员" data-index="outer" key="outer" />
    <a-table-column title="会议议程" data-index="content" key="content" />
    <a-table-column title="操作" data-index="action" key="action" />
  </a-table>
</template>

<script setup lang="ts">
import { utils, writeFileXLSX } from "xlsx";
const raw_data = reactive([
  {
    date: "2023-11-27",
    morningOrAfternoon: "上午",
    theme: "区领导调研工作方案",
    location: "区政府大楼",
    inner: "张三、李四",
    outer: "区领导",
    content: "调研工作安排",
  },
  {
    date: "2023-11-27",
    morningOrAfternoon: "上午",
    theme: "区领导调研工作方案",
    location: "区政府大楼",
    inner: "张三、李四",
    outer: "区领导",
    content: "调研工作安排",
  },
  {
    date: "2023-11-28",
    morningOrAfternoon: "下午",
    theme: "区领导调研工作方案",
    location: "区政府大楼",
    inner: "张三、李四",
    outer: "区领导",
    content: "调研工作安排",
  },
]);
function exportSheet() {
  /* fetch JSON data and parse */

  /* flatten objects */
  // const rows = prez.map((row) => ({
  //   name: row.name.first + " " + row.name.last,
  //   time: "",
  //   birthday: row.bio.birthday,
  // }));

  /* generate worksheet and workbook */
  const worksheet = utils.json_to_sheet(raw_data);
  const workbook = utils.book_new();

  /* fix headers */
  utils.sheet_add_aoa(worksheet, [["会议时间", "", "会议主题", "地点", "内部参会人员", "外部参会人员", "会议议程"]], {
    origin: "A1",
  });

  /* calculate column width */
  if (!worksheet["!cols"]) worksheet["!cols"] = [];
  console.log(worksheet);
  worksheet["!cols"][0] = { wch: raw_data.reduce((w, r) => Math.max(w, r.date.length), 10) + 1 };
  worksheet["!cols"][1] = { wch: raw_data.reduce((w, r) => Math.max(w, r.theme.length), 10) + 2 };

  // 合并单元格
  // 设置工作表的记录范围
  // [列号][行号]，A1 则代表 A 列的第1行
  // 列数一般是已知的（未知时可以设置为ZZ）
  // 行数则以 xlsxData 内容的长度结束即可
  // worksheet["!ref"] = `A1:AI${raw_data.length}`;
  // s 意为 start ，即开始的单元格
  // r 是 row ，表示行号，从 0 计起
  // c 是 col ，表示列号，从 0 计起
  const merge = [
    // 纵向合并，范围是第1列的行1到行2
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    // // 纵向合并，范围是第2列的行1到行2
    { s: { r: 1, c: 1 }, e: { r: 2, c: 1 } },
    // // 横向合并，范围是第1行的列3到列5
    // { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } },
    // // 横向合并，范围是第1行的列6到列11
    // { s: { r: 0, c: 5 }, e: { r: 0, c: 10 } },
    // // 横向合并，范围是第1行的列12到列17
    // { s: { r: 0, c: 11 }, e: { r: 0, c: 16 } },
    // // 横向合并，范围是第1行的列18到列23
    // { s: { r: 0, c: 17 }, e: { r: 0, c: 22 } },
    // // 横向合并，范围是第1行的列24到列29
    // { s: { r: 0, c: 23 }, e: { r: 0, c: 28 } },
    // // 横向合并，范围是第1行的列30到列35
    // { s: { r: 0, c: 29 }, e: { r: 0, c: 34 } },
  ];

  for (const key in worksheet) {
    // 第一行，表头
    if (key.replace(/[^0-9]/gi, "") === "1") {
      worksheet[key].s = {
        fill: {
          //背景色
          fgColor: { rgb: "C0C0C0" },
        },
        font: {
          //字体
          name: "宋体",
          sz: 12,
          bold: true,
        },
        border: {
          //边框
          bottom: {
            style: "thin",
            color: "FF000000",
          },
        },
        alignment: {
          horizontal: "center", //水平居中
        },
      };
    }
  }
  console.log(worksheet);
  worksheet["!merges"] = merge;

  utils.book_append_sheet(workbook, worksheet, "Dates");

  /* create an XLSX file and try to save to Presidents.xlsx */
  writeFileXLSX(workbook, "Presidents.xlsx", { compression: true });
}
</script>
<style scoped>
.btn {
  width: 120px;
  height: 32px;
  background-color: skyblue;
  border: 1px solid #ccc;
  color: #fff;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}
</style>

<template>
  <fs-upload :before-upload="importSheet" accept=".xlsx,.xls">
    <fs-button>
      <upload-outlined></upload-outlined>
      导入sheet
    </fs-button>
  </fs-upload>
  <a-button type="primary" @click="exportSheet">导出sheet</a-button>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a href="javascript:;">{{ text }}</a>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import type { TableColumnType } from 'ant-design-vue'
import XEUtils from 'xe-utils'
import { read, utils, writeFile } from 'xlsx'
import dayjs from 'dayjs'
const sharedOnCell = (_, index) => {
  if (index === 4) {
    return { colSpan: 0 }
  }
}

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: true,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: null,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: undefined,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park'
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park'
  }
]

const columns: TableColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    customCell: (_, index) => ({
      colSpan: index < 4 ? 1 : 5
    })
  },
  {
    title: 'Age',
    dataIndex: 'age',
    customCell: sharedOnCell
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    customCell: (_, index) => {
      if (index === 2) {
        return { rowSpan: 2, colspan: 2 }
      }
      // These two are merged into above cell
      if (index === 3) {
        return { rowSpan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    }
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    customCell: (_, index) => {
      if (index === 2) {
        return { rowSpan: 0, colspan: 0 }
      }
      // These two are merged into above cell
      if (index === 3) {
        return { rowSpan: 0, colspan: 0 }
      }
      if (index === 4) {
        return { colSpan: 0 }
      }
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    customCell: sharedOnCell
  }
]

function exportSheet() {
  const merges = []
  let trs = document.querySelectorAll('tr')
  trs.forEach((tr, rowIndex) => {
    let children = tr.children
    for (var i = 0; i < children.length; i++) {
      let td = children[i]
      let colspan = Number(td.getAttribute('colspan')) || 1
      let rowspan = Number(td.getAttribute('rowspan')) || 1
      if (colspan > 1 || rowspan > 1) {
        merges.push({ s: { r: rowIndex, col: i }, e: { r: rowIndex + rowspan - 1, col: i + colspan - 1 } })
      }
    }
  })

  let theadTableTh = document.querySelectorAll('.ant-table-thead tr')
  let tbodyTableTh = document.querySelectorAll('.ant-table-tbody tr.ant-table-row')
  let tableEl = document.createElement('table')
  let tbody = document.createElement('tbody')
  theadTableTh.forEach((el) => tbody.append(el.cloneNode(true)))
  tbodyTableTh.forEach((el) => tbody.append(el.cloneNode(true)))
  tableEl.append(tbody)
  console.log(tableEl)
  var ws = utils.table_to_sheet(tableEl)
  ws['!cols'][0] = { wch: 100 }
  ws['!cols'][1] = { wch: 200 }
  console.log(ws)

  var wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'sheet1')
  writeFile(wb, dayjs().format('YYYY-MM-DD HH:mm:ss') + '.xlsx')

  console.log(wb)
  //   writeFile(wb, new Date().getTime() + '.xlsx')
}

const importSheet = (file) => {
  const fileReader = new FileReader()
  // 读取数据
  fileReader.readAsBinaryString(file)

  fileReader.onload = function (e) {
    try {
      const wb = read(e.target.result, { type: 'binary' })
      // console.log(wb)
      // const ws = wb.Sheets[wb.SheetNames[0]]
      // console.log(ws)
      // const data = utils.sheet_to_json(ws, { range: 1 }) // header: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
      // console.log(data)
      let ws = wb.Sheets[wb.SheetNames[0]]
      // html.value = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]])
      console.log(ws)
    } catch (e) {
      console.log(e)
    }
  }
  return false
}
</script>


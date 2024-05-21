<template>
  <a-button type="primary" class="exportBtn" @click="handleExport">导出excel</a-button>
  <a-table :columns="columns" :data-source="data" bordered size="middle" :scroll="{ x: 'calc(700px + 50%)', y: 1240 }" />
</template>
<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { exportSheet, getTreeLeaf } from './export-sheet'
import type { HeaderData } from './export-sheet'
type TableDataType = {
  key: number
  name: string
  age: number
  street: string
  building: string
  number: number
  companyAddress: string
  companyName: string
  gender: string
}
const columns: HeaderData = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe'
      },
      {
        text: 'John',
        value: 'John'
      }
    ],
    onFilter: (value: string | number | boolean, record: TableDataType) => {
      if (typeof value == 'string') {
        return record.name.indexOf(value) === 0
      }
      return false
    }
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a: TableDataType, b: TableDataType) => a.age - b.age
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 200
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        // colSpan: 2,
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
        customCell: (record, index) => {
          if (index === 2) {
            return { rowSpan: 2 }
          }
          // These two are merged into above cell
          if (index === 3) {
            return { rowSpan: 0 }
          }
        }
      },
      {
        // colSpan: 0,
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName'
      }
    ]
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right'
  }
]
const data = [...Array(10)].map((_, i) => ({
  key: i,
  name: 'John Brown',
  age: i + 1,
  street: 'Lake Park',
  building: 'C',
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLake Co',
  gender: 'M'
}))

function handleExport() {
  let leafColumns = getTreeLeaf(columns)
  exportSheet(
    columns,
    data.map((row, rowIndex) => {
      return leafColumns.map((col, colIndex) => {
        let obj = {
          title: row[col.dataIndex]
        }
        if (col.customCell) {
          obj = Object.assign(obj, col.customCell(row, rowIndex) || {})
        }
        return obj
      })
    })
  )
}
</script>

<style lang='less' scoped>
.exportBtn {
  float: right;
  margin: 12px;
}
</style>



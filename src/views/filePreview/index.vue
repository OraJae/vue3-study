<template>
  <input type="file" @change="changeHandle" />
  <vue-office-docx :src="docx" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
  components: {
    VueOfficeDocx
  },
  data() {
    return {
      docx: 'https://hysz-op.oss-cn-hangzhou.aliyuncs.com/focusin_user/test/2024-05-07/17150517374429wvqxi2vbm.docx' //设置文档网络地址，可以是相对地址
    }
  },
  methods: {
    renderedHandler() {
      console.log('渲染完成')
    },
    errorHandler() {
      console.log('渲染失败')
    },
    changeHandle(event) {
      let file = event.target.files[0]
      let fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = () => {
        this.docx = fileReader.result
      }
    }
  }
}
</script>

<style lang='less' scoped>
input {
  position: fixed;
  left: 10pt;
  bottom: 10pt;
  z-index: 1;
}
:deep(.docx-wrapper) {
  background: #fff;
  padding: 12px 0;
  > section.docx {
    padding: 16px 32px !important;
    margin-bottom: 0;
  }
}
</style>

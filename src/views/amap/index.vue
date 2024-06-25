<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'

window._AMapSecurityConfig = {
  securityJsCode: 'e5bcf21bf7af98ae01ddeac82ceb16ca」'
}
AMapLoader.load({
  key: '422d0ee1f8745d024875d1e8d81e53e4', //申请好的 Web 端开发者 Key，首次调用 load 时必填
  version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  plugins: ['AMap.Scale'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
})
  .then((AMap) => {
    var map = new AMap.Map('container', {
      // 设置地图容器id
      viewMode: '3D', // 是否为3D地图模式
      zoom: 14, // 初始化地图级别
      //   mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
      center: [114.28199, 30.478687] // 初始化地图中心点位置
    }) //"container"为 <div> 容器的 id

    AMap.plugin(['AMap.ToolBar', 'AMap.Driving'], function () {
      //异步同时加载多个插件
      var toolbar = new AMap.ToolBar() //创建工具条插件实例
      map.addControl(toolbar) //添加工具条插件到页面
    //   var driving = new AMap.Driving() //创建驾车路线规划实例
    //   driving.search(/*参数*/) //调用插件实例上的方法
    })
  })
  .catch((e) => {
    console.log(e)
  })
</script>
<style lang="less" scoped>
#container {
  width: 70%;
  height: 100%;
}
</style>

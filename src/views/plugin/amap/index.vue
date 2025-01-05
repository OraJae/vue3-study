<template>
    <div class="ab">{{ position }}</div>
    <div id="container"></div>
    <div id="panel"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { message } from "ant-design-vue";

const position = ref([]);

const familyPic = new URL(`/src/assets/imgs/familiy.jpg`, import.meta.url).href;

window._AMapSecurityConfig = {
    securityJsCode: "e5bcf21bf7af98ae01ddeac82ceb16ca",
};

let map = null;
AMapLoader.load({
    key: "422d0ee1f8745d024875d1e8d81e53e4", //申请好的 Web 端开发者 Key，首次调用 load 时必填
    version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
})
    .then((AMap) => {
        map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 14, // 初始化地图级别
            //   mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
            center: [114.282212, 30.479101], // 初始化地图中心点位置
        }); //"container"为 <div> 容器的 id

        // 加载工具栏
        AMap.plugin(["AMap.ToolBar", "AMap.Driving"], function () {
            //异步同时加载多个插件
            var toolbar = new AMap.ToolBar(); //创建工具条插件实例
            map.addControl(toolbar); //添加工具条插件到页面
            var driving = new AMap.Driving({
                map: map, //创建驾车路线规划实例
                panel: "panel", //显示路线规划结果的面板
            }); //创建驾车路线规划实例

            const startLngLat = new AMap.LngLat(114.28222, 30.479064); //起始点坐标
            const endLngLat = new AMap.LngLat(114.405714, 30.479219); //终点坐标
            driving.search(startLngLat, endLngLat, function (status, result) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === "complete") {
                    message.success("绘制驾车路线完成");
                } else {
                    message.error("获取驾车数据失败：" + result);
                }
            });
            console.log(driving);
        });

        //地图绑定点击事件，获取点击的经纬度
        map.on("click", (e) => {
            console.log(e);
            position.value = [e.lnglat.lng, e.lnglat.lat];
        });

        addHomeMarker(AMap);
    })
    .catch((e) => {
        console.log(e);
    });

// 在地图上添加家的标记点，并绑定点击事件
function addHomeMarker(AMap) {
    const marker = new AMap.Marker({
        position: new AMap.LngLat(114.282212, 30.479101), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "南国都市",
        // icon: '//vdata.amap.com/icons/b18/1/2.png'
    });

    marker.setLabel({
        direction: "right",
        offset: new AMap.Pixel(10, 0), //设置文本标注偏移量
        content: "<div class='info'>家</div>", //设置文本标注内容
    });
    map.add(marker);

    marker.on("click", (e) => {
        console.log(e.lnglat);
        // openInfo(marker._position)
        openInfo(e.lnglat);
    });

    var infoWindow;
    //在指定位置打开信息窗体
    function openInfo(position) {
        //构建信息窗体中显示的内容
        var info = [];
        info.push(
            `<div class=\'input-card content-window-card\'>
                    <img src="${familyPic}"/>
                </div>`
        );

        infoWindow = new AMap.InfoWindow({
            content: info.join(""), //使用默认信息窗体框样式，显示信息内容
            offset: new AMap.Pixel(0, -30),
        });

        infoWindow.open(map, position);
    }
}
</script>
<style lang="less" scoped>
.ab {
    position: absolute;
    top: 5%;
    left: 3%;
    padding: 8px 12px;
    background-color: #fff;
    z-index: 100;
}

#container {
    width: 100%;
    height: 100%;
}

#panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
}

#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
</style>

<style lang="less">
.home-text {
    font-size: 12px;
}

.content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;

    img {
        width: 10rem;
    }
}
</style>

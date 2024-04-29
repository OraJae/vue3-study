### 使用注意事项

1、如项目中只有一级 router-view , 只需将 hook useRouteCache 中的 caches 绑定到 keep-alive 的 includes 上

若项目存在多级 router-view ， 想要维持不同级路由间的缓存，需在每级 router-view 上重复上面的属性绑定

建议只使用一层 router-view，若使用多层router-view嵌套，有种情况无法解决：

**页面home (顶级)** --> **页面list(二级)** --> **页面detail（二级）**, 
业务场景若有从 **页面detail（二级）** 跳转到    **页面home (顶级)**  的情况，
在  **页面home (顶级)** 一路后退回  **页面list(二级)**，缓存会失效，页面会触发刷新

2、如需刷新页面，可在跳转前的页面中，使用 removeCacheEntry 清除路由组件的实例


### 友情链接


完美解决vue3 keep-alive多个路由使用同一个组件的缓存问题 <https://segmentfault.com/a/1190000044109446>



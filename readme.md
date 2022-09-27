#  vite-plugin-earthsdk


## Install

```bash
npm i earthsdk vite-plugin-earthsdk  -D
```

## Usage

add this plugin to `vite.config.js`

```js
import { defineConfig } from 'vite';
import earthsdk from 'vite-plugin-earthsdk';
export default defineConfig({
  plugins: [earthsdk()]
});
```

## Demo

`Earth.vue`

```js
<template>
  <div style="width: 100%; height: 100%">
    <div ref="earthContainer" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
let earthContainer = ref(null);
function startup() {
  let earth = new XE.Earth(earthContainer.value);
  earth.sceneTree.root = {
    children: [
      {
        czmObject: {
          name: "默认离线影像",
          xbsjType: "Imagery",
          xbsjImageryProvider: {
            createTileMapServiceImageryProvider: {
              url: XE.HTML.cesiumDir + "Assets/Textures/NaturalEarthII",
              fileExtension: "jpg",
            },
            type: "createTileMapServiceImageryProvider",
          },
        },
      },
    ],
  };
}
onMounted(() => {
  //加载cesium资源后初始化地球
  XE.ready().then(startup);
});
</script>
```

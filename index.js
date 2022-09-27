import fs from "fs-extra";
console.log(fs);
export default function vitePluginEarthsdk(){
  let outDir = "dist";
  let base = "./";
  return {
    name: "vitePluginEarthsdk",
    async config(config, { command }) {
      if (!config.base) {
        config.base=base
      }
      if (command == "serve") {
        //develop引入earth包
        try {
          await fs.copy("node_modules/earthsdk/dist/XbsjCesium", "public/XbsjCesium");
          await fs.copy("node_modules/earthsdk/dist/XbsjEarth", "public/XbsjEarth");
        } catch (err) {
          console.error("copy failed", err);
        }
      } else {
        outDir = config.build.outDir;
      }
    },
    async closeBundle() {
      //product引入earth包
      try {
        await fs.copy("node_modules/earthsdk/dist/XbsjCesium", outDir + "/XbsjCesium");
        await fs.copy("node_modules/earthsdk/dist/XbsjEarth", outDir + "/XbsjEarth");
      } catch (err) {
        console.error("copy failed", err);
      }
    },
    transformIndexHtml() {
      //index.html script引入
      return [
        {
          tag: "script",
          attrs: {
            src: "XbsjEarth/XbsjEarth.js",
          },
          injectTo: "head-prepend",
        },
      ];
    },
  };
}

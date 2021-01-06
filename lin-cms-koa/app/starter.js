'use strict';
const fs = require('fs');
const path = require('path');

const { config } = require('lin-mizar/lin/config');

console.log(config);

// router.post('/cms/file', async ctx => {
//   ctx.body = 'Hello World';
//   const files = await ctx.multipart();
//   console.log(files)
//   if (files.length < 1) {
//     throw new Error('未找到符合条件的文件资源');
//   }
//   const uploader = new LocalUploader('app/assets');
//   const arr = await uploader.upload(files);
// });

/**
 * 获取配置
 */
function applyConfig () {
  const cwd = process.cwd();
  const files = fs.readdirSync(path.resolve(`${cwd}/app/config`));
  for (const file of files) {
    config.getConfigFromFile(`app/config/${file}`);
  }
  // 加载其它配置文件
  config.getConfigFromFile('app/extensions/file/config.js');
}

const run = async () => {
  applyConfig();
  const { createApp } = require('./app');
  const app = await createApp();
  const port = config.getItem('port');
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
};

// 启动应用
run();

const fs = require('fs');

// 读取 package.json 文件
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 获取当前版本号
let currentVersion = packageJson.version;

// 将版本号拆分成主版本号、次版本号和修订号
const versionParts = currentVersion.split('.');
let major = parseInt(versionParts[0]);
let minor = parseInt(versionParts[1]);
let patch = parseInt(versionParts[2]);

// 每次提交增加修订号
patch++;

// 更新版本号
const newVersion = `${major}.${minor}.${patch}`;

// 更新 package.json 中的版本号
packageJson.version = newVersion;

// 将更新后的 package.json 文件写入磁盘
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`版本号已更新为：${newVersion}`);

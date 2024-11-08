const fs = require('fs');
const path = require('path');

// 读取JSON文件
const jsonPath = 'E:\\HuiTask\\更好的原神\\2.资料\\图标处理\\Material.json';
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 设置源文件夹和目标文件夹
const sourceDir = 'E:\\HuiTask\\更好的原神\\2.资料\\图标处理\\ItemIcon-tiny';
const targetDir = 'E:\\HuiTask\\更好的原神\\2.资料\\图标处理\\newPng';

// 确保目标文件夹存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 读取源文件夹中的所有文件
fs.readdirSync(sourceDir).forEach(file => {
  const fileName = path.parse(file).name; // 获取文件名（不含扩展名）
  
  // 在JSON数据中查找匹配项
  const matchedItem = jsonData.find(item => item.Icon === fileName);
  
  if (matchedItem) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, `${matchedItem.Name}.png`);
    
    // 复制并重命名文件
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`已复制并重命名: ${file} -> ${matchedItem.Name}.png`);
  }
});

console.log('处理完成');
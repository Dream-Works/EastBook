#/bin/bash

set -u
set -e


#打包命令
npm run build
npm run build &>/dev/null

# 删除
sudo rm -rf   /Library/WebServer/Documents/*

#拷贝
sudo cp -pr   .vuepress/dist/*   /Library/WebServer/Documents/

echo "更新完成"

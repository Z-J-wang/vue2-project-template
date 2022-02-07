#!/bin/bash

# 定义变量filterModules来存储需要过滤的模块名
filterModules=""

# 允许关闭的模块数组
modules=(
  'case-show' 
)

# 模块说明数组 注意要和modules保持一致
modulesDescription=(
  'case-show ------------------------- 费用中心模块' 
)

# 用户选择的值
selectVal=''

# 创建模块菜单
function createMenu(){
  for((i=0; i<${#modulesDescription[@]};i++))
  do
    echo `expr ${i} + 1`')' ${modulesDescription[i]};
  done
}

# 模块关闭编号格式化
# 将用户输入的模块编号，转为模块名称字符串
function selectValFormat(){
  OLD_IFS="$IFS"
  IFS="-"
  array=($selectVal)
  IFS="$OLD_IFS"
  for((i=0; i<${#array[@]};i++))
  do
    if test $i -eq 0
    then
      filterModules=${modules[i]}
    else
      filterModules=${filterModules}|${modules[i]}
    fi
  done
  echo "您选择关闭的模块为：$filterModules"

}

# 选择要关闭的模块
function selectCloseModules(){
  echo '请选择需要关闭的模块：'
  createMenu
  echo "请输入你要关闭的模块的选项编号，编号之间用'|'隔开(如：1|2|3);如果没有要关闭的模块，直接回车进入下一步："
  read -a selectVal
  selectValFormat
  echo '关闭选中的模块并编译打包……'
}

# 调用 selectCloseModules 函数设置关闭的模块
selectCloseModules

# vue 项目运行指令
npm install yarn --save-dev

yarn install

node \
node_modules/cross-env/src/bin/cross-env.js VUE_APP_FILTERMODULES=${filterModules} \
node_modules/@vue/cli-service/bin/vue-cli-service.js build
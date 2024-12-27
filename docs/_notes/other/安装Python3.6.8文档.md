---
Title: 安装Python3.6.8
permalink: /note/other/index/
title: 安装Python3.6.8文档
author: 
createTime: 2024/01/22 14:48:43
name: 张三
---

# 安装Python3.6.8文档

## 测试内容



{{ $page._content }}



::: left
{{ $page.frontmatter.name }}

```shell
{{ $page.frontmatter.name }}
saklsa
sjak
```

:::






## 1、安装前准备

```shell
yum install -y zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel libffi-devel gcc make
 
 
```

## 2、创建python目录

```shell
mkdir /usr/local/python3
cd /usr/local/python3
```

## 3、下载源码包

```shell
wget https://www.python.org/ftp/python/3.6.8/Python-3.6.8.tgz
```

## 4、解压

```shell
tar -xvf Python-3.6.8.tgz
```

## 5、编译安装

```shell
./configure prefix=/usr/local/python3
make && make install
```

## 6、更改软连接

```shell
 ln -s /usr/local/python3/bin/python3.6 /usr/bin/python3
 ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```

## 7、验证是否安装成功

```shell
python3 -V
```

## 8、升级pip (可以不升级)

```shell
pip3 install --upgrade pip
```

## 9、删除源码包

```shell
cd /usr/local/python3/
rm -fr Python3.6.8
rm -fr Python-3.6.8.tgz
```


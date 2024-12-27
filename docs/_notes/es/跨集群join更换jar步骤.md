---
title: 跨集群join更换jar步骤
author: 
createTime: 2024/03/08 14:04:27
permalink: /note/es/aw65vu6m/
---
#  10w集群更换Jar包步骤

（跨集群jion更换jar包步骤）



## 1、检查集群健康状态

```shell
curl localhost:{{9292}}/_cluster/health?pretty
```



##  2、将远程配置中该节点设置为false



## 3、加维护



## 4、确认无请求

```shell
tcpdump -i bond0 -s 0 port 9292
```



## 5、停分片

```shell
curl -XPUT localhost:{{9292}}/_cluster/settings?pretty -d '{"transient":{"cluster.routing.allocation.enable":"none"}}'

curl localhost:{{9292}}/_cluster/settings?pretty
```



## 6、停服务

```shell
 {{/usr/local/elasticsearch-5.2.2/}}/bin/stop-server
```



## 7、观察集群状态

```shell
curl localhost:{{9292}}/_cluster/health?pretty

# relocating_shards,initializing_shards  的值应该为0
```



## 8、备份lib目录

```shell
cd  {{/usr/local/elasticsearch-5.2.2/}}

mv lib lib_bak
```



## 9、更新lib目录

```shell
rsync -azP --delete root@{{10.23.41.67}}:{{/usr/local/elasticsearch-5.2.2/lib}}  {{/usr/local/elasticsearch-5.2.2/}}
```

验证

```shell
cd  {{/usr/local/elasticsearch-5.2.2/}}

diff lib lib_bak

# 必须有差异
```

检查jar包权限

```shell 
ls -l lib

##如需修改
chown -R beisen:beisen lib
```



## 10、删除 modules/reindex 目录

```shell
rm -rf modules/reindex

ls -l modules/   #查看是否删除成功
```



## 11、删除 plugins/analysis-ik 目录下部分jar包

```shell
rm -f plugins/analysis-ik/commons-codec-1.9.jar
rm -f plugins/analysis-ik/commons-logging-1.2.jar
rm -f plugins/analysis-ik/httpclient-4.5.2.jar
rm -f plugins/analysis-ik/httpcore-4.4.4.jar

ls -l plugins/analysis-ik/ #查看是否删除成功
```



## 12、启动服务

```shell
/usr/local/elasticsearch-5.2.2/bin/start-server
```



## 13、 查看日志



## 14、查看集群状态及日志信息

```shell
curl localhost:{{9292}}/_cluster/health?pretty

# 新增了一个节点
```



## 15、观察10分钟开分片

```shell
curl -XPUT localhost:{{9292}}/_cluster/settings?pretty -d '{"transient":{"cluster.routing.allocation.enable":null}}'
```



## 16、等待分片分配完成并观察异常，通知业务



## 17、下维护


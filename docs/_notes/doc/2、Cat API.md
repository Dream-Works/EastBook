---
title: Cat API
author: 
createTime: 2024/01/24 15:49:29
permalink: /note/doc/klcop6a1/
---
# Cat API

* cat 查询到信息都是行信息，一行一行的。
* 可选参数
  * v ： 显示field名称，详细显示。
  * h:    指定显示的字段，多个用“,” 分割。
  * s:    指定排序字段，s=field:desc, 指定field降序排序，默认为升序排序。



##  cat allocation

 cat allocation 可以查看到每个es节点上，存储了多少分片，以及索引大小和磁盘的使用情况。

```shell
curl -X GET "localhost:9200/_cat/allocation?v&pretty"
```

* response

```json
shards disk.indices disk.used disk.avail disk.total disk.percent host         ip           node
   334       50.2kb   332.8gb    143.4gb    476.2gb           69 10.129.8.113 10.129.8.113 node-2
   333         50kb   284.3gb    184.9gb    469.3gb           60 10.129.8.112 10.129.8.112 node-1
   333         50kb   370.8gb     75.6gb    446.4gb           83 10.129.8.16  10.129.8.16  node-3

```



## cat count 

cat count 可以用于查看整个集群或者某个索引的文档数量

查看整个集群的文档数量

```shell
curl -X GET "localhost:9200/_cat/count?v&pretty"
```

* response

```json
epoch      timestamp count
1475868259 15:24:19  121

//epoch 		时间戳
//timestamp 查询时间
//count     文档数量
```

查看单个索引的文档数量

```json
curl -X GET "localhost:9200/_cat/count/twitter?v&pretty"
```

* response

```json
epoch      timestamp count
1475868259 15:24:20  120
```

> 显示的是活跃的文档数量，不包括被删除的文档。



## cat health 

查看集群健康状态的单行显示 (推荐使用：**/_cluster/health**)

```shell
curl -X GET "localhost:9200/_cat/health?v&pretty"
```

* response

```json
epoch      timestamp cluster       status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1475871424 16:17:04  elasticsearch green           1         1      5   5    0    0        0             0                  -                100.0%
```

> ts=0 ,可选参数，设置不显示时间戳

```shell
curl -X GET "localhost:9200/_cat/health?v&ts=0&pretty"
```

* response

```xml
cluster       status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
elasticsearch green           1         1      5   5    0    0        0             0                  -                100.0%
```

> 这个命令可以用来查看集群恢复过程的状态

```shell
$ while true; do curl localhost:9200/_cat/health; sleep 120; done
1384309446 18:24:06 foo red 3 3 20 20 0 0 1812 0
1384309566 18:26:06 foo yellow 3 3 950 916 0 12 870 0
1384309686 18:28:06 foo yellow 3 3 1328 916 0 12 492 0
1384309806 18:30:06 foo green 3 3 1832 916 4 0 0

# 可以看到未识别的分片数量在不断地减小，如果这个数字一致不变，那么集群可能已出现问题。
```



##  cat indices 

cat indices 可以查看所有索引的相关信息

```shell
curl -X GET "localhost:9200/_cat/indices?v&pretty"
```

* response

```json
health status index      uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   test       R2XdP1htQT28uVgbbwDfSw   5   1          2            0      7.1kb          7.1kb
yellow open   twitter1   bNdy8gxLTOKtONj8BCnyKg   5   1          1            0      4.3kb          4.3kb
green  open   twitter    eQN2FbMCQ8aDRhlcEagnew   5   1         12            0     50.2kb         50.2kb
yellow open   test_index iySWbJfXTfy2v2bQiLYlJw   5   1          1            0        4kb            4kb
```

> 也可以查看指定的索引信息

```shell
curl -X GET "localhost:9200/_cat/indices/twitter1?v&pretty"
```

* response

```json
health status index    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   twitter1 bNdy8gxLTOKtONj8BCnyKg   5   1          1            0      4.3kb          4.3kb
```

> 指定的索引，支持通配符

```shell
curl -X GET "localhost:9200/_cat/indices/test*?v&pretty"
```

* response

```json
health status index      uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green open   test       R2XdP1htQT28uVgbbwDfSw   5   1          2            0      7.1kb          7.1kb
yellow open   test_index iySWbJfXTfy2v2bQiLYlJw   5   1          1            0        4kb            4kb
```



## cat master

 获取到master的部分信息

```shell
curl -X GET "localhost:9200/_cat/master?v&pretty"
```

* response

```json
id                     host      ip        node
YzWoH_2BT-6UjVGDyPdqYg 127.0.0.1 127.0.0.1 YzWoH_2
```



## cat nodes

获取到各个节点上的linux 物理信息

```shell
curl -X GET "localhost:9200/_cat/nodes?v&pretty"
```

* response

```json
ip           heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
10.129.8.16             9          99   9    1.82    1.50     1.44 mdi       -      node-3
10.129.8.112           11          94   0    0.06    0.17     0.21 mdi       -      node-1
10.129.8.113           11          49   1    0.37    0.56     0.42 mdi       *      node-2
```

> 以上默认展示了几个字段。
>
> 除此以外，还可以指定其他的字段显示，具体的字段信息，详见下表。
>
> 注意手动指定字段以后，默认字段将不会自动显示。

EXample:

```shell
curl -X GET "localhost:9200/_cat/nodes?v&h=id,ip,port,v,m&pretty"
```

* response

```json
id   ip        port  v         m
veJR 127.0.0.1 59938 5.2.2 *
```

* Table

| Header                         | Alias                               | Appear by Default | Description                                                  | Example        |
| ------------------------------ | ----------------------------------- | ----------------- | ------------------------------------------------------------ | -------------- |
| `id`                           | `nodeId`                            | No                | Unique node ID                                               | k0zy           |
| `pid`                          | `p`                                 | No                | Process ID                                                   | 13061          |
| `ip`                           | `i`                                 | Yes               | IP address                                                   | 127.0.1.1      |
| `port`                         | `po`                                | No                | Bound transport port                                         | 9300           |
| `http_address`                 | `http`                              | No                | Bound http address                                           | 127.0.0.1:9200 |
| `version`                      | `v`                                 | No                | Elasticsearch version                                        | 5.2.2          |
| `build`                        | `b`                                 | No                | Elasticsearch Build hash                                     | 5c03844        |
| `jdk`                          | `j`                                 | No                | Running Java version                                         | 1.8.0          |
| `disk.avail`                   | `d`, `disk`, `diskAvail`            | No                | Available disk space                                         | 1.8gb          |
| `heap.current`                 | `hc`, `heapCurrent`                 | No                | Used heap                                                    | 311.2mb        |
| `heap.percent`                 | `hp`, `heapPercent`                 | Yes               | Used heap percentage                                         | 7              |
| `heap.max`                     | `hm`, `heapMax`                     | No                | Maximum configured heap                                      | 1015.6mb       |
| `ram.current`                  | `rc`, `ramCurrent`                  | No                | Used total memory                                            | 513.4mb        |
| `ram.percent`                  | `rp`, `ramPercent`                  | Yes               | Used total memory percentage                                 | 47             |
| `ram.max`                      | `rm`, `ramMax`                      | No                | Total memory                                                 | 2.9gb          |
| `file_desc.current`            | `fdc`, `fileDescriptorCurrent`      | No                | Used file descriptors                                        | 123            |
| `file_desc.percent`            | `fdp`, `fileDescriptorPercent`      | Yes               | Used file descriptors percentage                             | 1              |
| `file_desc.max`                | `fdm`, `fileDescriptorMax`          | No                | Maximum number of file descriptors                           | 1024           |
| `cpu`                          |                                     | No                | Recent system CPU usage as percent                           | 12             |
| `load_1m`                      | `l`                                 | No                | Most recent load average                                     | 0.22           |
| `load_5m`                      | `l`                                 | No                | Load average for the last five minutes                       | 0.78           |
| `load_15m`                     | `l`                                 | No                | Load average for the last fifteen minutes                    | 1.24           |
| `uptime`                       | `u`                                 | No                | Node uptime                                                  | 17.3m          |
| `node.role`                    | `r`, `role`, `nodeRole`             | Yes               | Master eligible node (m); Data node (d); Ingest node (i); Coordinating node only (-) | mdi            |
| `master`                       | `m`                                 | Yes               | Elected master (*); Not elected master (-)                   | *              |
| `name`                         | `n`                                 | Yes               | Node name                                                    | I8hydUG        |
| `completion.size`              | `cs`, `completionSize`              | No                | Size of completion                                           | 0b             |
| `fielddata.memory_size`        | `fm`, `fielddataMemory`             | No                | Used fielddata cache memory                                  | 0b             |
| `fielddata.evictions`          | `fe`, `fielddataEvictions`          | No                | Fielddata cache evictions                                    | 0              |
| `query_cache.memory_size`      | `qcm`, `queryCacheMemory`           | No                | Used query cache memory                                      | 0b             |
| `query_cache.evictions`        | `qce`, `queryCacheEvictions`        | No                | Query cache evictions                                        | 0              |
| `request_cache.memory_size`    | `rcm`, `requestCacheMemory`         | No                | Used request cache memory                                    | 0b             |
| `request_cache.evictions`      | `rce`, `requestCacheEvictions`      | No                | Request cache evictions                                      | 0              |
| `request_cache.hit_count`      | `rchc`, `requestCacheHitCount`      | No                | Request cache hit count                                      | 0              |
| `request_cache.miss_count`     | `rcmc`, `requestCacheMissCount`     | No                | Request cache miss count                                     | 0              |
| `flush.total`                  | `ft`, `flushTotal`                  | No                | Number of flushes                                            | 1              |
| `flush.total_time`             | `ftt`, `flushTotalTime`             | No                | Time spent in flush                                          | 1              |
| `get.current`                  | `gc`, `getCurrent`                  | No                | Number of current get operations                             | 0              |
| `get.time`                     | `gti`, `getTime`                    | No                | Time spent in get                                            | 14ms           |
| `get.total`                    | `gto`, `getTotal`                   | No                | Number of get operations                                     | 2              |
| `get.exists_time`              | `geti`, `getExistsTime`             | No                | Time spent in successful gets                                | 14ms           |
| `get.exists_total`             | `geto`, `getExistsTotal`            | No                | Number of successful get operations                          | 2              |
| `get.missing_time`             | `gmti`, `getMissingTime`            | No                | Time spent in failed gets                                    | 0s             |
| `get.missing_total`            | `gmto`, `getMissingTotal`           | No                | Number of failed get operations                              | 1              |
| `indexing.delete_current`      | `idc`, `indexingDeleteCurrent`      | No                | Number of current deletion operations                        | 0              |
| `indexing.delete_time`         | `idti`, `indexingDeleteTime`        | No                | Time spent in deletions                                      | 2ms            |
| `indexing.delete_total`        | `idto`, `indexingDeleteTotal`       | No                | Number of deletion operations                                | 2              |
| `indexing.index_current`       | `iic`, `indexingIndexCurrent`       | No                | Number of current indexing operations                        | 0              |
| `indexing.index_time`          | `iiti`, `indexingIndexTime`         | No                | Time spent in indexing                                       | 134ms          |
| `indexing.index_total`         | `iito`, `indexingIndexTotal`        | No                | Number of indexing operations                                | 1              |
| `indexing.index_failed`        | `iif`, `indexingIndexFailed`        | No                | Number of failed indexing operations                         | 0              |
| `merges.current`               | `mc`, `mergesCurrent`               | No                | Number of current merge operations                           | 0              |
| `merges.current_docs`          | `mcd`, `mergesCurrentDocs`          | No                | Number of current merging documents                          | 0              |
| `merges.current_size`          | `mcs`, `mergesCurrentSize`          | No                | Size of current merges                                       | 0b             |
| `merges.total`                 | `mt`, `mergesTotal`                 | No                | Number of completed merge operations                         | 0              |
| `merges.total_docs`            | `mtd`, `mergesTotalDocs`            | No                | Number of merged documents                                   | 0              |
| `merges.total_size`            | `mts`, `mergesTotalSize`            | No                | Size of current merges                                       | 0b             |
| `merges.total_time`            | `mtt`, `mergesTotalTime`            | No                | Time spent merging documents                                 | 0s             |
| `refresh.total`                | `rto`, `refreshTotal`               | No                | Number of refreshes                                          | 16             |
| `refresh.time`                 | `rti`, `refreshTime`                | No                | Time spent in refreshes                                      | 91ms           |
| `script.compilations`          | `scrcc`, `scriptCompilations`       | No                | Total script compilations                                    | 17             |
| `script.cache_evictions`       | `scrce`, `scriptCacheEvictions`     | No                | Total compiled scripts evicted from cache                    | 6              |
| `search.fetch_current`         | `sfc`, `searchFetchCurrent`         | No                | Current fetch phase operations                               | 0              |
| `search.fetch_time`            | `sfti`, `searchFetchTime`           | No                | Time spent in fetch phase                                    | 37ms           |
| `search.fetch_total`           | `sfto`, `searchFetchTotal`          | No                | Number of fetch operations                                   | 7              |
| `search.open_contexts`         | `so`, `searchOpenContexts`          | No                | Open search contexts                                         | 0              |
| `search.query_current`         | `sqc`, `searchQueryCurrent`         | No                | Current query phase operations                               | 0              |
| `search.query_time`            | `sqti`, `searchQueryTime`           | No                | Time spent in query phase                                    | 43ms           |
| `search.query_total`           | `sqto`, `searchQueryTotal`          | No                | Number of query operations                                   | 9              |
| `search.scroll_current`        | `scc`, `searchScrollCurrent`        | No                | Open scroll contexts                                         | 2              |
| `search.scroll_time`           | `scti`, `searchScrollTime`          | No                | Time scroll contexts held open                               | 2m             |
| `search.scroll_total`          | `scto`, `searchScrollTotal`         | No                | Completed scroll contexts                                    | 1              |
| `segments.count`               | `sc`, `segmentsCount`               | No                | Number of segments                                           | 4              |
| `segments.memory`              | `sm`, `segmentsMemory`              | No                | Memory used by segments                                      | 1.4kb          |
| `segments.index_writer_memory` | `siwm`, `segmentsIndexWriterMemory` | No                | Memory used by index writer                                  | 18mb           |
| `segments.version_map_memory`  | `svmm`, `segmentsVersionMapMemory`  | No                | Memory used by version map                                   | 1.0kb          |
| `segments.fixed_bitset_memory` | `sfbm`, `fixedBitsetMemory`         | No                | Memory used by fixed bit sets for nested object field types and type filters for types referred in _parent fields | 1.0kb          |
| `suggest.current`              | `suc`, `suggestCurrent`             | No                | Number of current suggest operations                         | 0              |
| `suggest.time`                 | `suti`, `suggestTime`               | No                | Time spent in suggest                                        | 0              |
| `suggest.total`                | `suto`, `suggestTotal`              | No                | Number of suggest operations                                 | 0              |



## cat repositories

查看快照的仓库列表

```shell
curl -X GET "localhost:9200/_cat/repositories?v&pretty"
```

* response

```json
id                 type
repo1              fs
repo2              fs
```



## cat snapshots

查询指定仓库下的快照列表

```shell
% curl 'localhost:9200/_cat/snapshots/repo1?v'
```

* response

```json
id     status start_epoch start_time end_epoch  end_time duration indices successful_shards failed_shards total_shards
snap1  FAILED 1445616705  18:11:45   1445616978 18:16:18     4.6m       1                 4             1            5
snap2 SUCCESS 1445634298  23:04:58   1445634672 23:11:12     6.2m       2 
```



## cat thread pool

thread_pool 命令显示每个节点的集群范围线程池统计信息。默认情况下，将返回所有线程池的活动、队列和拒绝的统计信息。

```shell
curl -X GET "localhost:9200/_cat/thread_pool?v&pretty"
```

* response

```json
node_name name                active queue rejected
node-3    bulk                     0     0        0
node-3    fetch_shard_started      0     0        0
node-3    fetch_shard_store        0     0        0
node-3    flush                    0     0        0
node-3    force_merge              0     0        0
node-3    generic                  0     0        0
node-3    get                      0     0        0
node-3    index                    0     0        0
node-3    listener                 0     0        0
node-3    management               1     0        0
node-3    refresh                  0     0        0
node-3    search                   0     0        0
node-3    snapshot                 0     0        0
node-3    warmer                   0     0        0
```

> url后面可以跟上线程池的名称(name),用于查看指定线程池的状态。
>
> 支持通配符，和逗号分割。

Example:

```shell
% curl 'localhost:9200/_cat/thread_pool/generic?v&h=id,name,active,rejected,completed'
id                     name    active rejected completed
0EWUhXeBQtaVGlexUeVwMg generic      0        0        70
```



### Thread Pool Fields

除此以外还有其他的可以选字段。使用h=field参数指定即可。

| Field Name   | Alias | Description                                                  |
| ------------ | ----- | ------------------------------------------------------------ |
| `type`       | `t`   | The current (*) type of thread pool (`fixed` or `scaling`)   |
| `active`     | `a`   | The number of active threads in the current thread pool      |
| `size`       | `s`   | The number of threads in the current thread pool             |
| `queue`      | `q`   | The number of tasks in the queue for the current thread pool |
| `queue_size` | `qs`  | The maximum number of tasks permitted in the queue for the current thread pool |
| `rejected`   | `r`   | The number of tasks rejected by the thread pool executor     |
| `largest`    | `l`   | The highest number of active threads in the current thread pool |
| `completed`  | `c`   | The number of tasks completed by the thread pool executor    |
| `min`        | `mi`  | The configured minimum number of active threads allowed in the current thread pool |
| `max`        | `ma`  | The configured maximum number of active threads allowed in the current thread pool |
| `keep_alive` | `k`   | The configured keep alive time for threads                   |



### Other Fields

还有一部分可选字段。

| Field Name     | Alias | Description                                   |
| -------------- | ----- | --------------------------------------------- |
| `node_id`      | `id`  | The unique node ID                            |
| `ephemeral_id` | `eid` | The ephemeral node ID                         |
| `pid`          | `p`   | The process ID of the running node            |
| `host`         | `h`   | The hostname for the current node             |
| `ip`           | `i`   | The IP address for the current node           |
| `port`         | `po`  | The bound transport port for the current node |



## cat shards 

查看集群中的所有分片信息

```shell
% curl 192.168.56.20:9200/_cat/shards?v 
index      shard prirep state      docs  store ip        node
twitter    2     p      STARTED       1  3.4kb 127.0.0.1 JyvStC0
twitter    2     r      UNASSIGNED                       
twitter    4     p      STARTED       2    8kb 127.0.0.1 JyvStC0
twitter    4     r      UNASSIGNED                       
...
```

> 也可以在url 后面指定索引的名称，查看该索引下的所有分片。
>
> 支持通配符，和逗号分隔。

```shell
 curl 192.168.56.20:9200/_cat/shards/test,twitter?v 
 index   shard prirep state      docs  store ip        node
twitter 2     p      STARTED       1  3.4kb 127.0.0.1 JyvStC0
twitter 2     r      UNASSIGNED                       
twitter 4     p      STARTED       2    8kb 127.0.0.1 JyvStC0
twitter 4     r      UNASSIGNED                       
twitter 1     p      STARTED       4 18.3kb 127.0.0.1 JyvStC0
twitter 1     r      UNASSIGNED                       
twitter 3     p      STARTED       4 15.8kb 127.0.0.1 JyvStC0
twitter 3     r      UNASSIGNED                       
twitter 0     p      STARTED       1  4.5kb 127.0.0.1 JyvStC0
twitter 0     r      UNASSIGNED                       
test    2     p      STARTED       0   159b 127.0.0.1 JyvStC0
test    2     r      UNASSIGNED                       
test    4     p      STARTED       1  3.3kb 127.0.0.1 JyvStC0
test    4     r      UNASSIGNED                       
test    1     p      STARTED       0   130b 127.0.0.1 JyvStC0
test    1     r      UNASSIGNED                       
test    3     p      STARTED       1  3.3kb 127.0.0.1 JyvStC0
test    3     r      UNASSIGNED                       
test    0     p      STARTED       0   130b 127.0.0.1 JyvStC0
test    0     r      UNASSIGNED                       
```



### Reasons for unassigned shard

These are the possible reasons for a shard to be in a unassigned state:

| `INDEX_CREATED`           | Unassigned as a result of an API creation of an index.       |
| ------------------------- | ------------------------------------------------------------ |
| `CLUSTER_RECOVERED`       | Unassigned as a result of a full cluster recovery.           |
| `INDEX_REOPENED`          | Unassigned as a result of opening a closed index.            |
| `DANGLING_INDEX_IMPORTED` | Unassigned as a result of importing a dangling index.        |
| `NEW_INDEX_RESTORED`      | Unassigned as a result of restoring into a new index.        |
| `EXISTING_INDEX_RESTORED` | Unassigned as a result of restoring into a closed index.     |
| `REPLICA_ADDED`           | Unassigned as a result of explicit addition of a replica.    |
| `ALLOCATION_FAILED`       | Unassigned as a result of a failed allocation of the shard.  |
| `NODE_LEFT`               | Unassigned as a result of the node hosting it leaving the cluster. |
| `REROUTE_CANCELLED`       | Unassigned as a result of explicit cancel reroute command.   |
| `REINITIALIZED`           | When a shard moves from started back to initializing, for example, with shadow replicas. |
| `REALLOCATED_REPLICA`     | A better replica location is identified and causes the existing replica allocation to be cancelled. |


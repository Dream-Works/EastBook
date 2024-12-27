---
title: Search API
author: 
createTime: 2024/01/26 14:57:23
permalink: /note/doc/7t2bdgjr/
---
# Search API

## URL Search

在url 后面加上_search可以对指定的type进行内容检索。

如果没有任何参数，默认查询type的所有内容。

```shell
curl -X GET "localhost:9200/twitter/tweet/_search"
```

* response

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "failed": 0
    },
    "hits": {
        "total": 10,
        "max_score": 1,
        "hits": [
            {
                "_index": "twitter",
                "_type": "tweet",
                "_id": "AY0sQyggUZj-tqz1dZ3x",
                "_score": 1,
                "_source": {
                    "user": "kimchy",
                    "post_date": "2009-11-15T14:12:12",
                    "message": "trying out Elasticsearch"
                }
            },
          ..........
          ..........
          ...........
            {
                "_index": "twitter",
                "_type": "tweet",
                "_id": "3",
                "_score": 1,
                "_source": {
                    "user": "kimchy",
                    "post_date": "2009-11-15T14:12:12",
                    "message": "elasticsearch now has versioning support, double cool!"
                }
            }
        ]
    }
}
```



### Multi-Index, Multi-Type

* 查询时可以指定多个类型

```console
GET /twitter/tweet,user/_search?q=user:kimchy
```

* 指定多个索引

```console
GET /kimchy,elasticsearch/tweet/_search?q=tag:wow
```

* 指定全部索引中的某个type

```console
GET /_all/tweet/_search?q=tag:wow
```

* 查看所有索引的所有types

```console
GET /_search?q=tag:wow
```



### Parameters

> 并且在url的后面可以添加查询参数。
>
> q=user:kimchy 表示查询user字段=kimchy的文档。

```shell
curl -X GET "localhost:9200/twitter/tweet/_search?q=user:kimchy&pretty"
```

* response

```json
{
    "timed_out": false,
    "took": 62,
    "_shards":{
        "total" : 1,
        "successful" : 1,
        "failed" : 0
    },
    "hits":{
        "total" : 1,
        "max_score": 1.3862944,
        "hits" : [
            {
                "_index" : "twitter",
                "_type" : "tweet",
                "_id" : "0",
                "_score": 1.3862944,
                "_source" : {
                    "user" : "kimchy",
                    "date" : "2009-11-15T14:12:12",
                    "message" : "trying out Elasticsearch",
                    "likes": 0
                }
            }
        ]
    }
}
```

* 其他参数

| Name               | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `q`                | The query string (maps to the `query_string` query, see [*Query String Query*](https://www.elastic.co/guide/en/elasticsearch/reference/5.2/query-dsl-query-string-query.html) for more details). |
| `df`               | The default field to use when no field prefix is defined within the query. |
| `analyzer`         | The analyzer name to be used when analyzing the query string. |
| `analyze_wildcard` | Should wildcard and prefix queries be analyzed or not. Defaults to `false`. |
| `default_operator` | The default operator to be used, can be `AND` or `OR`. Defaults to `OR`. |
| `lenient`          | If set to true will cause format based failures (like providing text to a numeric field) to be ignored. Defaults to false. |
| `explain`          | For each hit, contain an explanation of how scoring of the hits was computed. |
| `_source`          | Set to `false` to disable retrieval of the `_source` field. You can also retrieve part of the document by using `_source_include` & `_source_exclude` (see the [request body](https://www.elastic.co/guide/en/elasticsearch/reference/5.2/search-request-source-filtering.html) documentation for more details) |
| `stored_fields`    | The selective stored fields of the document to return for each hit, comma delimited. Not specifying any value will cause no fields to return. |
| `sort`             | Sorting to perform. Can either be in the form of `fieldName`, or `fieldName:asc`/`fieldName:desc`. The fieldName can either be an actual field within the document, or the special `_score` name to indicate sorting based on scores. There can be several `sort` parameters (order is important). |
| `track_scores`     | When sorting, set to `true` in order to still track scores and return them as part of each hit. |
| `timeout`          | A search timeout, bounding the search request to be executed within the specified time value and bail with the hits accumulated up to that point when expired. Defaults to no timeout. |
| `terminate_after`  | The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early. If set, the response will have a boolean field `terminated_early` to indicate whether the query execution has actually terminated_early. Defaults to no terminate_after. |
| `from`             | The starting from index of the hits to return. Defaults to `0`. |
| `size`             | The number of hits to return. Defaults to `10`.              |
| `search_type`      | The type of the search operation to perform. Can be `dfs_query_then_fetch` or `query_then_fetch`. Defaults to `query_then_fetch`. See [*Search Type*](https://www.elastic.co/guide/en/elasticsearch/reference/5.2/search-request-search-type.html) for more details on the different types of search that can be performed. |



### Routing

_search 查询时，默认会检索所有的分片。 如果数据量庞大，效率会非常低。

所以可以加上routing参数，告知ES此文档的数据在哪一个分片上，将极大提高检索效率。

* 添加数据

```shell
curl -X POST "localhost:9200/twitter/tweet?routing=kimchy&pretty" -d'
{
    "user" : "kimchy",
    "postDate" : "2009-11-15T14:12:12",
    "message" : "trying out Elasticsearch"
}
'
```

* 查询数据

```shell
curl -X POST "localhost:9200/twitter/tweet/_search?routing=kimchy&pretty" 
```



## Request Body Search






















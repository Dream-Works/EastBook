---
title: Query DSL
author: 
createTime: 2024/01/26 15:31:18
permalink: /note/doc/eukmybkp/
---
# Query DSL

## Match All Query

匹配所有的文档。

```shell
curl -X GET "localhost:9200/_search?pretty"  -d'
{
    "query": {
        "match_all": {}
    }
}
'
```

* response

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 20,
        "successful": 20,
        "failed": 0
    },
    "hits": {
        "total": 24,
        "max_score": 1,			 //最高分数
        "hits": [
            {
                "_index": "twitter",
                "_type": "tweet",
                "_id": "AY0sQyggUZj-tqz1dZ3x",
                "_score": 1,							//匹配得分
                "_source": {
                    "user": "kimchy",
                    "post_date": "2009-11-15T14:12:12",
                    "message": "trying out Elasticsearch"
                }
            },
            ........
            {
                "_index": "twitter",
                "_type": "tweet",
                "_id": "AY1EkjZXUZj-tqz1dZ4M",
                "_score": 1,
                "_routing": "kimchy",
                "_source": {
                    "user": "kimchy",
                    "postDate": "2009-11-15T14:12:12",
                    "message": "trying out Elasticsearch"
                }
            }
        ]
    }
}
```

> ES 会对每个匹配到的文档打个分数，用来表示此文档的匹配度。
>
> 得分越高的文档，会被优先排序在最前面。
>
> _score  表示就就是当前文档的得分。
>
> Max_score 表示本次查询中，得分最高的文档的分数。

也可以调整socre的最大值。

```shell
curl -X GET "localhost:9200/_search?pretty" -d'
{
    "query": {
        "match_all": { "boost" : 1.2 }		#分数最大值调整完诶1.2
    }
}
'
```

* response

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 20,
        "successful": 20,
        "failed": 0
    },
    "hits": {
        "total": 24,
        "max_score": 1.2,			 //最高分数
        "hits": [
            {
                "_index": "twitter",
                "_type": "tweet",
                "_id": "AY0sQyggUZj-tqz1dZ3x",
                "_score": 1.2,							//匹配得分
                "_source": {
                    "user": "kimchy",
                    "post_date": "2009-11-15T14:12:12",
                    "message": "trying out Elasticsearch"
                }
            },
            ........
            {
                "_index": "twitter",
                "_type": "tweet",
                "_id": "AY1EkjZXUZj-tqz1dZ4M",
                "_score": 1.2,
                "_routing": "kimchy",
                "_source": {
                    "user": "kimchy",
                    "postDate": "2009-11-15T14:12:12",
                    "message": "trying out Elasticsearch"
                }
            }
        ]
    }
}
```

> 可以看到max_score也发生了改变。



## Match None Query

不匹配任何文档，与match_all相反。

```shell
curl -X GET "localhost:9200/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_none": {}
    }
}
'
```

* response

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 20,
        "successful": 20,
        "failed": 0
    },
    "hits": {
        "total": 0,
        "max_score": null,
        "hits": []
    }
}
```

> hits.hits 返回了一个空集。



## Full text queries

### Match Query

Match 可以接受且只接受一个key-value,key是需要查询文档的字段名称，value是该字段的匹配内容。

ES会对Vlaue的内容进行分词（分成几个单词或词语），然后逐个对单词或者词语进行包含匹配。

```shell
curl -X GET "localhost:9200/test_index/_search" -d '
{
    "query": {
        "match": {
            "title": "手 米"
        }
    }
}'
```

* response

如下，包含”手“ 或者”米“ 内容的都会被检索到。

```json
{
    "took": 3,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "failed": 0
    },
    "hits": {
        "total": 13,
        "max_score": 1.2530748,
        "hits": [
            {
                "_index": "test_index",
                "_type": "doc",
                "_id": "AY1E17XKUZj-tqz1dZ4g",
                "_score": 1.2530748,
                "_source": {
                    "title": "小米手机",
                    "price": 69999,
                    "mesage": "国货之光"
                }
            },
        
            {
                "_index": "test_index",
                "_type": "doc",
                "_id": "AY1E1rfrUZj-tqz1dZ4X",
                "_score": 0.7658316,
                "_source": {
                    "title": "小米",
                    "price": 1999,
                    "mesage": "为发烧而生"
                }
            },
            {
                "_index": "test_index",
                "_type": "doc",
                "_id": "AY1E16CPUZj-tqz1dZ4e",
                "_score": 0.4084168,
                "_source": {
                    "title": "华为手机",
                    "price": 69999,
                    "mesage": "国货之光"
                }
            },
        ]
    }
}
```



### Match Phrase Query

match_phrase 不会对查询内容进行分词，而是直接对内容进行包含匹配。

**EXample 1:**

```shell
curl -X GET "localhost:9200/test_index/_search" -d '
{
    "query": {
        "match_phrase": {
            "title": "手 米"
        }
    }
}'
```

* response

没有匹配到内容，因为所有的文档中的title不包含”手 米“ 这个连续的内容，恰恰证明mach_phrase没有对查询内容进行分词。

```json
 {
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "failed": 0
    },
    "hits": {
        "total": 0,
        "max_score": null,
        "hits": []
    }
}
```



 **Example 2:**

```shell
curl -X GET "localhost:9200/test_index/_search" -d '
{
    "query": {
        "match_phrase": {
            "title": "小米手"
        }
    }
}'
```

* response

匹配到内容

```json 
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "failed": 0
    },
    "hits": {
        "total": 6,
        "max_score": 1.8299086,
        "hits": [
            {
                "_index": "test_index",
                "_type": "doc",
                "_id": "AY1E17bqUZj-tqz1dZ4i",
                "_score": 1.8299086,
                "_source": {
                    "title": "小米手机",
                    "price": 69999,
                    "mesage": "国货之光"
                }
            },
            ......
            {
                "_index": "test_index",
                "_type": "doc",
                "_id": "AY1E2hk6UZj-tqz1dZ4j",
                "_score": 0.8630463,
                "_source": {
                    "title": "小米手机",
                    "price": 6999,
                    "mesage": "国货之光"
                }
            }
        ]
    }
}
```



### Match Phrase Prefix Query

macth phrase prefix 和match phrase 类似，可以查询的一个完整的短语。但是它有一个额外的功能,允许短语的最后一个字母，是一个前缀。

意思为这个字母，是该短语后一个单词的首字母。

```shell
curl -X GET "http://localhost:9200/test_index/_search" -d '{
  "query": {
    "match_phrase": {
      "mesage": "Let us make friends."
    }
  }
}'
```

* response

```json
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 5.7593694,
    "hits": [
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY1FJGQXUZj-tqz1dZ41",
        "_score": 5.7593694,
        "_source": {
          "title": "小米手机",
          "price": 6999,
          "mesage": "Let us make friends."
        }
      },
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY1FJGIxUZj-tqz1dZ4z",
        "_score": 4.0507894,
        "_source": {
          "title": "小米手机",
          "price": 6999,
          "mesage": "Let us make friends."
        }
      },
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY1FJGN_UZj-tqz1dZ40",
        "_score": 3.6935081,
        "_source": {
          "title": "小米手机",
          "price": 6999,
          "mesage": "Let us make friends."
        }
      }
    ]
  }
}
```

如上，test_index索引中有几个message为“Let us make friends.” 的文档。

但如果我们使用match phrase frefix 可以这样检索。

```shell
curl -X GET "http://localhost:9200/_search" -d '{
    "query": {
        "match_phrase_prefix" : {
            "message" : "Let us make f"	
        }
    }
}'
# Let us make f 并不完整，f只是friends 单词的首字母。
# 当然 如果使用 Let us make fri 也是可以搜到的，因为i 是iends 这个词的首字母。
```

* response

```json
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 5.7593694,
    "hits": [
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY1FJGQXUZj-tqz1dZ41",
        "_score": 5.7593694,
        "_source": {
          "title": "小米手机",
          "price": 6999,
          "mesage": "Let us make friends."
        }
      },
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY1FJGIxUZj-tqz1dZ4z",
        "_score": 4.0507894,
        "_source": {
          "title": "小米手机",
          "price": 6999,
          "mesage": "Let us make friends."
        }
      },
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY1FJGN_UZj-tqz1dZ40",
        "_score": 3.6935081,
        "_source": {
          "title": "小米手机",
          "price": 6999,
          "mesage": "Let us make friends."
        }
      }
    ]
  }
}
```



### Mutil Match

多字段匹配，就是可以指定多个字段查询相同的内容。

```shell
curl -XGET 'http://localhost:9200/test_index/_search' -d '{
  "query": {
    "multi_match": {
      "query": "小米手机",
      "fields": ["title", "message"]
    }
  }
}'
```

* response

```json
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 49,
    "max_score": 2.803724,
    "hits": [
      {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY18f7yGUZj-tqz1dZ5S",
        "_score": 2.803724,
        "_source": {
          "title": "小米手机",
          "price": 1999,
          "message": "小米手机为发烧而生6"
        },
         {
        "_index": "test_index",
        "_type": "doc",
        "_id": "AY18f7yGUZj-tqz1dZ5S",
        "_score": 2.803724,
        "_source": {
          "title": "小米手机",
          "price": 1999,
          "message": "Let us make friends."
        },
      }
    ]
  }
}
```

可以看到，只要任意字段包含要查询的字符串，就会被检索到。 



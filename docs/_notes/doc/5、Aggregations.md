---
Title: Aggregations
title: 5、Aggregations
author: 
createTime: 2024/04/25 16:47:22
permalink: /note/doc/sx44sugz/
---









```json

POST /_bulk
{"index": {"_index": "articles", "_id": "1"}}
{"title": "Article 1", "content": "This is the first article.", "date": "2023-03-15T12:00:00Z", "price": 9.99}
{"index": {"_index": "articles", "_id": "2"}}
{"title": "Article 2", "content": "This is the second article.", "date": "2023-03-22T15:30:00Z", "price": 14.99}
{"index": {"_index": "articles", "_id": "3"}}
{"title": "Article 3", "content": "Third article of the month.", "date": "2023-04-10T09:00:00Z", "price": 12.99}
{"index": {"_index": "articles", "_id": "4"}}
{"title": "Article 4", "content": "April article with a different perspective.", "date": "2023-04-25T14:45:00Z", "price": 8.95}
{"index": {"_index": "articles", "_id": "5"}}
{"title": "Article 5", "content": "Discussing the latest market trends.", "date": "2023-05-05T11:20:00Z", "price": 19.99}
{"index": {"_index": "articles", "_id": "6"}}
{"title": "Article 6", "content": "In-depth analysis of the tech industry.", "date": "2023-05-18T16:10:00Z", "price": 24.99}
{"index": {"_index": "articles", "_id": "7"}}
{"title": "Article 7", "content": "Exploring the future of renewable energy.", "date": "2023-05-31T10:00:00Z", "price": 29.99}
{"index": {"_index": "articles", "_id": "8"}}
{"title": "Article 8", "content": "A guide to healthy living for the whole family.", "date": "2023-06-15T08:30:00Z", "price": 15.99}
{"index": {"_index": "articles", "_id": "9"}}
{"title": "Article 9", "content": "The art of mindfulness and meditation.", "date": "2023-06-28T13:45:00Z", "price": 11.99}
{"index": {"_index": "articles", "_id": "10"}}
{"title": "Article 10", "content": "Top travel destinations for the summer.", "date": "2023-06-30T17:00:00Z", "price": 16.99}
{"index": {"_index": "articles", "_id": "11"}}
{"title": "Article 11", "content": "A comprehensive review of the new smartphone.", "date": "2023-07-15T09:45:00Z", "price": 22.99}
{"index": {"_index": "articles", "_id": "12"}}
{"title": "Article 12", "content": "The impact of AI on modern society.", "date": "2023-07-28T14:30:00Z", "price": 18.99}

```


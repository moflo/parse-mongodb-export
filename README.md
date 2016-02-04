Node.js - parse-mongodb-export
==============================

Parse JSON file migration tool for Mongolab.

[![Build Status](https://travis-ci.org/moflo/parse-mongodb-export.svg?branch=master)](https://travis-ci.org/moflo/parse-mongodb-export)

Why?
----

Native Parse.com JSON file export is incompatible with Mongolab import. This utility can help refactor the Parse JSON format to a format which is compatible with Mongolab JSON schemes to help preserve objectId and date formats.

Converts Parse JSON from this:

    { "results": [
    	{
            "automaticUser": true,
            "avatar_url": "",
            "createdAt": "2014-01-13T12:11:47.185Z",
            "didBuyCredits": false,
            "isActive": true,
            "objectId": "08Ve1yyCrp",
            "tokens": 2,
            "updatedAt": "2014-01-13T14:52:14.141Z",
            "username": "ChunkyGoat3803"
        },
        ...


To this JSON format which is compatible with Mongolab JSON import:

    [
      {
            "automaticUser": true,
            "avatar_url": "",
            "created_at": {
              "$date" : "2014-01-13T12:11:47.185Z"
              },
            "didBuyCredits": false,
            "isActive": true,
            "_id": "08Ve1yyCrp",
            "tokens": 2,
            "updated_at": {
              "$date": "2014-01-13T14:52:14.141Z"
              },
            "username": "ChunkyGoat3803"
        },
        ...
        ]

___

Installation
------------

    npm install parse-mongodb-export

Usage
-----

    parse-mongodb-export -f parse.json -o parse-mongolab.json


API
---

    Usage: index [options]

    Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -f, --file [name]     Parse JSON file to convert for export [parse.json]
    -o, --out [name]      Output file name for converted JSON [out.json]
    -r, --results [name]  Name of Parse results field ["results"]
    -v, --verbose         Use verbose mode

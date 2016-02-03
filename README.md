Node.js - parse-mongodb-export
==============================

Parse JSON file migration tool for Mongolab.

[![build status](https://secure.travis-ci.org/moflo/node-parse-mongodb-export.svg)](http://travis-ci.org/moflo/node-parse-mongodb-export)


Why?
----

Native Parse.com JSON file export is incompatible with Mongolab import. This utility can help refactor the Parse JSON format to a format which is compatible with Mongolab JSON schemes to help preserve objectId and date formats.



Installation
------------

    npm install parse-mongodb-export



API
---

    Usage: index [options]

    Options:

      -h, --help                output usage information
      -V, --version             output the version number
      -dir, --directory [name]  Directory of Parse JSON files [parse_json]
      -b, --verbose             Use verbose mode

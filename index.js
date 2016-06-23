#! /usr/bin/env node

/*
 * parse-mongodb-export
 *
 * Script to import JSON files created by Parse export and upload them to an existing Mongolab db
*/

var pme = require('commander')
var jsonfile = require('jsonfile')

pme
  .version('0.1.1')
  .option('-f, --file [name]', 'Parse JSON file to convert for export [parse.json]', 'parse.json')
  .option('-o, --out [name]', 'Output file name for converted JSON [out.json]', 'out.json')
  .option('-r, --results [name]', 'Name of Parse results field ["results"]', 'results')
  .option('-v, --verbose', 'Use verbose mode')
  .parse(process.argv)

if (pme.verbose) console.log('Runnding parse-mongodb-export:')
if (pme.verbose) console.log('  - verbose')
if (pme.verbose) console.log('  - %s JSON file', pme.file)

var file = './' + pme.file
jsonfile.readFile(file, function (err, obj) {
  if (err) { console.error(err); return 0 }

  var ofile = pme.out
  var resultsName = pme.results
  var parseArray = obj[resultsName]
  if (parseArray === undefined) { console.error('No results object found. Use -r to specify.'); return 0 }
  if (pme.verbose) console.log(' - parseArray:')
  if (pme.verbose) console.log(parseArray)
  if (pme.verbose) console.log(' - parseItem:')

  var newArray = []
  for (var i = 0, size = parseArray.length; i < size; i++) {
    var parseItem = parseArray[i]
    if (pme.verbose) console.log(i)
    if (pme.verbose) console.log(parseItem)

    var keys = Object.keys(parseItem)
    for (var j = 0, count = keys.length; j < count; j++) {
      var parseField = keys[j]
      if (pme.verbose) console.log(parseField)

      if (parseField === 'objectId') {
        parseItem['_id'] = parseItem['objectId'];
        delete parseItem['objectId'];
      }
      if (parseField === 'createdAt') {
        parseItem['_created_at'] = { '$date': parseItem['createdAt'] };
        delete parseItem['createdAt'];
      }
      if (parseField === 'updatedAt') {
        parseItem['_updated_at'] = { '$date': parseItem['updatedAt'] };
        delete parseItem['updatedAt'];
      }
    }
    newArray.push(parseItem)
  }

  if (pme.verbose) console.log(newArray)

  jsonfile.writeFile(ofile, newArray, function (err) {
    if (err) { console.error(err); return 0 }
  })
})

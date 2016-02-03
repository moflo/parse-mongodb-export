/*
 * parse-mongodb-export
 *
 * Script to import JSON files created by Parse export and upload them to an existing Mongolab db
*/

var pme = require('commander')
var jsonfile = require('jsonfile')

pme
  .version('0.1.0')
  .option('-f, --file [name]', 'Parse JSON file to convert for export [parse.json]', 'parse.json')
  .option('-o, --out [name]', 'Output file name for converted JSON [out.json]', 'out.json')
  .option('-r, --results [name]', 'Name of Parse results field ["results"]', 'results')
  .option('-v, --verbose', 'Use verbose mode')
  .parse(process.argv)

console.log('Runnding parse-mongodb-export:')
if (pme.verbose) console.log('  - verbose')
console.log('  - %s JSON file', pme.file)

var file = './' + pme.file
jsonfile.readFile(file, function (err, obj) {
  if (err) { console.error(err); return 0 }
  if (pme.verbose) console.log(obj['results'])

  var ofile = pme.out
  var resultsName = pme.results
  var parseArray = obj[resultsName]
  if (parseArray === undefined) { console.error('No results object found. Use -r to specify.'); return 0 }
  var obj1 = parseArray[1]

  jsonfile.writeFile(ofile, obj1, function (err) {
    console.error(err)
  })
})

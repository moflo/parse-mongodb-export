/*
 * parse-mongodb-export
 *
 * Script to import JSON files created by Parse export and upload them to an existing Mongolab db
*/

var pme = require('commander');
var jsonfile = require('jsonfile')
var util = require('util')

pme
  .version('0.1.0')
  .option('-dir, --directory [name]', 'Directory of Parse JSON files [parse_json]', 'parse_json')
  .option('-b, --verbose', 'Use verbose mode')
  .parse(process.argv);



console.log('Runnding parse-mongodb-export:');
if (pme.verbose) console.log('  - verbose');
console.log('  - %s directory', pme.directory);

var file = '../_User.json'
jsonfile.readFile(file, function(err, obj) {
  console.log(err);
  console.log(obj[0]);
  console.log(obj[1]);

  var ofile = "../out.json";
  var obj1 = obj[1];

  jsonfile.writeFile(ofile, obj1, function (err) {
    console.error(err);

  })


})

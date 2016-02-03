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
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);



console.log('Runnding parse-mongodb-export:');
if (pme.peppers) console.log('  - peppers');
if (pme.pineapple) console.log('  - pineapple');
if (pme.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', pme.cheese);

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

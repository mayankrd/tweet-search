/**
 * Created by mayankrd on 9/27/17.
 * parser.js - program to parse the text file into a JSON file
 */
const fs = require('fs');

var result = []; // to store final converted data

fs.readFile('assignment_tweet (1).txt', 'utf8', function(err,data) {

    if(err) throw err;

    // splitting the whole data on the basis of new line
    var splitted = data.toString().split("\n");

    // the second line of the text having the dashes
    var baseLine = splitted[1];

    var baseSplit = baseLine.split(new RegExp("\\s"));

    var lens = []; // length of the three splits

    for(var i = 0; i < baseSplit.length-1; i++){
        lens.push(baseSplit[i].length);
    }

    // creating the keys of the target JSON objects
    var template = {};
    var headingRow = splitted[0];

    // generating the template JSON object
    for(var i = 0; i < baseSplit.length-1; i++){
        var key = headingRow.substr(0, lens[i]+1);
        key = key.trim();
        template[key] = "";
        headingRow = headingRow.substr(lens[i]+1);
    }

    // fetching the newly added keys
    var keys = [];
    for(var key in template)
        keys.push(key);

    // generating the objects using the template
    for (var i = 2; i < splitted.length; i++) {
       var obj = Object.assign({}, template);
       var line = splitted[i];

       // filling single template object
       for(var j = 0; j < lens.length; j++){
            var value = line.substr(0, lens[j]+1);
            value = value.trim();
            obj[keys[j]] = value;
            line = line.substr(lens[j]+1);
       }

       result.push(obj);

       // writing result into a file after converting into JSON string
       var json = JSON.stringify(result);
       fs.writeFile('data.json', json, 'utf8', function (err) {
           if(err)
               console.log(err);
           else{
               console.log('Data saved to file data.json');
           }

       });
    }
});





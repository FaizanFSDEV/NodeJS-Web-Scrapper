var cheerio = require('cheerio');
var request = require('request');
var fs      = require('fs');

var allJSONdata = [];

request(
  "https://chicago.craigslist.org/d/free-stuff/search/zip",
  function(error, response, html){
    
    if(!error && response.statusCode == 200){
      // console.log('loaded done faizan');
      
      var $ = cheerio.load(html);
      var allRecords = $('li.result-row');
      // console.log('all records ' + allRecords);

      allRecords.each(function(index,element){

        if(index < 10){
          var title = $(element).find('a.hdrlnk').text();
          var link  = $(element).find('a.hdrlnk').attr('href');
  
          var tempData = {
            titleOfObject: title,
            linkOfObject: link
          }
  
          allJSONdata.push(tempData)
        }else{
          saveData();
          return false;
        }
      });
    }
    
});

function saveData(){
  fs.writeFile('output.json', JSON.stringify(allJSONdata), function(err){
    console.log('success');
  });
}


var fs 					= require('fs'),
	path 					= require('path'),
	csv 					= require('csv'),
	dirPath 			= './../data/',
	file 					= 'coupon_area_test.csv',
	inFile 				= path.join(dirPath, file),
	inFile_Stream 	= fs.createReadStream(inFile).setEncoding('utf-8'),
	values 				= [], insert = [], data = '', 
	parse = true, imprt = true, filter = false,
	connection 		= require('mysql').createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'coupon_test'
	}),
	table				= 'area'
	;

if (parse) inFile_Stream.on('data', function(chunk) { data+=chunk; });

if (parse) 
{ 
	inFile_Stream.on('end', function() {
		csv.parse(data, {auto_parse: true, trim: true}, function(err, data){
			values.push(data);
			transform();
		});
	});
}

var transform = function() {
	var parsedData = 	values[0];
	parsedData.filter(function(item, iterator){/* skip headers */ if (iterator === 0) { return false; } else { return true; }
	}).map(function(item, iterator){
		var result 							= [],
			SMALL_AREA_NAME							= item[0],
			PREF_NAME										= item[1],
			COUPON_ID										= item[2]
			;
			
		result.push(
			SMALL_AREA_NAME, PREF_NAME, COUPON_ID
			);

		return insert.push(result);

	});

	console.log(insert);

	if (imprt) SQLinsert(insert);
};


var sql = 'insert into ' + table + '('+
	'SMALL_AREA_NAME, PREF_NAME, COUPON_ID' +
		') values ?';

var SQLinsert = function(record) {
	connection.query(sql, [record], function(err, rows, fields) {
	  if (err) { console.log(rows); throw err; }
	  console.log('Data has been inserted !');
	  connection.end();
	});
};

var fs 					= require('fs'),
	path 					= require('path'),
	csv 					= require('csv'),
	dirPath 			= './../data/',
	file 					= 'user_list.csv',
	inFile 				= path.join(dirPath, file),
	inFile_Stream 	= fs.createReadStream(inFile).setEncoding('utf-8'),
	values 				= [], insert = [], data = '', 
	parse = true, imprt = true, filter = false,
	connection 		= require('mysql').createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'coupon'
	}),
	table				= 'user_list'
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

var isna = function(WITHDRAW_DATE) {
	if (WITHDRAW_DATE === 'NA') {
		return null;
	} else {
		return	WITHDRAW_DATE;
	}
};

var transform = function() {
	var parsedData = 	values[0];
	parsedData.filter(function(item, iterator){/* skip headers */ if (iterator === 0) { return false; } else { return true; }
	}).map(function(item, iterator){
		var result 							= [],
			REG_DATE							= item[0],
			SEX_ID								= item[1],
			AGE										= item[2],
			WITHDRAW_DATE					= isna(item[3]),
			PREF_NAME							= item[4],
			USER_ID_hash 					= item[5]
			;
		result.push(USER_ID_hash, REG_DATE, SEX_ID, AGE, WITHDRAW_DATE, PREF_NAME);

		return insert.push(result);

	});

	// console.log(insert);

	if (imprt) SQLinsert(insert);
};


var sql = 'insert into ' + table + 
	'(USER_ID_hash, REG_DATE, SEX_ID, AGE, WITHDRAW_DATE, PREF_NAME) values ?';

var SQLinsert = function(record) {
	connection.query(sql, [record], function(err, rows, fields) {
	  if (err) { console.log(rows); throw err; }
	  console.log('Data has been inserted !');
	  connection.end();
	});
};

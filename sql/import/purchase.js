var fs 					= require('fs'),
	path 					= require('path'),
	csv 					= require('csv'),
	dirPath 			= './../data/',
	file 					= 'coupon_detail_train.csv',
	inFile 				= path.join(dirPath, file),
	inFile_Stream 	= fs.createReadStream(inFile).setEncoding('utf-8'),
	values 				= [], insert = [], data = '', 
	parse = true, imprt = false, filter = false,
	connection 		= require('mysql').createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'coupon'
	}),
	table				= 'purchase'
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
			ITEM_COUNT									= item[0],
			I_DATE											= item[1],
			SMALL_AREA_NAME							= item[2],
			PURCHASEID_HASH							= item[3],
			USER_ID_HASH								= item[4],
			COUPON_ID_hash							= item[5]
			;
			
		result.push(
			ITEM_COUNT, I_DATE, SMALL_AREA_NAME, PURCHASEID_HASH, USER_ID_HASH, COUPON_ID_hash
			);

		return insert.push(result);

	});

	console.log(insert);

	if (imprt) SQLinsert(insert);
};


var sql = 'insert into ' + table + 
	'(ITEM_COUNT, I_DATE, SMALL_AREA_NAME, PURCHASEID_HASH, USER_ID_HASH, COUPON_ID_hash' +
		') values ?';

var SQLinsert = function(record) {
	connection.query(sql, [record], function(err, rows, fields) {
	  if (err) { console.log(rows); throw err; }
	  console.log('Data has been inserted !');
	  connection.end();
	});
};

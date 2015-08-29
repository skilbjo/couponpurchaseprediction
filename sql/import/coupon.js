var fs 					= require('fs'),
	path 					= require('path'),
	csv 					= require('csv'),
	dirPath 			= './../data/',
	file 					= 'coupon_list_test.csv',
	inFile 				= path.join(dirPath, file),
	inFile_Stream 	= fs.createReadStream(inFile).setEncoding('utf-8'),
	values 				= [], insert = [], data = '', 
	parse = true, imprt = true, filter = false,
	connection 		= require('mysql').createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'coupon'
	}),
	table				= 'coupon_list'
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
			CAPSULE_TEXT									= item[0],
			GENRE_NAME										= item[1],
			PRICE_RATE										= item[2],
			CATALOG_PRICE									= item[3],
			DISCOUNT_PRICE								= item[4],
			DISPFROM											= item[5],
			DISPEND												= item[6],
			DISPPERIOD										= item[7],
			VALIDFROM											= item[8],
			VALIDEND											= item[9],
			VALIDPERIOD										= item[10],
			USABLE_DATE_MON								= item[11],
			USABLE_DATE_TUE								= item[12],
			USABLE_DATE_WED								= item[13],
			USABLE_DATE_THU								= item[14],
			USABLE_DATE_FRI								= item[15],
			USABLE_DATE_SAT								= item[16],
			USABLE_DATE_SUN								= item[17],
			USABLE_DATE_HOLIDAY						= item[18],
			USABLE_DATE_BEFORE_HOLIDAY		= item[19],
			large_area_name 							= item[20],
			ken_name											= item[21],
			small_area_name 							= item[22],
			COUPON_ID_hash 								= item[23]
			;
			
		result.push(CAPSULE_TEXT, GENRE_NAME, PRICE_RATE, CATALOG_PRICE, DISCOUNT_PRICE, DISPFROM, DISPEND, DISPPERIOD,
			VALIDFROM, VALIDEND, VALIDPERIOD, USABLE_DATE_MON, USABLE_DATE_TUE,  USABLE_DATE_WED, USABLE_DATE_THU, USABLE_DATE_FRI,
			USABLE_DATE_SAT, USABLE_DATE_SUN, USABLE_DATE_HOLIDAY, USABLE_DATE_BEFORE_HOLIDAY, large_area_name, ken_name,
			small_area_name, COUPON_ID_hash);

		return insert.push(result);

	});

	console.log(insert);

	if (imprt) SQLinsert(insert);
};


var sql = 'insert into ' + table + 
	'(CAPSULE_TEXT, GENRE_NAME, PRICE_RATE, CATALOG_PRICE, DISCOUNT_PRICE, DISPFROM, DISPEND, DISPPERIOD,' +
		'VALIDFROM, VALIDEND, VALIDPERIOD, USABLE_DATE_MON, USABLE_DATE_TUE,  USABLE_DATE_WED, USABLE_DATE_THU, USABLE_DATE_FRI,' +
			'USABLE_DATE_SAT, USABLE_DATE_SUN, USABLE_DATE_HOLIDAY, USABLE_DATE_BEFORE_HOLIDAY, large_area_name, ken_name,'+
			'small_area_name, COUPON_ID_hash'+
		') values ?';

var SQLinsert = function(record) {
	connection.query(sql, [record], function(err, rows, fields) {
	  if (err) { console.log(rows); throw err; }
	  console.log('Data has been inserted !');
	  connection.end();
	});
};

#!/bin/bash

# Database
db_name="coupon_test"
file_name="../db/coupon_test_db.sql"

mysqldump -u root -p $db_name > $file_name



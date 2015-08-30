#!/bin/bash

# Database
db_name="coupon_test"
file_name="coupon_test_schema.sql"

mysqldump -u root -p --no-data $db_name > $file_name



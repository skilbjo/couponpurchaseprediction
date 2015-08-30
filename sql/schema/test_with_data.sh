#!/bin/bash

# Database
db_name="coupon_test"
file_name="coupon_test.sql"

mysqldump -u root -p $db_name > $file_name



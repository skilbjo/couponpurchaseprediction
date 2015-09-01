#!/bin/bash

# Database
db_name="coupon_test"
file_name="../coupon_test_db.sql"

mysql -u root -p $db_name < $file_name
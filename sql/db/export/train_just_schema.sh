#!/bin/bash

# Database
db_name="coupon_train"
file_name="../schema/coupon_train_schema.sql"

mysqldump -u root -p --no-data $db_name > $file_name



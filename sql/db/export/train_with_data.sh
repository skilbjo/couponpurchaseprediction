#!/bin/bash

# Database
db_name="coupon_train"
file_name="../db/coupon_train_db.sql"

mysqldump -u root -p $db_name > $file_name



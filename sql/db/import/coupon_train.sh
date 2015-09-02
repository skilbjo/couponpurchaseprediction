#!/bin/bash

# Database
db_name="coupon_train"
file_name="../coupon_train_db.sql"

mysql -u root -p $db_name < $file_name
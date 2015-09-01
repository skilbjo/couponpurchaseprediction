#!/bin/bash

# Database
db_name="coupon_test"
file_name="coupon_test_db.sql"
backup_path="/Users/jskilbeck/Code/Node/couponpurchaseprediction/sql/db/db"
gnu_file=$file_name.gz

# Prod
user_name="pi"
server="skilbjo.duckdns.org"
pi_db_path="~/sql/coupon"
pass="root"

# GNU ZIP
gzip -cf $backup_path/$file_name > $backup_path/$gnu_file

# SSH transfer
cat $backup_path/$gnu_file | ssh $user_name@$server "cat > $pi_db_path/$gnu_file"

# GNU unZIP
ssh $user_name@$server "gzip -df $pi_db_path/$gnu_file"

# mySQL load
ssh $user_name@$server "mysql -u root -p$pass $db_name < $pi_db_path/$file_name"
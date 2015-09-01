#!/bin/bash

# Database
db_name="coupon_train"

mysqldump -u root -p --no-data $db_name > schema.sql



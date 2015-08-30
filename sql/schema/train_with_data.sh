#!/bin/bash

# Database
db_name="coupon_train"

mysqldump -u root -p $db_name > schema.sql



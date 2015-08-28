#!/bin/bash

# Database
db_name="coupon"

mysqldump -u root -p --no-data $db_name > schema.sql



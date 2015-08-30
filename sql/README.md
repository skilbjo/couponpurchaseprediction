## SQL Importer

### Info

csv files stored in `data/[file-name].csv`

javascript parser/import files stored in `import/[file-name].csv`

sql schema stored in `schema/schema.sql`

### Data Structure

#### Test data

Database is `coupon_test`

|   CSV File Name  | ER Diagram Reference |  Table Name |
|:----------------:|:--------------------:|:-----------:|
| Coupon_List_Test |           2          | coupon_info |
| Coupon_Area_Test |           5          |     area    |
|     User_List    |           1          |     user    |

#### Train data

Database is `coupon_train`

|    CSV File Name    | ER Diagram Reference |  Table Name |
|:-------------------:|:--------------------:|:-----------:|
|  Coupon_List_Train  |           2          | coupon_info |
|  Coupon_Area_Train  |           5          |     area    |
| Coupon_Detail_Train |           4          |     view    |
|  Coupon_Visit_Train |           3          |   purchase  |
|      User_List      |           1          |     user    |



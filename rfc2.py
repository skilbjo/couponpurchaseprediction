# Libraries
from sklearn.ensemble import RandomForestClassifier
from numpy as np
import pandas as pd
from time import time
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import FeatureUnion
from sklearn.linear_model.logistic import LogisticRegression

# Globals
file_dir = './sql/data/'
start = time()

# Import train data
users = pd.read_csv('{0}user_list.csv'.format(file_dir))
coupon_tr = pd.read_csv('{0}coupon_list_train.csv'.format(file_dir))
purchase_tr = pd.read_csv('{0}coupon_detail_train.csv'.format(file_dir))
view_tr = pd.read_csv('{0}coupon_visit_train.csv'.format(file_dir))

# Set up train dataset
train_df = pd.merge(view_tr, coupon_tr, left_on='VIEW_COUPON_ID_hash', right_on='COUPON_ID_hash')
train_df = pd.merge(train_df, purchase_tr, left_on='USER_ID_hash', right_on='USER_ID_hash')

# Categorical columns only; remove dates
desired_columns = ['COUPON_ID_hash', 'USER_ID_hash', 'GENRE_NAME', 'DISCOUNT_PRICE', 'PRICE_RATE',
	'USABLE_DATE_MON', 'USABLE_DATE_TUE', 'USABLE_DATE_WED', 'USABLE_DATE_THU',
	'USABLE_DATE_FRI', 'USABLE_DATE_SAT', 'USABLE_DATE_SUN', 'USABLE_DATE_HOLIDAY',
	'USABLE_DATE_BEFORE_HOLIDAY', 'large_area_name', 'ken_name', 'small_area_name'
]

categorical_columns = ['GENRE_NAME', 'USABLE_DATE_MON', 'USABLE_DATE_TUE', 'USABLE_DATE_WED',
	'USABLE_DATE_THU', 'USABLE_DATE_FRI', 'USABLE_DATE_SAT', 'USABLE_DATE_SUN',
	'USABLE_DATE_HOLIDAY', 'USABLE_DATE_BEFORE_HOLIDAY', 'large_area_name', 'ken_name', 'small_area_name'
]

factor_columns = ['PAGE_SERIAL','DISCOUNT_PRICE',
	'USABLE_DATE_MON', 'USABLE_DATE_TUE', 'USABLE_DATE_WED',
	'USABLE_DATE_THU', 'USABLE_DATE_FRI', 'USABLE_DATE_SAT', 
	'USABLE_DATE_SUN', 'USABLE_DATE_HOLIDAY', 'USABLE_DATE_BEFORE_HOLIDAY'
]

class Get_Price_Rate(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, date_frame, y=None):
        return self

    def transform(self, date_frame):
        return date_frame["PRICE_RATE"].as_matrix()[None].T.astype(np.float)


class Get_Match_Pref(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, date_frame, y=None):
        return self

    def transform(self, date_frame):
        res_sr = date_frame["PREF_NAME"] == date_frame["ken_name"]
        return res_sr.as_matrix()[None].T.astype(np.float)

def results(df, n=10, column='predict', merge_column='COUPON_ID_hash'):
    return ' '.join(df.sort_index(by=column)[-n:][merge_column])

feature_list = [
    ('PRICE_RATE', Get_Price_Rate()),
    ('MATCH_PREF', Get_Match_Pref()),
]

# Set up columns for random forest, train
feat_union = FeatureUnion(transformer_list=feature_list)
x_tr = feat_union.fit_transform(train_df)
y = train_df['PURCHASE_FLG']

# Train model
model = RandomForestClassifier(n_jobs=2)
model.fit(x_tr,y)

# Import test data
coupon_ts = pd.read_csv('{0}coupon_list_test.csv'.format(file_dir))
view_ts = pd.read_csv('{0}coupon_visit_test.csv'.format(file_dir))
test_df = pd.merge(pd.merge(view_ts, coupon_ts, left_on='VIEW_COUPON_ID_hash', right_on='COUPON_ID_hash'), users, left_on='USER_ID_hash', right_on='USER_ID_hash')

# Columns for random forest, test
x_ts = feat_union.transform(test_df)

# Use model on test dataset
prediction = model.predict_propa(x_ts)
pos_idx = np.where(model.classes_ == True)[0][0]
test_df['prediction'] = prediction[:, pos_idx]

# Export submission
submission = test_df.groupby('USER_ID_hash').apply(results)
submission.to_csv('submission.csv', header=True)

# Done
print('Finished. Script ran in {0} seconds'.format(time() - start))





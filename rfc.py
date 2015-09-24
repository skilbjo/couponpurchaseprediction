# Libraries
from sklearn.ensemble import RandomForestClassifier
import numpy as np
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
train_df = pd.merge(pd.merge(view_tr, coupon_tr, left_on='VIEW_COUPON_ID_hash', right_on='COUPON_ID_hash'), purchase_tr, left_on='USER_ID_hash', right_on='USER_ID_hash')
train_df = pd.merge(train_df, users, how='inner')

class Price_Rate(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, df, y=None):
        return self

    def transform(self, df):
        return df['PRICE_RATE'].as_matrix()[None].T.astype(np.float)

class Disc_Price(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, df, y=None):
        return self

    def transform(self, df):
        return df['DISCOUNT_PRICE'].as_matrix()[None].T.astype(np.float)

class Location(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, df, y=None):
        return self

    def transform(self, df):
        match = df['PREF_NAME'] == df['ken_name']
        return match.as_matrix()[None].T.astype(np.float)

class Usable_Saturday(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, df, y=None):
        return self

    def transform(self, df):
        df.dropna()
        return df['USABLE_DATE_SAT'].as_matrix()[None].T.astype(np.float)

class Usable_Holiday(BaseEstimator, TransformerMixin):
    def get_feature_names(self):
        return [self.__class__.__name__]

    def fit(self, df, y=None):
        return self

    def transform(self, df):
        df.dropna()
        return df['USABLE_DATE_HOLIDAY'].as_matrix()[None].T.astype(np.float)

def results(df, n=10, column='prediction', merge_column='COUPON_ID_hash'):
    return ' '.join(df.sort_index(by=column)[-n:][merge_column])

feature_list = [
    ('PRICE_RATE', Price_Rate()),
    ('DISCOUNT_PRICE', Disc_Price()),
    ('LOCATION', Location()),
    ('SATURDAY', Usable_Saturday()),
    ('HOLIDAY', Usable_Holiday())
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
coupon_ts['cross'] = 1
users['cross'] = 1
test_df = pd.merge(coupon_ts, users, on='cross')
print('done')

# Columns for random forest, test
x_ts = feat_union.transform(test_df)

# Use model on test dataset
prediction = model.predict_proba(x_ts)
pos_idx = np.where(model.classes_ == True)[0][0]
test_df['prediction'] = prediction[:, pos_idx]

# Export submission
submission = test_df.groupby('USER_ID_hash').apply(results)
submission.to_csv('submission2.csv', header=True)

# Done
print('Finished. Script ran in {0} seconds'.format(time() - start))






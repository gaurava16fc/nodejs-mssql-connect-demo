// USING JAVASCRIPT CALLBACKS...

const { mssql, dbConfig } = require('../common/db-configuration');

// Get Complete Data of a Table 9Simple Select Query without any where clause...)
const getProductReviewsDataCallback = () => {
    mssql.connect(dbConfig, err => {
        if (err) {
            console.log(err);
            mssql.close();
            throw err;
        }
        else {
            new mssql.Request()
                        .query("SELECT * FROM [dbo].[product_reviews];", (err, dbResult) => {
                            if (err) {
                                console.log(err);
                                mssql.close();
                                throw err;
                            } else {
                                console.log(dbResult.recordsets);
                                mssql.close();
                            }
                        });
        }
    });
}

// Get Filtered Data of a Table (i.e Select Query with Where Clause)
const getProductReviewsDataCallbackWithCondition = (_id) => {
    let reviewID = parseInt(_id);
    if (isNaN(reviewID)) {
        reviewID = null;
    }
    mssql.connect(dbConfig, err => {
        if (err) {
            console.log(err);
            mssql.close();
            throw err;
        }
        else {
            new mssql.Request()
                        .input('review_id', mssql.Int, reviewID)
                            .query("SELECT * FROM [dbo].[product_reviews] WHERE id = @review_id;", (err, dbResult) => {
                                if (err) {
                                    console.log(err);
                                    mssql.close();
                                    throw err;
                                } else {
                                    console.log(dbResult.recordset);
                                    mssql.close();
                                }
                            });
        }
    });
}


// Get SQL Table Data via Stored Procedure with an input param which is optional by default (i.e. NULL to retrive complete data if not passed).
const getProductReviewsDataCallbackViaSPROC = (_id) => {
    let reviewID = parseInt(_id);
    if (isNaN(reviewID)) {
        reviewID = null;
    }
    mssql.connect(dbConfig, err => {
        if (err) {
            console.log(err);
            mssql.close();
            throw err;
        }
        else {
            new mssql.Request()
                        .input('ID', mssql.Int, reviewID)
                            .execute("[dbo].[GetProductReviews]", (err, dbResult) => {
                                if (err) {
                                    console.log(err);
                                    mssql.close();
                                    throw err;
                                } else {
                                    console.log(dbResult.recordset);
                                    mssql.close();
                                }
                            });
        }
    });
}

module.exports = {
    getProductReviewsDataCallback,
    getProductReviewsDataCallbackWithCondition,
    getProductReviewsDataCallbackViaSPROC
}
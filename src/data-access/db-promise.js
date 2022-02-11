// USING JAVASCRIPT PROMISE...

const { mssql, dbConfig } = require('../common/db-configuration');

// Get Complete Data of a Table 9Simple Select Query without any where clause...)
const getProductReviewsDataPromise = () => {
    mssql.connect(dbConfig)
        .then((pool) => {
            return pool
                    .request()
                        .query("SELECT * FROM [dbo].[product_reviews];")
                            .then((dbResult) => {
                                console.log(dbResult.recordsets);
                                mssql.close();
                            })
        })
        .catch(error => {
            console.log(error);
            mssql.close();
            throw error;
        });
    }

// Get Filtered Data of a Table (i.e Select Query with Where Clause)
const getProductReviewsDataPromiseWithCondition = (_id) => {
    let reviewID = parseInt(_id);
    if (isNaN(reviewID)) {
        reviewID = null;
    }
    mssql.connect(dbConfig)
        .then((pool) => {
            return pool
                .request()
                    .input('review_id', mssql.Int, reviewID)
                        .query("SELECT * FROM [dbo].[product_reviews] WHERE id = @review_id;")
                            .then((dbResult) => {
                                console.log(dbResult.recordset);
                                mssql.close();
                            })
        })
        .catch(error => {
            console.log(error);
            mssql.close();
            throw error;
        });
}


// Get SQL Table Data via Stored Procedure with an input param which is optional by default (i.e. NULL to retrive complete data if not passed).
const getProductReviewsDataPromiseViaSPROC = (_id) => {
    let reviewID = parseInt(_id);
    if (isNaN(reviewID)) {
        reviewID = null;
    }
    mssql.connect(dbConfig)
    .then((pool) => {
        return pool
            .request()
                .input('ID', mssql.Int, reviewID)
                    .execute("[dbo].[GetProductReviews]")
                        .then((dbResult) => {
                            console.log(dbResult.recordset);
                            mssql.close();
                        })
    })
    .catch(error => {
        console.log(error);
        mssql.close();
        throw error;
    });
}

module.exports = {
    getProductReviewsDataPromise,
    getProductReviewsDataPromiseWithCondition,
    getProductReviewsDataPromiseViaSPROC
}
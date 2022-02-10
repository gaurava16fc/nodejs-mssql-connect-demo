
const { mssql, dbConfig } = require('../common/db-configuration');

// Get Complete Data of a Table 9Simple Select Query without any where clause...)
const getProductReviewsDataAsyncFunction = async () => {
    try {
        let pool = await mssql.connect(dbConfig);
        let dbResult = await pool.request().query("SELECT * FROM [dbo].[product_reviews];");
        console.log(dbResult.recordsets);
        mssql.close();
    } catch (error) {
        console.log(error);
        mssql.close();
        throw error;
    }
}

// Get Filtered Data of a Table (i.e Select Query with Where Clause)
const getProductReviewsDataAsyncWithCondition = async (_id) => {
    let reviewID = parseInt(_id);
    if (isNaN(reviewID)) {
        reviewID = null;
    }
    try {
        let pool = await mssql.connect(dbConfig);
        let dbResult = await pool
            .request()
            .input('review_id', mssql.Int, reviewID)
            .query("SELECT * FROM [dbo].[product_reviews] WHERE id = @review_id;");
        console.log(dbResult.recordset);
        mssql.close();
    } catch (error) {
        console.log(error.message);
        mssql.close();
        throw error;
    }
}


// Get SQL Table Data via Stored Procedure with an input param which is optional by default (i.e. NULL to retrive complete data if not passed).
// Hence we will create two different params to test this 1), With input Param and 2) without passign that params
const getProductReviewsDataAsyncWithStoredProcWithParam = async (_id) => {
    let reviewID = parseInt(_id);
    if (isNaN(reviewID)) {
        reviewID = null;
    }
    try {
        let pool = await mssql.connect(dbConfig);
        let dbResult = await pool
            .request()
            .input('ID', mssql.Int, reviewID)
            .execute("[dbo].[GetProductReviews]");
        console.log(dbResult.recordset);
        mssql.close();
    } catch (error) {
        console.log(error.message);
        mssql.close();
        throw error;
    }
}

module.exports = {
    getProductReviewsDataAsyncFunction,
    getProductReviewsDataAsyncWithCondition,
    getProductReviewsDataAsyncWithStoredProcWithParam
}
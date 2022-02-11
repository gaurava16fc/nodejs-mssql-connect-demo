const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { mssql, dbConfig } = require('./common/db-configuration');

const { getProductReviewsDataPromise, getProductReviewsDataPromiseWithCondition, getProductReviewsDataPromiseViaSPROC } 
    = require('./data-access/db-promise');

const app = express();
const PORT_NUMBER = parseInt(process.env.APP_SERVER_PORT) || 3000;
app.use(express.json());

app.get('/api/review/:id', (req, res) => {
    let reviewID = parseInt(req.params.id);
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
                            res.status(200).json({
                                result: dbResult.recordset
                            }) 
                            mssql.close();
                        })
    })
    .catch(error => {
        console.log(error);
        mssql.close();
        throw error;
    });    
});

app.listen(PORT_NUMBER, () => {
    console.log("Server is up and running at http://localhost:" + PORT_NUMBER);
});

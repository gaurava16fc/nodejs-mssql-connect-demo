
const { getProductReviewsDataAsyncFunction,
    getProductReviewsDataAsyncWithCondition,
    getProductReviewsDataAsyncWithStoredProcWithParam 
} = require('./db-async-await');

// INLINE DML QUERY METHOD...
getProductReviewsDataAsyncFunction();

// INLINE QUERY (DML) WITH WHERE CALSUE METHOD...
getProductReviewsDataAsyncWithCondition(2);

// SP CALL WITHOUT PARAMS - retrieve all data rows in a table
getProductReviewsDataAsyncWithStoredProcWithParam(null); 

// SP CALL WITH PARAMS - retrieve the data where id = 4
getProductReviewsDataAsyncWithStoredProcWithParam(4); 


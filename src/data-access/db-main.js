
const { getProductReviewsDataAsync,
    getProductReviewsDataAsyncWithCondition,
    getProductReviewsDataAsyncViaSPROC 
} = require('./db-async-await');

const { getProductReviewsDataCallback,
    getProductReviewsDataCallbackWithCondition,
    getProductReviewsDataCallbackViaSPROC } = require('./db-callbacks');

const { getProductReviewsDataPromise,
    getProductReviewsDataPromiseWithCondition,
    getProductReviewsDataPromiseViaSPROC 
} = require('./db-promise');

// *************** ASYNC / AWAIT (STARTS HERE) *************************

/*
// INLINE DML QUERY METHOD...
getProductReviewsDataAsync();

// INLINE QUERY (DML) WITH WHERE CALSUE METHOD...
getProductReviewsDataAsyncWithCondition(2);

// SP CALL WITHOUT PARAMS - retrieve all data rows in a table
getProductReviewsDataAsyncViaSPROC(null); 

// SP CALL WITH PARAMS - retrieve the data where id = 4
getProductReviewsDataAsyncViaSPROC(4); 

*/
// *************** ASYNC / AWAIT (ENDS HERE) *************************




// *************** PROMISE (STARTS HERE) *************************

/*

// INLINE DML QUERY METHOD...
getProductReviewsDataPromise();

// INLINE QUERY (DML) WITH WHERE CALSUE METHOD...
getProductReviewsDataPromiseWithCondition(2);

// SP CALL WITHOUT PARAMS - retrieve all data rows in a table
getProductReviewsDataPromiseViaSPROC(null); 

// SP CALL WITH PARAMS - retrieve the data where id = 4
getProductReviewsDataPromiseViaSPROC(4); 

*/

// *************** PROMISE (ENDS HERE) *************************



// *************** CALLBACK (STARTS HERE) *************************

// INLINE DML QUERY METHOD...
getProductReviewsDataCallback();

// INLINE QUERY (DML) WITH WHERE CALSUE METHOD...
getProductReviewsDataCallbackWithCondition(6);

// SP CALL WITHOUT PARAMS - retrieve all data rows in a table
getProductReviewsDataCallbackViaSPROC(null); 

// SP CALL WITH PARAMS - retrieve the data where id = 5
getProductReviewsDataCallbackViaSPROC(5); 


// *************** CALLBACK (ENDS HERE) *************************
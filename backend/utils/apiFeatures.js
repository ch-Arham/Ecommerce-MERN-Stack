class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this; // Return this to allow chaining
    }

    filter() {
        const queryCopy = {...this.queryString};
        // Removing the fields that are not needed for category
        const excludedFields = ['keyword', 'page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryCopy[el]);

        // Filter for price and rating (for now it only takes exact values e.g. price: 100 instead of price: {$gte: 100} i.e a range)

        let queryStr = JSON.stringify(queryCopy); // Convert the query object to a string
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // Replace gte, gt, lte, lt with $gte, $gt, $lte, $lt as mongoose does not support it

        this.query = this.query.find(JSON.parse(queryStr)); // convert the string back to an object
        return this;
    }
}

module.exports = ApiFeatures;
module.exports = ProductsService;

var elasticsearch = require('elasticsearch');
var connectionString = "https://paas:bf99f452fd1c3889ec0a21fca8852b2c@dori-us-east-1.searchly.com";//process.env.SEARCHBOX_SSL_URL;

function ProductsService() {
    var self = this;
    self.getProducts = getProducts;
    self.getCategories = getCategories;
    self.index = index;

    var client = new elasticsearch.Client({
        host: connectionString
    });

    function getCategories() {
        return client.search({
            index: 'products',
            body: {
                aggs: {
                    categories: {
                        terms: {
                            field: "category",
                            order: {"_count": "desc"}
                        },
                        aggs: {
                            subcategories: {
                                terms: {
                                    field: "sub_category",
                                    order: {"_count": "desc"}
                                }
                            }
                        }
                    }
                }
            }
        }).then(function (results) {
            return results.aggregations.categories.buckets.map(function (category) {
                category.subcategories = category.subcategories.buckets;
                return category;
            })
        });
    }

    function getProducts(query, filters) {
        var body = {};
        body["bool"] = {must: []};
        if (query) {
            body["bool"]["must"].push({
                query: {
                    query_string: {
                        query: query
                    }
                }
            });
        }

        for (var filter in filters) {
            var match = {};
            match[filter] = filters;
            body["bool"]["must"].push({match: match});
        }

        if (body["bool"]["must"].length === 0) {
            body = {};
        }

        return client.search({
            index: 'products',
            body: body
        }).then(function (results) {
            return results.hits.hits.map(function (result) {
                return result._source;
            });
        });
    }

    function index(product) {
        return client.index({
            index: 'products',
            type: 'ds011248_mongolab_com_f2a7',
            body: product
        }).then(function (response) {
            response.item = product;
            return response;
        });
    }
}
module.exports = ProductsService;

var elasticsearch = require('elasticsearch');
var connectionString = "https://paas:bf99f452fd1c3889ec0a21fca8852b2c@dori-us-east-1.searchly.com";//process.env.SEARCHBOX_SSL_URL;

function ProductsService() {
    var self = this;
    self.index = index;
    self.getProduct = getProduct;
    self.getProducts = getProducts;
    self.getCategories = getCategories;
    self.deleteProduct = deleteProduct;

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
            var should = [];
            filters[filter].forEach(function(value){
                var match = {};
                match[filter] = value;
                should.push({query: {match: match}});
            });
            body["bool"]["must"].push({query:{bool: {should: should}}});
        }

        if (body["bool"]["must"].length === 0) {
            body = {};
        } else {
            body = {query:body};
        }



        return client.search({
            index: 'products',
            body: body
        }).then(function (results) {
            var hits = {};
            hits.count = results.hits.total;
            hits.products = results.hits.hits.map(function (result) {
                result._source._id = result._id;
                result._source._score = result._score;
                return result._source;
            });
            return hits;
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

    function deleteProduct(id) {
        return client.delete({
            index: "products",
            type: 'ds011248_mongolab_com_f2a7',
            id: id
        }).then(function (response) {
            return response;
        });
    }

    function getProduct(id) {
        return client.get({
            index: "products",
            type: 'ds011248_mongolab_com_f2a7',
            id: id
        }).then(function (response) {
            response._source._id = response._id;
            return response._source;
        });
    }
}
module.exports = ProductsService;

var elasticsearch = require('elasticsearch');
var connectionString = "https://paas:bf99f452fd1c3889ec0a21fca8852b2c@dori-us-east-1.searchly.com";//process.env.SEARCHBOX_SSL_URL;

function ProductsService() {
    var self = this;
    self.index = index;
    self.getProduct = getProduct;
    self.getProducts = getProducts;
    self.updateProduct = updateProduct;
    self.deleteProduct = deleteProduct;
    self.getSoldProducts = getSoldProducts;

    var client = new elasticsearch.Client({
        host: connectionString
    });
    
    var productsIndex = "products";
    var type = "ds011248_mongolab_com_f2a7";

    function getFacets() {
        return {
            aggs: {
                category: {
                    terms: {
                        field: "category",
                        order: {"_count": "desc"},
                        size: 100
                    },
                    aggs: {
                        sub_category: {
                            terms: {
                                field: "sub_category",
                                order: {"_count": "desc"},
                                size: 100
                            }
                        }
                    }
                },
                sub_category : {
                    terms: {
                        field: "sub_category",
                        order: {
                            _count: "desc"
                        },
                        size: 100
                    }
                },
                condition : {
                    terms: {
                        field: "condition",
                        order: {
                            _count: "desc"
                        },
                        size: 100
                    }
                },
                "organization.name" : {
                    terms: {
                        field: "organization.name",
                        order: {
                            _count: "desc"
                        },
                        size: 100
                    }
                },
                size : {
                    terms: {
                        field: "size",
                        order: {
                            _count: "desc"
                        },
                        size: 100
                    }
                },
                location : {
                    terms: {
                        field: "location",
                        order: {
                            _count: "desc"
                        },
                        size: 100
                    }
                },
                color : {
                    terms: {
                        field: "color",
                        order: {
                            _count: "desc"
                        },
                        size: 100
                    }
                },
                price : {
                    range : {
                        field : "price",
                        ranges : [
                            { to : 25 },
                            { from : 25, to : 50 },
                            { from : 50, to : 75 },
                            { from : 75, to : 100 },
                            { from : 100, to : 125 },
                            { from : 125, to : 150 },
                            { from : 150, to : 175 },
                            { from : 175, to : 200 },
                            { from : 200, to : 225 },
                            { from : 225, to : 250 },
                            { from : 250 }
                        ]
                    }
                },
                percent : {
                    range : {
                        field : "percent",
                        ranges : [
                            { to : 10 },
                            { from : 10, to : 20 },
                            { from : 20, to : 30 },
                            { from : 30, to : 40 },
                            { from : 50, to : 60 },
                            { from : 60, to : 70 },
                            { from : 70, to : 80 },
                            { from : 80, to : 90 },
                            { from : 90 }
                        ]
                    }
                }
            }
        }
    }

    function getRangeQuery(field, value) {
        var range = {};
        var numRange = value.split('-');
        range[field] = {
            gte: numRange[0],
            lte: numRange[1]
        };
        return {
            range: range
        };
    }

    function getMatchQuery(field, value) {
        var match = {};
        match[field] = value;
        return {
            query: {
                match: match
            }
        };
    }

    function formatFacets(aggregations){
        var facets = {};
        for(var facet in aggregations) {
            facets[facet] = aggregations[facet].buckets;
            if(facet === 'price' || facet === 'percent') {
                facets[facet].map(function(value){
                    value.key = value.key.replace('.0', '').replace('.0', '').replace('*','0');
                    return value;
                });
            } else if(facet === 'category') {
                facets[facet].map(function(category){
                    category.sub_category = category.sub_category.buckets;
                    return category;
                });
            }
        }
        return facets;
    }

    function getProducts(query, filters) {
        return getCustomProducts(false, query, filters);
    }

    function getSoldProducts(query, filters) {
        return getCustomProducts(true, query, filters);
    }
    
    function getCustomProducts(sold, query, filters) {
        var body = {
            bool: {
                must: [{
                    match: {
                        sold: sold
                    }
                }]
            }
        };
        if (query) {
            body.bool.must.push({
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
                if(filter === "price" || filter === "percent") {
                    should.push(getRangeQuery(filter, value));
                } else {
                    should.push(getMatchQuery(filter, value));
                }
            });
            body.bool.must.push({query:{bool: {should: should}}});
        }

        if (body.bool.must.length === 0) {
            body = {};
        } else {
            body = {query:body, size:150};
        }

        body.aggs = getFacets().aggs;

        return client.search({
            index: productsIndex,
            body: body
        }).then(function (results) {
            var hits = {};
            hits.count = results.hits.total;
            hits.products = results.hits.hits.map(function (result) {
                result._source._id = result._id;
                result._source._score = result._score;
                return result._source;
            });
            hits.facets = formatFacets(results.aggregations);
            return hits;
        });
    }

    function index(product) {
        product.sold = false;
        return client.index({
            index: productsIndex,
            type: type,
            body: product
        }).then(function (response) {
            response.item = product;
            return response;
        });
    }

    function deleteProduct(id) {
        return client.delete({
            index: productsIndex,
            type: type,
            id: id
        }).then(function (response) {
            return response;
        });
    }

    function getProduct(id) {
        return client.get({
            index: productsIndex,
            type: type,
            id: id
        }).then(function (response) {
            response._source._id = response._id;
            return response._source;
        });
    }

    function updateProduct(id, partial) {
        return client.update({
            index: productsIndex,
            type: type,
            id: id,
            body: {
                doc: partial
            }
        }).then(function (error, response){
            if(error) return error;
            return response;
        });
    }
}
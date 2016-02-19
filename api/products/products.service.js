module.exports = ProductsService;

var elasticsearch = require('elasticsearch');
var connectionString = "https://paas:bf99f452fd1c3889ec0a21fca8852b2c@dori-us-east-1.searchly.com";//process.env.SEARCHBOX_SSL_URL;

function ProductsService() {
    var self = this;
    self.getAllProducts = getAllProducts;

    var client = new elasticsearch.Client({
        host: connectionString
    });

    function getAllProducts() {
        return client.search({
            index: 'products',
            body: {}
        }).then(function (results) {
            return results.hits.hits.map(function(result){
                return result._source;
            });
        });
    }
}
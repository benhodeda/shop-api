# shop-api

## search for available products
GET /api/products/search
parameters (optionals):
* q - query string
* any field of product document - values to filter (iuse "," to split between different values)
body: none

## search for sold products
GET /api/products/sold
parameters (optionals):
* q - query string
* any field of product document - values to filter (iuse "," to split between different values)
body: none

## get single product
GET /api/products/:id
parameters (required) :
* id - the id of the product
body: none

example of the response: (response format same as getting all products)
```javascript
{
    "category": "Women's Clothing",
    "sub_category": "Dresses",
    "price": 39.07,
    "condition": "New",
    "description": "Women's Sleeveless pink Lace Dress Sexy Coctail Party Classic Size - M",
    "_id": "56c6fe3fe4b0396d8a4ddc41"
}
```

## create new product
POST /api/products
body: JSON of the new product to index
for example:
```javascript
 {
     "category": "Men's Clothing",
     "sub_category": "T-Shirts",
     "price": 151.63,
     "condition": "New",
     "description": "Hugo Boss Men's 100% Cotton Classic V Neck T Shirt 3 Per Pack SIZES S,M,L,XL,XXL"
 }
```
the example's response:
```javascript
 {
     "_index": "products",
     "_type": "ds011248_mongolab_com_f2a7",
     "_id": "AVL6JITbN-RaXdjIOsOJ",
     "_version": 1,
     "_shards": {
         "total": 2,
         "successful": 2,
         "failed": 0
     },
     "created": true,
     "item": {
         "category": "Men's Clothing",
         "sub_category": "T-Shirts",
         "price": 151.63,
         "condition": "New",
         "description": "Hugo Boss Men's 100% Cotton Classic V Neck T Shirt 3 Per Pack SIZES S,M,L,XL,XXL"
     }
 }
```

## upload image as a new product
POST /api/products/upload
body: JSON of the new product to index
for example:
```javascript
 {
     "category": "Men's Clothing",
     "sub_category": "T-Shirts",
     "price": 151.63,
     "condition": "New",
     "description": "Hugo Boss Men's 100% Cotton Classic V Neck T Shirt 3 Per Pack SIZES S,M,L,XL,XXL"
 }
```
the example's response:
```javascript
 {
     "_index": "products",
     "_type": "ds011248_mongolab_com_f2a7",
     "_id": "AVL6JITbN-RaXdjIOsOJ",
     "_version": 1,
     "_shards": {
         "total": 2,
         "successful": 2,
         "failed": 0
     },
     "created": true,
     "item": {
         "category": "Men's Clothing",
         "sub_category": "T-Shirts",
         "price": 151.63,
         "condition": "New",
         "description": "Hugo Boss Men's 100% Cotton Classic V Neck T Shirt 3 Per Pack SIZES S,M,L,XL,XXL"
     }
 }
```

## mark products as sold
POST /api/products/sold/:id
body: none

example of the response:
```javascript
 {
    "count": 5,
    "products" : [
         {
             "category": "Women's Clothing",
             "sub_category": "Dresses",
             "price": 39.07,
             "condition": "New",
             "description": "Women's Sleeveless pink Lace Dress Sexy Coctail Party Classic Size - M",
            "_id": "56c6fe3fe4b0396d8a4ddc41",
            "_score": 1
         },
         {
             "category": "Shoes",
             "sub_category": "Men's Shoes",
             "price": 117.3,
             "condition": "Pre-owned",
             "description": "Nike Air White/Navy blue/Gray Shoes Size 12 386114-141",
             "_id": "56c6fee5e4b0396d8a4ddc46",
             "_score": 1
         },
         {
             "category": "Women's Clothing",
             "sub_category": "Dresses",
             "price": 195.56,
             "condition": "New",
             "description": "Asos Vila Cable black Sleeve Dress size M- exclusive!!",
             "_id": "AVL6F1cFN-RaXdjIOsM8",
             "_score": 1
         },
         {
             "category": "Shoes",
             "sub_category": "Girl's Shoes",
             "price": 66.45,
             "condition": "New",
             "description": "NIB kids girl Pink black Minnie Polka Dots Bow Party dress elegant velcro shoes",
             "_id": "AVL6G3PdN-RaXdjIOsNV",
             "_score": 1
         },
         {
             "category": "Men's Clothing",
             "sub_category": "T-Shirts",
             "price": 151.63,
             "condition": "New",
             "description": "Hugo Boss Men's 100% Cotton Classic V Neck T Shirt 3 Per Pack SIZES S,M,L,XL,XXL",
             "_id": "AVL6JITbN-RaXdjIOsOJ",
             "_score": 1
         }
    ]
```

## get all categories and sub-categories
GET /api/products/categories
body: none

example of the response:
```javascript
 [
 	{
 		"key": "Women's Clothing",
 		"doc_count": 2,
 		"subcategories": [
 			{
 				"key": "Dresses",
 				"doc_count": 2
 			}
 		]
 	}, 
 	{
 		"key": "Shoes",
 		"doc_count": 2,
 		"subcategories": [
 			{
 				"key": "Men's Shoes",
 				"doc_count": 1
 			},
 			{
 				"key": "Girl's Shoes",
 				"doc_count": 1
 			}
 		]
 	}, 
 	{
 		"key": "Men's Clothing",
 		"doc_count": 1,
 		"subcategories": [
 			{
 				"key": "T-Shirts",
 				"doc_count": 1
 			}
 		]
 	}
 ]
```

## get all categories and sub-categories
GET /api/products/search
parameters (optionals):
* q - query string
* any field of product document - values to filter (iuse "," to split between different values)
body: none

example of the response: (response format same as getting all products)

## delete product
DELETE /api/products/:id
parameters (required) :
* id - the id of the product
body: none

example of the response: (response format same as getting all products)
```javascript
{
    "found": true,
    "_index": "products",
    "_type": "ds011248_mongolab_com_f2a7",
    "_id": "AVL6T6g8N-RaXdjIOsRJ",
    "_version": 2,
    "_shards": {
        "total": 2,
        "successful": 2,
        "failed": 0
    }
}
```

## get single product
GET /api/products/:id
parameters (required) :
* id - the id of the product
body: none

example of the response: (response format same as getting all products)
```javascript
{
    "category": "Women's Clothing",
    "sub_category": "Dresses",
    "price": 39.07,
    "condition": "New",
    "description": "Women's Sleeveless pink Lace Dress Sexy Coctail Party Classic Size - M",
    "_id": "56c6fe3fe4b0396d8a4ddc41"
}
```
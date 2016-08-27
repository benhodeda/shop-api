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
  "image": "422ea1a0-6c4e-11e6-9b97-7fd417317e6f.jpg",
  "seller": {
    "settings": {
      "defaultOrg": {
        "name": "מאבק לחיים",
        "email": "maavak@lachaim.com"
      },
      "defaultPercents": 25
    },
    "rating": {
      "total": 0,
      "rate": 0,
      "count": 0
    },
    "name": "Ben Hodeda",
    "id": "1215056541841072",
    "email": "benhodeda@gmail.com",
    "picture": {
      "data": {
        "is_silhouette": false,
        "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220…a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
      }
    }
  },
  "condition": "כמעט חדש",
  "sub_category": "נעלי עקב",
  "price": 140,
  "organization": {
    "name": "מאבק לחיים",
    "email": "maavak@lachaim.com"
  },
  "description": "נעלי עקב בהדפס זברה. הולך מעולה עם מנומר! סולידי.",
  "category": "בגדי נשים",
  "percent": 25,
  "size": "XL",
  "color": "שחור",
  "sold": false,
  "_id": "AVbMZvZtqYz0-3YAIMc2"
}
```

## create new product
POST /api/products
body: JSON of the new product to index
for example:
```javascript
{
  "seller": {
    "settings": {
      "defaultOrg": {
        "name": "מאבק לחיים",
        "email": "maavak@lachaim.com"
      },
      "defaultPercents": 25
    },
    "rating": {
      "total": 0,
      "rate": 0,
      "count": 0
    },
    "name": "Ben Hodeda",
    "id": "1215056541841072",
    "email": "benhodeda@gmail.com",
    "picture": {
      "data": {
        "is_silhouette": false,
        "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220…a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
      }
    }
  },
  "condition": "כמעט חדש",
  "sub_category": "נעלי עקב",
  "price": 140,
  "organization": {
    "name": "מאבק לחיים",
    "email": "maavak@lachaim.com"
  },
  "description": "נעלי עקב בהדפס זברה. הולך מעולה עם מנומר! סולידי.",
  "category": "בגדי נשים",
  "percent": 25,
  "size": "XL",
  "color": "שחור"
}
```
the example's response:
```javascript
{
    "_index": "products",
    "_type": "ds011248_mongolab_com_f2a7",
    "_id": "AVbMqB-2qYz0-3YAINS9",
    "_version": 1,
    "_shards": {
        "total": 2,
        "successful": 2,
        "failed": 0
    },
    "created": true,
    "item": {
        "image": "422ea1a0-6c4e-11e6-9b97-7fd417317e6f.jpg",
        "seller": {
            "settings": {
                "defaultOrg": {
                    "name": "מאבק לחיים",
                    "email": "maavak@lachaim.com"
                },
                "defaultPercents": 25
            },
            "rating": {
                "total": 0,
                "rate": 0,
                "count": 0
            },
            "name": "Ben Hodeda",
            "id": "1215056541841072",
            "email": "benhodeda@gmail.com",
            "picture": {
                "data": {
                    "is_silhouette": false,
                    "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220…a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
                }
            }
        },
        "condition": "כמעט חדש",
        "sub_category": "נעלי עקב",
        "price": 140,
        "organization": {
            "name": "מאבק לחיים",
            "email": "maavak@lachaim.com"
        },
        "description": "נעלי עקב בהדפס זברה. הולך מעולה עם מנומר! סולידי.",
        "category": "בגדי נשים",
        "percent": 25,
        "size": "XL",
        "color": "שחור",
        "sold": false
    }
}
```

## upload image as a new product
POST /api/products/upload
body: generate automatically using upload component in the client
contentType: multipart/form-data

the example's response:
```javascript
{
    "_index": "products",
    "_type": "ds011248_mongolab_com_f2a7",
    "_id": "AVbMqB-2qYz0-3YAINS9",
    "_version": 1,
    "_shards": {
        "total": 2,
        "successful": 2,
        "failed": 0
    },
    "created": true,
    "item": {
        "image": "422ea1a0-6c4e-11e6-9b97-7fd417317e6f.jpg"
        "sold": false
    }
}
```

## mark products as sold
POST /api/products/sold/:id
parameters (required) :
* id - the id of the product
body: JSON of the user who bought the product
{
    "name": "Elad Douenias",
    "id": "10206489864621597",
    "email": "eladdo92@gmail.com"
}

example of the response:
```javascript
{
  "seller": "250 2.0.0 OK 1472312798 r29sm13302452qte.48 - gsmtp",
  "buyer": "250 2.0.0 OK 1472312798 z32sm13352055qtz.0 - gsmtp",
  "product": {
    "image": "2686d560-6c46-11e6-9b97-7fd417317e6f.jpg",
    "seller": {
      "settings": {
        "defaultOrg": {
          "name": "שמחה לילד",
          "email": "simcha@layeled.com"
        },
        "defaultPercents": 20
      },
      "rating": {
        "total": 0,
        "rate": 0,
        "count": 0
      },
      "name": "Elad Douenias",
      "id": "10206489864621597",
      "email": "eladdo92@gmail.com",
      "picture": {
        "data": {
          "is_silhouette": false,
          "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xal1/v/t1.0-1/c0.113.588.5…c2ba41b695&oe=584E0B3D&__gda__=1482473106_5b2d582bab6189f2f10a28f7457df4ca"
        }
      }
    },
    "condition": "חדש",
    "sub_category": "נעליים",
    "price": 120,
    "organization": {
      "name": "שמחה לילד",
      "email": "simcha@layeled.com"
    },
    "description": "מוקסינים של טומי. ננעלו רק בשני אירועים. מצב מדהים!",
    "category": "בגדי גברים",
    "percent": 20,
    "size": "S",
    "color": "לבן",
    "sold": true,
    "buyer": {
      "name": "Elad Douenias",
      "id": "10206489864621597",
      "email": "eladdo92@gmail.com"
    },
    "_id": "AVbMYFJ79Iu6vSdm-dHF"
  }
}
```

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

## update product
PUT /api/products/:id
parameters (required) :
* id - the id of the product
body: JSON of partial product to add new field or overwrite existing fields
{
    "size": "L"
}

example of the response: (response format same as getting all products)
```javascript
{
  "_index": "products",
  "_type": "ds011248_mongolab_com_f2a7",
  "_id": "AVbMYFJk9Iu6vSdm-dHD",
  "_version": 3,
  "_shards": {
    "total": 2,
    "successful": 2,
    "failed": 0
  }
}
```
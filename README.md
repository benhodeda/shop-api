# shop-api


# Products API

## search for available products
GET /api/products/search

parameters (optionals):
* q - query string
* any field of product document - values to filter (iuse "," to split between different values)

body: none

example of the response:
```javascript
{
  "count": 5,
  "products": [
    {
      "image": "e8859a10-6c42-11e6-9b97-7fd417317e6f.jpg",
      "seller": {
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
      "condition": "כמעט חדש",
      "sub_category": "חולצות",
      "price": 100,
      "organization": {
        "name": "מאבק לחיים",
        "email": "maavak@lachaim.com"
      },
      "description": "חולצה של פולו",
      "category": "בגדי גברים",
      "percent": 10,
      "size": "L",
      "color": "אדום",
      "sold": false,
      "_id": "AVbMZvZlqYz0-3YAIMc1",
      "_score": 1.2623643
    },
    {
      "image": "f3178680-6c44-11e6-9b97-7fd417317e6f.jpeg",
      "seller": {
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
      "condition": "לא מדהים",
      "sub_category": "נעליים",
      "price": 50,
      "organization": {
        "name": "hand2hand",
        "email": "hand2hand.desk@gmail.com"
      },
      "description": "נעלי אדידס, מלוכלכות מבוץ אבל טובות.",
      "category": "ילדים",
      "percent": 10,
      "size": "S",
      "color": "ירוקיא",
      "sold": false,
      "_id": "AVbMYFJz9Iu6vSdm-dHE",
      "_score": 1.2623643
    },
    {
      "image": "80daeb00-6c46-11e6-9b97-7fd417317e6f.jpg",
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
      "condition": "כמעט חדש",
      "sub_category": "מכנסיים",
      "price": 40,
      "organization": {
        "name": "אור שלום",
        "email": "or@shalom.com"
      },
      "description": "מכנסי חקי חמודים לילדים",
      "category": "ילדים",
      "percent": 20,
      "size": "M",
      "color": "אדום",
      "sold": false,
      "_id": "AVbMZvaDqYz0-3YAIMc4",
      "_score": 1.2623643
    },
    {
      "image": "7461abb0-6c6a-11e6-97c1-f7e19dc0a50d.jpg",
      "sold": false,
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
            "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xal1/v/t1.0-1/c0.113.588.588/s50x50/11695396_10204185729699664_2548305670346553542_n.jpg?oh=06e6a56b018971cfc1ab50c2ba41b695&oe=584E0B3D&__gda__=1482473106_5b2d582bab6189f2f10a28f7457df4ca"
          }
        }
      },
      "condition": "כמעט חדש",
      "size": "M",
      "color": "שחור",
      "sub_category": "נעליים",
      "price": 40,
      "organization": {
        "name": "שמחה לילד",
        "email": "simcha@layeled.com"
      },
      "description": "אחלה כפכפים!",
      "category": "ילדים",
      "percent": 20,
      "_id": "AVbMmVPC9Iu6vSdm-dm5",
      "_score": 1.2623643
    },
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
      "_id": "AVbMqB-2qYz0-3YAINS9",
      "_score": 1.2623643
    }
  ],
  "facets": {
    "condition": [
      {
        "key": "כמעט חדש",
        "doc_count": 4
      },
      {
        "key": "לא מדהים",
        "doc_count": 1
      }
    ],
    "size": [
      {
        "key": "m",
        "doc_count": 2
      },
      {
        "key": "l",
        "doc_count": 1
      },
      {
        "key": "s",
        "doc_count": 1
      },
      {
        "key": "xl",
        "doc_count": 1
      }
    ],
    "color": [
      {
        "key": "אדום",
        "doc_count": 2
      },
      {
        "key": "שחור",
        "doc_count": 2
      },
      {
        "key": "ירוקיא",
        "doc_count": 1
      }
    ],
    "sub_category": [
      {
        "key": "נעליים",
        "doc_count": 2
      },
      {
        "key": "חולצות",
        "doc_count": 1
      },
      {
        "key": "מכנסיים",
        "doc_count": 1
      },
      {
        "key": "נעלי עקב",
        "doc_count": 1
      }
    ],
    "price": [
      {
        "key": "0-25",
        "to": 25,
        "to_as_string": "25.0",
        "doc_count": 0
      },
      {
        "key": "25-50",
        "from": 25,
        "from_as_string": "25.0",
        "to": 50,
        "to_as_string": "50.0",
        "doc_count": 2
      },
      {
        "key": "50-75",
        "from": 50,
        "from_as_string": "50.0",
        "to": 75,
        "to_as_string": "75.0",
        "doc_count": 1
      },
      {
        "key": "75-100",
        "from": 75,
        "from_as_string": "75.0",
        "to": 100,
        "to_as_string": "100.0",
        "doc_count": 0
      },
      {
        "key": "100-125",
        "from": 100,
        "from_as_string": "100.0",
        "to": 125,
        "to_as_string": "125.0",
        "doc_count": 1
      },
      {
        "key": "125-150",
        "from": 125,
        "from_as_string": "125.0",
        "to": 150,
        "to_as_string": "150.0",
        "doc_count": 1
      },
      {
        "key": "150-175",
        "from": 150,
        "from_as_string": "150.0",
        "to": 175,
        "to_as_string": "175.0",
        "doc_count": 0
      },
      {
        "key": "175-200",
        "from": 175,
        "from_as_string": "175.0",
        "to": 200,
        "to_as_string": "200.0",
        "doc_count": 0
      },
      {
        "key": "200-225",
        "from": 200,
        "from_as_string": "200.0",
        "to": 225,
        "to_as_string": "225.0",
        "doc_count": 0
      },
      {
        "key": "225-250",
        "from": 225,
        "from_as_string": "225.0",
        "to": 250,
        "to_as_string": "250.0",
        "doc_count": 0
      },
      {
        "key": "250-0",
        "from": 250,
        "from_as_string": "250.0",
        "doc_count": 0
      }
    ],
    "location": [],
    "category": [
      {
        "key": "ילדים",
        "doc_count": 3,
        "sub_category": [
          {
            "key": "נעליים",
            "doc_count": 2
          },
          {
            "key": "מכנסיים",
            "doc_count": 1
          }
        ]
      },
      {
        "key": "בגדי גברים",
        "doc_count": 1,
        "sub_category": [
          {
            "key": "חולצות",
            "doc_count": 1
          }
        ]
      },
      {
        "key": "בגדי נשים",
        "doc_count": 1,
        "sub_category": [
          {
            "key": "נעלי עקב",
            "doc_count": 1
          }
        ]
      }
    ],
    "organization.name": [
      {
        "key": "מאבק לחיים",
        "doc_count": 2
      },
      {
        "key": "hand2hand",
        "doc_count": 1
      },
      {
        "key": "אור שלום",
        "doc_count": 1
      },
      {
        "key": "שמחה לילד",
        "doc_count": 1
      }
    ],
    "percent": [
      {
        "key": "0-10",
        "to": 10,
        "to_as_string": "10.0",
        "doc_count": 0
      },
      {
        "key": "10-20",
        "from": 10,
        "from_as_string": "10.0",
        "to": 20,
        "to_as_string": "20.0",
        "doc_count": 2
      },
      {
        "key": "20-30",
        "from": 20,
        "from_as_string": "20.0",
        "to": 30,
        "to_as_string": "30.0",
        "doc_count": 3
      },
      {
        "key": "30-40",
        "from": 30,
        "from_as_string": "30.0",
        "to": 40,
        "to_as_string": "40.0",
        "doc_count": 0
      },
      {
        "key": "50-60",
        "from": 50,
        "from_as_string": "50.0",
        "to": 60,
        "to_as_string": "60.0",
        "doc_count": 0
      },
      {
        "key": "60-70",
        "from": 60,
        "from_as_string": "60.0",
        "to": 70,
        "to_as_string": "70.0",
        "doc_count": 0
      },
      {
        "key": "70-80",
        "from": 70,
        "from_as_string": "70.0",
        "to": 80,
        "to_as_string": "80.0",
        "doc_count": 0
      },
      {
        "key": "80-90",
        "from": 80,
        "from_as_string": "80.0",
        "to": 90,
        "to_as_string": "90.0",
        "doc_count": 0
      },
      {
        "key": "90-0",
        "from": 90,
        "from_as_string": "90.0",
        "doc_count": 0
      }
    ]
  }
}
```

## search for sold products
GET /api/products/sold

parameters (optionals):
* q - query string
* any field of product document - values to filter (iuse "," to split between different values)

body: none

example of the response:
```javascript
{
  "count": 4,
  "products": [
    {
      "category": "בגדי נשים",
      "condition": null,
      "description": "לבשתי אותה רק 3 פעמים, היא ממש נוחה, כל עוד לא יושבים!!!!",
      "price": 190,
      "organization": {
        "name": "מאבק לחיים",
        "email": "maavak@lachaim.com"
      },
      "percent": 25,
      "sub_category": "חצאיות",
      "seller": {
        "rating": {
          "total": 0,
          "count": 0,
          "rate": 0
        },
        "name": "Ben Hodeda",
        "email": "benhodeda-buyer@gmail.com",
        "picture": {
          "data": {
            "is_silhouette": false,
            "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220…a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
          }
        },
        "id": "1215056541841072",
        "settings": {
          "defaultOrg": {
            "name": "מאבק לחיים",
            "email": "maavak@lachaim.com"
          },
          "defaultPercents": 25
        }
      },
      "size": "XL",
      "color": "לבן",
      "sold": true,
      "buyer": {
        "name": "Elad Douenias",
        "id": "10206489864621597",
        "email": "benhodeda-buyer-1@gmail.com"
      },
      "_id": "AVbMZvZ-qYz0-3YAIMc3",
      "_score": 2.0296195
    },
    {
      "image": "a3c28190-6c47-11e6-9b97-7fd417317e6f.JPG",
      "seller": {
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
      "sub_category": "שמלות",
      "price": 140,
      "organization": {
        "name": "שמחה לילד",
        "email": "simcha@layeled.com"
      },
      "description": "שמלה קיצית ומקסימה בצבע ורוד. מהממתת!! ",
      "category": "בגדי נשים",
      "percent": 10,
      "size": "XL",
      "color": "לבן",
      "sold": true,
      "buyer": {
        "name": "Elad Douenias",
        "id": "10206489864621597",
        "email": "eladdo92@gmail.com"
      },
      "_id": "AVbMYFJd9Iu6vSdm-dHC",
      "_score": 2.0296195
    },
    {
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
      "_id": "AVbMYFJ79Iu6vSdm-dHF",
      "_score": 2.0296195
    },
    {
      "image": "c03b75f0-6c4e-11e6-9b97-7fd417317e6f.jpg",
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
      "sub_category": "מכנסיים",
      "price": 70,
      "organization": {
        "name": "אור שלום",
        "email": "or@shalom.com"
      },
      "description": "מכנסי ספורט שהילד שלי השתמש בהן ממש קצת, גג 15 שנה. צבע תכלת נגד עין הרע!",
      "category": "ילדים",
      "percent": 25,
      "size": "L",
      "color": "לבן",
      "sold": true,
      "buyer": {
        "name": "Elad Douenias",
        "id": "10206489864621597",
        "email": "eladdo92@gmail.com"
      },
      "_id": "AVbMYFJk9Iu6vSdm-dHD",
      "_score": 2.0296195
    }
  ],
  "facets": {
    "condition": [
      {
        "key": "כמעט חדש",
        "doc_count": 2
      },
      {
        "key": "חדש",
        "doc_count": 1
      }
    ],
    "size": [
      {
        "key": "xl",
        "doc_count": 2
      },
      {
        "key": "l",
        "doc_count": 1
      },
      {
        "key": "s",
        "doc_count": 1
      }
    ],
    "color": [
      {
        "key": "לבן",
        "doc_count": 4
      }
    ],
    "sub_category": [
      {
        "key": "חצאיות",
        "doc_count": 1
      },
      {
        "key": "מכנסיים",
        "doc_count": 1
      },
      {
        "key": "נעליים",
        "doc_count": 1
      },
      {
        "key": "שמלות",
        "doc_count": 1
      }
    ],
    "price": [
      {
        "key": "0-25",
        "to": 25,
        "to_as_string": "25.0",
        "doc_count": 0
      },
      {
        "key": "25-50",
        "from": 25,
        "from_as_string": "25.0",
        "to": 50,
        "to_as_string": "50.0",
        "doc_count": 0
      },
      {
        "key": "50-75",
        "from": 50,
        "from_as_string": "50.0",
        "to": 75,
        "to_as_string": "75.0",
        "doc_count": 1
      },
      {
        "key": "75-100",
        "from": 75,
        "from_as_string": "75.0",
        "to": 100,
        "to_as_string": "100.0",
        "doc_count": 0
      },
      {
        "key": "100-125",
        "from": 100,
        "from_as_string": "100.0",
        "to": 125,
        "to_as_string": "125.0",
        "doc_count": 1
      },
      {
        "key": "125-150",
        "from": 125,
        "from_as_string": "125.0",
        "to": 150,
        "to_as_string": "150.0",
        "doc_count": 1
      },
      {
        "key": "150-175",
        "from": 150,
        "from_as_string": "150.0",
        "to": 175,
        "to_as_string": "175.0",
        "doc_count": 0
      },
      {
        "key": "175-200",
        "from": 175,
        "from_as_string": "175.0",
        "to": 200,
        "to_as_string": "200.0",
        "doc_count": 1
      },
      {
        "key": "200-225",
        "from": 200,
        "from_as_string": "200.0",
        "to": 225,
        "to_as_string": "225.0",
        "doc_count": 0
      },
      {
        "key": "225-250",
        "from": 225,
        "from_as_string": "225.0",
        "to": 250,
        "to_as_string": "250.0",
        "doc_count": 0
      },
      {
        "key": "250-0",
        "from": 250,
        "from_as_string": "250.0",
        "doc_count": 0
      }
    ],
    "location": [],
    "category": [
      {
        "key": "בגדי נשים",
        "doc_count": 2,
        "sub_category": [
          {
            "key": "חצאיות",
            "doc_count": 1
          },
          {
            "key": "שמלות",
            "doc_count": 1
          }
        ]
      },
      {
        "key": "בגדי גברים",
        "doc_count": 1,
        "sub_category": [
          {
            "key": "נעליים",
            "doc_count": 1
          }
        ]
      },
      {
        "key": "ילדים",
        "doc_count": 1,
        "sub_category": [
          {
            "key": "מכנסיים",
            "doc_count": 1
          }
        ]
      }
    ],
    "organization.name": [
      {
        "key": "שמחה לילד",
        "doc_count": 2
      },
      {
        "key": "אור שלום",
        "doc_count": 1
      },
      {
        "key": "מאבק לחיים",
        "doc_count": 1
      }
    ],
    "percent": [
      {
        "key": "0-10",
        "to": 10,
        "to_as_string": "10.0",
        "doc_count": 0
      },
      {
        "key": "10-20",
        "from": 10,
        "from_as_string": "10.0",
        "to": 20,
        "to_as_string": "20.0",
        "doc_count": 1
      },
      {
        "key": "20-30",
        "from": 20,
        "from_as_string": "20.0",
        "to": 30,
        "to_as_string": "30.0",
        "doc_count": 3
      },
      {
        "key": "30-40",
        "from": 30,
        "from_as_string": "30.0",
        "to": 40,
        "to_as_string": "40.0",
        "doc_count": 0
      },
      {
        "key": "50-60",
        "from": 50,
        "from_as_string": "50.0",
        "to": 60,
        "to_as_string": "60.0",
        "doc_count": 0
      },
      {
        "key": "60-70",
        "from": 60,
        "from_as_string": "60.0",
        "to": 70,
        "to_as_string": "70.0",
        "doc_count": 0
      },
      {
        "key": "70-80",
        "from": 70,
        "from_as_string": "70.0",
        "to": 80,
        "to_as_string": "80.0",
        "doc_count": 0
      },
      {
        "key": "80-90",
        "from": 80,
        "from_as_string": "80.0",
        "to": 90,
        "to_as_string": "90.0",
        "doc_count": 0
      },
      {
        "key": "90-0",
        "from": 90,
        "from_as_string": "90.0",
        "doc_count": 0
      }
    ]
  }
}
```

## get single product
GET /api/products/:id

parameters (required) :
* id - the id of the product

body: none

example of the response:
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
```javascript
{
    "name": "Elad Douenias",
    "id": "10206489864621597",
    "email": "eladdo92@gmail.com"
}
```
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

example of the response:
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
```javascript
{
    "size": "L"
}
```
example of the response:
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


# Users API

## get all the users
GET /api/users

body: none

example of the response:
```javascript
[
  {
    "_id": "57bf2414d761d7110032ecbd",
    "__v": 0,
    "local": {
      "name": "Elad Douenias",
      "email": "eladdo92@gmail.com",
      "id": "10206489864621597",
      "rating": {
        "total": 0,
        "count": 0,
        "rate": 0
      },
      "picture": {
        "data": {
          "is_silhouette": false,
          "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xal1/v/t1.0-1/c0.113.588.588/s50x50/11695396_10204185729699664_2548305670346553542_n.jpg?oh=06e6a56b018971cfc1ab50c2ba41b695&oe=584E0B3D&__gda__=1482473106_5b2d582bab6189f2f10a28f7457df4ca"
        }
      }
    }
  },
  {
    "_id": "57c175db9c1c7c11000be242",
    "__v": 0,
    "local": {
      "name": "Ben Hodeda",
      "email": "benhodeda@gmail.com",
      "id": "1215056541841072",
      "rating": {
        "total": 0,
        "count": 0,
        "rate": 0
      },
      "picture": {
        "data": {
          "is_silhouette": false,
          "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220465_1115504041796323_9039949048623471474_n.jpg?oh=b8063f79f4b9a9e140d592a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
        }
      }
    }
  }
]
```

## get single user
GET /api/users/:id

parameters (required) :
* id - the id of the user

body: none

example of the response:
```javascript
{
  "_id": "57c175db9c1c7c11000be242",
  "__v": 0,
  "local": {
    "name": "Ben Hodeda",
    "email": "benhodeda@gmail.com",
    "id": "1215056541841072",
    "rating": {
      "total": 0,
      "count": 0,
      "rate": 0
    },
    "picture": {
      "data": {
        "is_silhouette": false,
        "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220465_1115504041796323_9039949048623471474_n.jpg?oh=b8063f79f4b9a9e140d592a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
      }
    }
  }
}
```

## rate a user
POST /api/users/:id/rate?rate=[Number]

parameters (required) :
* id - the id of the product
* rating - a rate for the user

body: none

example of the response:
```javascript
{
  "_id": "57c175db9c1c7c11000be242",
  "__v": 0,
  "local": {
    "name": "Ben Hodeda",
    "email": "benhodeda@gmail.com",
    "id": "1215056541841072",
    "rating": {
      "total": 5,
      "count": 1,
      "rate": 5
    },
    "picture": {
      "data": {
        "is_silhouette": false,
        "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220465_1115504041796323_9039949048623471474_n.jpg?oh=b8063f79f4b9a9e140d592a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
      }
    }
  }
}
```

## delete user
DELETE /api/users/:id

parameters (required) :
* id - the id of the user

body: none

example of the response:
```javascript
TBD
```

## update user
PUT /api/users/:id

parameters (required) :
* id - the id of the user

body: full JSON of the user
```javascript
{
  "name": "Ben Hodeda",
  "email": "benhodeda1@gmail.com",
  "id": "1215056541841072",
  "rating": {
    "total": 0,
    "count": 0,
    "rate": 0
  },
  "picture": {
    "data": {
      "is_silhouette": false,
      "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220465_1115504041796323_9039949048623471474_n.jpg?oh=b8063f79f4b9a9e140d592a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c"
    }
  }
}
```
example of the response:
```javascript
{
    "_id": "57c175db9c1c7c11000be242",
    "__v": 0,
    "local": {
        "id": "1215056541841072",
        "email": "benhodeda1@gmail.com",
        "name": "Ben Hodeda",
        "rating": {
            "rate": 0,
            "count": 0,
            "total": 0
        },
        "picture": {
            "data": {
                "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/p50x50/11220465_1115504041796323_9039949048623471474_n.jpg?oh=b8063f79f4b9a9e140d592a7d980012f&oe=5853B567&__gda__=1482389067_0dbf18aaf73dc01d33fec38e9016283c",
                "is_silhouette": false
            }
        }
    }
}
```


# PayPal API

## buy a product using PayPal
POST /api/paypal

body: product id & redirection url's after visiting PayPal site
```javascript
{
  "product": "AVbMZvZlqYz0-3YAIMc1",
  "cancelUrl": "http://www.google.com/",
  "returnUrl": "http://www.ynet.com/"
}
```
example of the response:
```javascript
{
  "responseEnvelope": {
    "timestamp": "2016-08-27T09:22:14.366-07:00",
    "ack": "Success",
    "correlationId": "c7f551a2ec264",
    "build": "24003818"
  },
  "payKey": "AP-3TV139448T0521544",
  "paymentExecStatus": "CREATED",
  "httpStatusCode": 200,
  "paymentApprovalUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=AP-3TV139448T0521544"
}
```


# Authentication API

## buy a product using PayPal
POST /api/auth/local/login

body: JSON of the user to insert including email & facebook ID
```javascript
TBD
```
example of the response:
```javascript
TBD
```
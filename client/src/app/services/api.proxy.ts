import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ImageUploader} from "./image.uploader";

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

//const DOMAIN = 'https://mta-shopapi.herokuapp.com/';
// const DOMAIN = 'http://192.168.1.9:3000/';
 const DOMAIN = '';
const URL = DOMAIN + 'api/';

@Injectable()
export class ApiProxy {
  constructor(
    protected imageUploader: ImageUploader,
    protected http: Http) { }

  get DOMAIN() { return DOMAIN; }

  get BASEURL() { return URL; }

  login(user) {
    return this.http.post(URL + 'auth/local/login', JSON.stringify(user), options)
      .map(x => x.json());
  }

  updateUser(user) {
    return this.http.put(URL + 'users/' + user.id, JSON.stringify(user), options)
      .map(x => x.json());
  }

  protected uploadImage(file: File) {
    return this.imageUploader.makeFileRequest(URL + 'products/upload', file);
  }

  getAllProductsForSearch() {
    let params = new URLSearchParams();
    params.set('ignore', <string> +new Date());

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/search', options)
      .map(x => x.json());
  }

  advancedSearch(fields) {
    let params = new URLSearchParams();
    params.set('ignore', <string> +new Date());

    for(let field in fields) {
      if (fields[field]) {
        params.set(field, fields[field]);
      }
    }

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/search', options)
      .map(x => x.json());
  }

  getAllProducts() {
    let params = new URLSearchParams();
    params.set('ignore', <string> +new Date());

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/search', options)
      .map(x => x.json().products);
  }

  searchProducts(q: string) {
    let params = new URLSearchParams();
    params.set('q', q);

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/search', options)
      .map(x => x.json().products);

  }

  getProduct(id) {
    return this.http.get(URL + 'products/' + id).map(x => x.json());
  }

  addProduct(product, file) {
    if (!file) {
      return this.http.post(URL + 'products/', JSON.stringify(product), options).map(x => x.json());
    } else {
      return Observable.create(observer => {
        this.uploadImage(file).subscribe(res => {
          this.updateProduct(res._id, product).subscribe(res => {
            observer.next(res);
          });
        });
      });
    }
  }

  buyProduct(id) {
    return this.http.post(URL + 'paypal/', JSON.stringify({
      product: id,
      cancelUrl: 'http://localhost:3000/#/store/product/' + id,
      returnUrl: 'http://localhost:3000/#/sold/' + id,
    }), options).map(x => <{ paymentApprovalUrl: any }>x.json());
  }

  getUserStore(userId) {
    let params = new URLSearchParams();
    params.set('seller.id', userId);
    params.set('ignore', <string> +new Date());

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/search', options)
      .map(x => x.json().products);
  }

  getUserPurchases(userId) {
    let params = new URLSearchParams();
    params.set('buyer.id', userId);
    params.set('ignore', <string> +new Date());

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/sold', options)
      .map(x => x.json().products);
  }

  getUserSells(userId) {
    let params = new URLSearchParams();
    params.set('seller.id', userId);
    params.set('ignore', <string> +new Date());

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(URL + 'products/sold', options)
      .map(x => x.json().products);
  }

  rateUser(userIdToRate, rate, rater) {
    let params = new URLSearchParams();
    params.set('rate', rate);

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.post(URL + `users/${userIdToRate}/rate`,
      JSON.stringify(rater), options)
      .map(x => x.json().products);
  }

  updateProduct(id, product) {
    return this.http.put(URL + 'products/' + id, JSON.stringify(product), options).map(x => x.json());
  }

  markProductAsSold(productId, buyer) {
    return this.http.post(URL + 'products/sold/' + productId, JSON.stringify(buyer), options)
      .map(x => x.json());
  }

  deleteProduct(id) {
    return this.http.delete(URL + 'products/' + id, options).map(x => x.json());
  }

}

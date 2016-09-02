import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ImageUploader {
  progress;
  progressObserver;

  constructor() {
    Observable.create(observer => {
      this.progressObserver = observer;
    }).share();
  }

  makeFileRequest(url: string, file: File): Observable {
    return Observable.create(observer => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append("userPhoto", file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);
      };

      xhr.open('POST', url, true);
      //xhr.setRequestHeader("Content-type", "multipart/form-data");
      xhr.send(formData);
    });
  }
}

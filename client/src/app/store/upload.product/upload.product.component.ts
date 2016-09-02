import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {ApiProxy} from "../../services/api.proxy";
import {categories, conditions, organizations, sizes} from '../../services/categories';
import {AuthMediator} from "../../services/auth.mediator";
import {ImageUploader} from "../../services/image.uploader";


@Component({
  selector: 'upload-product',
  styles: [ `
    .upload-container {
      min-height: calc(100vh - 64px - 130px);
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: center;
      align-items: center;
    }
    
    .upload-container md-card {
      width: 70%;
      margin: 40px;
    }
    
    form div lable {
      display: block;
    }
    form div select {
      background-color: rgba(255,255,255,0.9);
      padding: 5px;
      border: 1px solid #f2f2f2;
      border-radius: 2px;
      margin: 10px 0 10px 10px;
      width: 200px;
    }
    
    md-input {
      width: 100%;
    }
    
    .inputfile + label {
        width: 150px;
        font-size: 1.25rem;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        display: block;
        margin: 20px auto;
        overflow: hidden;
        padding: 0.625rem 1.25rem;
        color: #4CAF50;
        border: 2px solid currentColor;
    }
    
    .inputfile {
        display: none;
    }
        
    .file-label-text {
        width: 115px;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .inputfile:focus + label,
    .inputfile.has-focus + label {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
    }

    
    .inputfile + label svg {
        width: 1em;
        height: 1em;
        fill: currentColor;
        margin-top: -0.25em;
        margin-right: 0.25em;
    }
    
    .inputfile:focus + label,
    .inputfile.has-focus + label,
    .inputfile + label:hover {
        color: #33691E;
    }
    
    .submit {
      display: block;
      margin: 0 auto;
    }
    
    .upload-spinner {
      height: 50px;
      width: 50px;
      margin: 25px auto auto;
    }
` ],
  template: `
<section class="upload-container">
    <md-card>
      <md-card-title>
      פרסום בגד חדש
      </md-card-title>
      <md-card-content>

      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <div>
          <lable>קטגוריה *</lable>
          <select required ngControl="category">
            <option [value]="c.name" *ngFor="let c of categories">{{ c.name }}</option>
          </select>
        </div>
        
        <div *ngIf="form.value.category">
          <lable>תת קטגוריה *</lable>
          <select required ngControl="sub_category">
            <option [value]="sc" *ngFor="let sc of subCategories(form.value.category)">{{ sc }}</option>
          </select>
        </div>
        
        <div>
          <lable>מצב הבגד *</lable>
          <select required ngControl="condition">
            <option [value]="c" *ngFor="let c of conditions">{{ c }}</option>
          </select>
        </div>
        
        <div>
          <lable>מידה</lable>
          <select ngControl="size">
            <option [value]="s" *ngFor="let s of sizes">{{ s }}</option>
          </select>
        </div>
        
        <md-input placeholder="צבע" ngControl="color"></md-input>

        <md-input required placeholder="תיאור" ngControl="description"></md-input>
        
        <md-input type="number" required placeholder="מחיר" ngControl="price">
          <md-hint align="end">₪</md-hint>
        </md-input>
        
        <div>
          <lable>ארגון *</lable>
          <select required ngControl="organization" [(ngModel)]="organization">
            <option [ngValue]="o" *ngFor="let o of organizations">{{ o.name }}</option>
          </select>
        </div>
        
        <md-input type="number" step="5" min="5" max="100" required [(ngModel)]="percent" placeholder="אחוזים" ngControl="percent">
          <md-hint align="end">%</md-hint>
        </md-input>
        
        <input type="file" id="file" class="inputfile" accept="image/*" (change)="fileChange($event)" />
        <label for="file" class="inputfilelabel">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> 
          <span class="file-label-text"> {{ fileInputText }} </span>
        </label>

        <input [disabled]="!form.form.valid" type="submit" md-raised-button class="md-primary submit" value="פרסום"/>
        <md-spinner class="upload-spinner" *ngIf="uploading"></md-spinner>
      </form>
      
      </md-card-content>
    </md-card>
  </section>
`
 })
export class UploadProductComponent {
  percent = 10;
  categories = categories;
  conditions = conditions;
  sizes = sizes;
  organizations = organizations;
  fileInputText = 'בחר/י תמונה';
  uploading = false;
  selectedFile;
  organization;

  constructor(
    protected router: Router,
    protected imageUploader: ImageUploader,
    protected authMediator: AuthMediator,
    protected apiProxy: ApiProxy) {
  }

  ngOnInit() {
    let settings = this.authMediator.user.settings;

    if(settings) {
      if (settings.defaultOrg) {
        this.organization = this.organizations.filter(o => o.email === settings.defaultOrg.email)[0];
      }
      if (settings.defaultPercents) {
        this.percent = settings.defaultPercents;

      }
    }
  }

  fileChange(event) {
    this.selectedFile = event.srcElement.files[0];
    this.fileInputText = this.selectedFile.name;
  }

  subCategories(category) {
    return this.categories.filter(c => c.name === category)[0].sub;
  }

  onSubmit(form) {
    this.uploading = true;
    let product = Object.assign({}, form, {
      seller: this.authMediator.user
    });

    this.apiProxy.addProduct(product, this.selectedFile).subscribe(p => {
      this.router.navigate(['/Store/MyStore']);
    });
  }
}

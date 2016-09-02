import { Injectable } from '@angular/core';

interface IRoute {
  name: string,
  title: string
}

@Injectable()
export class Navigation {
  protected routs: IRoute[];

  constructor() {
    this.buildRouts();
  }

  buildRouts() {
    this.routs = [{
      name: 'Home',
      title: 'דף הבית'
    }, {
      name: 'Login',
      title: 'התחברות'
    },

    //   {
    //   name: 'Register',
    //   title: 'הרשמה'
    // },

      {
      name: 'Store',
      title: 'חנות'
    }];
  }

  getRouts() {
    return this.routs;
  }
}

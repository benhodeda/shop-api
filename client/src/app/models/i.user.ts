import {ISettings} from "./i.settings";

export interface IUser {
  name: string;
  email: string;
  id: string;
  picture: {
    data: {
      url: string
    }
  }
  settings: ISettings
}

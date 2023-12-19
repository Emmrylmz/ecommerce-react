export enum SelectedPage { 
    Home = "home",
    About = "about",
    Login = "login",
    Signup = "signup"
}
export interface IUser {
    id: number;
    username: string;
    email: string;
    // Add other properties as needed
  }
  export interface IInputs {
    email: string;
    password: string;
    name?: string
  }
  export type productType = {
    id:number,
    title:string
    price:number,
    category:string,
    description:string,
    image:string,
}
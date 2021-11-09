export interface Profile {
    _id: string;
index: number;
guid: string;
isActive: boolean;
balance: string;
picture: string;
age: 22,
eyeColor: string;
name: string;
gender: string;
company: string;
email: string;
phone:string;
address: string;
about:string;
latitude: number;
longitude:number;
tags: [],
friends: [
  {
	id: number;
	name: string;
  }
],
greeting: string;
favoriteFruit: string;
}
  
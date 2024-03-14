export type cartItems = {
  itemName: String;
  price: number;
};

export type UserType = {
  fullname: String;
  email: string;
  companyName?: String;
  accountType: String;
  emailToken: String | null;
  emailVerified: Boolean;
  password:String
};

export type Token = {
  id:String;
  email: string;
  accountType: String;
}

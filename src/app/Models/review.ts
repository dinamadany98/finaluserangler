import { IUser } from "./iuser";

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  user_review: string;
  user_name: IUser[];
}

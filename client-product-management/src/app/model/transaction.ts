import {Product} from './product';
import {User} from './user';
export class Transaction {
  id:number;
  product: Product;
  user: User;
  purchaseDate: any;
}

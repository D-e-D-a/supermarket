export interface UserInterface {
    name: string;
    email: string;
  }
  


  interface ProductInterface {
    _id: string;
    name: string;
    price: number;
    image: string;
  }
  
   export interface ProductsProps {
    data: ProductInterface[]; 
  }
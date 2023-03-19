export type Product = {
  gtin: string;
  image_link: string;
  additional_image_link: string;
  title: string;
  price: number;
  gender: 'male' | 'female' | 'unisex';
  sale_price: number;
};

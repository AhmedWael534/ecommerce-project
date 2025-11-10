import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/interfaces/api-models';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], term: string): Product[] {
    if (!term || !products) {
      return products;
    }
    return products.filter(product => 
      product.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
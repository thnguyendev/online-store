import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'shop-component',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent {
  data = [{
    id: 1,
    name: 'Product 1',
    price: 85,
  }, {
    id: 2,
    name: 'Product 2',
    price: 85,
  }, {
    id: 3,
    name: 'Product 3',
    price: 85,
  }, {
    id: 1,
    name: 'Product 4',
    price: 85,
  }, {
    id: 2,
    name: 'Product 5',
    price: 85,
  }, {
    id: 3,
    name: 'Product 6',
    price: 85,
  }, {
    id: 1,
    name: 'Product 7',
    price: 85,
  }, {
    id: 2,
    name: 'Product 8',
    price: 85,
  }]
}
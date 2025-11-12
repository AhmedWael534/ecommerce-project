import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';
import { SeeMorePipe } from '../../shared/pipes/see-more.pipe';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    CommonModule,
    SeeMorePipe
  ],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private _ordersService: OrdersService) { }

  ngOnInit(): void {

    const userId = '6407cf6f515bdcf347c09f17';

    this._ordersService.getUserOrders(userId).subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => {
        console.error("Failed to fetch orders:", err);
      }
    });
  }
}
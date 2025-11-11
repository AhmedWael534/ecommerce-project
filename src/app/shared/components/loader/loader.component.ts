import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ضروري عشان نستخدم async pipe
import { LoaderService } from '../../../core/services/loader.service';



@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  // 1. امسح السطر ده من هنا
  // isLoading$ = this.loaderService.isLoading; 

  // 2. خلي الـ service يبقى public
  constructor(public loaderService: LoaderService) { }
}
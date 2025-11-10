import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private _categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    });
  }
}
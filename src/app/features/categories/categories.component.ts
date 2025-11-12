import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service'; // (موجود عندك)
import { Category } from '../../core/interfaces/api-models';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router'; // 1. استيراد ActivatedRoute
import { switchMap, of } from 'rxjs'; // 2. استيراد (جديد)

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  categories: Category[] = []; // للأقسام الرئيسية
  subcategories: any[] = []; // للأقسام الفرعية
  
  selectedCategoryName: string = '';
  isLoading: boolean = false;
  
  // 3. ⬇️ ⬇️ تعديل (مهم جداً) ⬇️ ⬇️
  // هنبدل كل اللوجيك القديم باللوجيك ده
  
  constructor(
    private _productsService: ProductsService,
    private _route: ActivatedRoute // 4. حقن (Inject)
  ) {}

  ngOnInit(): void {
    // 5. الـ ngOnInit هيقرأ الـ URL
    this.isLoading = true;
    
    // (ده معناه: اسمع أي تغيير في الـ URL query params)
    this._route.queryParamMap.pipe(
      switchMap(params => {
        const categoryId = params.get('category');
        const categoryName = params.get('name');

        if (categoryId && categoryName) {
          // 6. لو الـ URL فيه ID، هات الـ Subcategories
          this.selectedCategoryName = categoryName;
          this.categories = []; // فضي الأقسام الرئيسية
          return this._productsService.getSubcategoriesForCategory(categoryId);
        } else {
          // 7. لو الـ URL نضيف، هات الـ Categories الرئيسية
          this.selectedCategoryName = '';
          this.subcategories = []; // فضي الفرعية
          return this._productsService.getAllCategories();
        }
      })
    ).subscribe({
      next: (res) => {
        // 8. بناءً على اللي رجع، املى الـ Array الصح
        if (this.selectedCategoryName) {
          this.subcategories = res.data; // ملى الفرعية
        } else {
          this.categories = res.data; // ملى الرئيسية
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading categories:", err);
        this.isLoading = false;
      }
    });
  }
  
}
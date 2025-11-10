import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AllOrdersComponent } from './features/all-orders/all-orders.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { NgxSpinnerModule } from "ngx-spinner";

export const routes: Routes = [
  // Auth routes (not lazy loaded, but grouped)
  { 
    path: 'auth', 
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot Password' },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // Protected routes (using authGuard)
  { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'Home' },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent, title: 'Products' },
  { path: 'product-details/:id', canActivate: [authGuard], component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'Cart' },
  { path: 'checkout', canActivate: [authGuard], component: CheckoutComponent, title: 'Checkout' },
  { path: 'allorders', canActivate: [authGuard], component: AllOrdersComponent, title: 'All Orders' },
  { path: 'wishlist', canActivate: [authGuard], component: WishlistComponent, title: "Wishlist" },
  { path: 'categories', canActivate: [authGuard], component: CategoriesComponent, title: 'Categories' },
  { path: 'brands', canActivate: [authGuard], component: BrandsComponent, title: 'Brands' },

  // Default and Not Found
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default to home
  { path: '**', component: NotFoundComponent, title: 'Not Found' } // 404 page
];
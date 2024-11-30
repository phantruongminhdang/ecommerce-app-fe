import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductRequestDTO } from '../../../../shared/models/Product/ProductRequestDTO';
import { CategoryService } from '../../../../shared/services/api/category/category.service';
import { ProductService } from '../../../../shared/services/api/product/product.service';
import { ProductActions } from '../../../../state/product/action/product.action';
import { selectProducts, selectProductsError, selectProductsLoading } from '../../../../state/product/selector/product.selector';
import { AdminTableComponent } from "../../components/product/admin-table/admin-table.component";
import { PopupCreateProductComponent } from "../../components/product/popup-create-product/popup-create-product.component";
import { PopupProductAdminComponent } from "../../components/product/popup-product-admin/popup-product-admin.component";
import { TablePaginationAdminComponent } from "../../components/table-pagination-admin/table-pagination-admin.component";
import { ProductTableSkeletonComponent } from "../../components/product/skeleton/product-table-skeleton/product-table-skeleton.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminTableComponent, PopupProductAdminComponent, PopupCreateProductComponent, TablePaginationAdminComponent, ProductTableSkeletonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  activateRoute = inject(ActivatedRoute);
  store = inject(Store);

  categories: any[] = [];

  pageIndex: number = 0;
  pageSize: number = 10;

  paginationProduct$ = this.store.select(selectProducts);
  isLoading$: Observable<boolean> = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);


  showModifyProduct = false;
  showCreateProduct = false;
  selectedUpdateProductId: string = "";

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.pageIndex = Number.parseInt(params.get('pageIndex') || '0');
      this.pageSize = Number.parseInt(params.get('pageSize') || '5');

      this.getAllProducts();
    })
    this.getAllCategories();
  }

  getAllProducts() {
    this.store.dispatch(ProductActions.loadProduct({ pageIndex: this.pageIndex, pageSize: this.pageSize }))
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  onEditProduct(productId: string) {
    this.selectedUpdateProductId = productId;
    this.showModifyProduct = true;
  }

  onShowAddProductPopup() {
    this.showCreateProduct = true;
  }

  onShowDeleteProductPopup(productId: string) {
    const confirmDelete = window.confirm(`Are you sure you want to delete product with id ${productId}?`);
    if (confirmDelete) {
      this.onDeleteProduct(productId);
    }
  }

  onSaveProduct(product: ProductRequestDTO) {
    // Implement save logic
    this.productService.saveProduct(product, this.selectedUpdateProductId).subscribe({
      next: (res: any) => {
        alert(res.msg);
        this.getAllProducts();
        this.showModifyProduct = false;
      },
      error: (err) => {
        alert(err.error);
      }
    }
    )
  }

  onAddProduct(product: ProductRequestDTO) {
    this.productService.addProduct(product).subscribe({
      next: (res: any) => {
        alert(res.msg);
        this.getAllProducts();
        this.showCreateProduct = false;
      },
      error: (err) => {
        alert(err.error);
      }
    })
  }

  onDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: (res: any) => {
        alert(res.msg);
        this.getAllProducts();
      },
      error: (err: any) => {
        alert(err.error);
      }
    })
  }

  onCloseModifyProduct() {
    this.showModifyProduct = false;
  }

  onCloseCreateProduct() {
    this.showCreateProduct = false;
  }
}

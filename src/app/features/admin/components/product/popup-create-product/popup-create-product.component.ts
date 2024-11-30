import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductRequestDTO } from '../../../../../shared/models/Product/ProductRequestDTO';
import { ProductService } from '../../../../../shared/services/api/product/product.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './popup-create-product.component.html',
  styleUrl: './popup-create-product.component.css'
})
export class PopupCreateProductComponent {

  @Input() categoryList: any;
  @Output() add = new EventEmitter<ProductRequestDTO>();
  @Output() close = new EventEmitter<void>();

  productSrv = inject(ProductService);

  formBuilder = inject(FormBuilder);

  categoryId: FormControl = new FormControl('', Validators.required);
  name: FormControl = new FormControl('', Validators.required);
  description: FormControl = new FormControl('', Validators.required);
  imageUrl: FormControl = new FormControl('', Validators.required);
  price: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  quantity: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  code: FormControl = new FormControl('', Validators.required);

  productForm = this.formBuilder.group({
    categoryId: this.categoryId,
    name: this.name,
    description: this.description,
    imageUrl: this.imageUrl,
    price: this.price,
    quantity: this.quantity,
    code: this.code
  })

  // ngOnChanges() {
  //   this.getProductById(this.productId);

  // }
  onSubmit() {
    if (this.productForm.valid) {
      this.add.emit(this.productForm.value as ProductRequestDTO);
    }
  }

  onClose() {
    this.close.emit();
  }
}

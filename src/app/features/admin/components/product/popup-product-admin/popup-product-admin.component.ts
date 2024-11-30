import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductRequestDTO } from '../../../../../shared/models/Product/ProductRequestDTO';
import { ProductService } from '../../../../../shared/services/api/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-product-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './popup-product-admin.component.html',
  styleUrl: './popup-product-admin.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class PopupProductAdminComponent {

  @Input() productId: string | null = null;
  @Input() categoryList: any;
  @Output() save = new EventEmitter<ProductRequestDTO>();
  @Output() close = new EventEmitter<void>();

  productSrv = inject(ProductService);
  formBuilder = inject(FormBuilder);

  product: ProductRequestDTO = {
    categoryId: '',
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    code: ''
  };

  getProductById(productId: string | null) {
    if (productId) {
      this.productSrv.getProductById(productId).subscribe((res: any) => {
        this.product = res;
        this.productForm.patchValue(this.product);
        console.log(this.product);
      });
    }
  }

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

  ngOnChanges() {
    this.getProductById(this.productId);

  }

  onSubmit() {
    if (this.productForm.valid) {
      this.save.emit(this.productForm.value as ProductRequestDTO);
    }
  }

  onClose() {
    this.close.emit();
  }
}

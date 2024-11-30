import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductResponseDTO } from '../../../../../shared/models/Product/ProductResponseDTO';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent {


  @Input() productList: ProductResponseDTO[] | null = [];
  @Output() editProduct = new EventEmitter<string>();
  @Output() deleteProduct = new EventEmitter<string>();

  onEditProduct(productId: string) {
    this.editProduct.emit(productId);
  }

  onDeleteProduct(productId: string) {
    this.deleteProduct.emit(productId);
  }
}

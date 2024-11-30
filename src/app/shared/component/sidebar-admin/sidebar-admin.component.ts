import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  navItems = [
    { name: 'Product Management', icon: 'fa-solid fa-box-archive', path: '/admin/products', id: 'product' },
    { name: 'Order Management', icon: 'fa-solid fa-truck-fast', path: '/admin/orders', id: 'order' },
    { name: 'User Management', icon: 'fa-solid fa-user', path: '/admin/users', id: 'user' }
  ];

  isActived: string = '';

}

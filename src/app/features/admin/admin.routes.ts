import { Route } from "@angular/router";
import { ProductsComponent } from "./pages/products/products.component";
import { AdminLayoutComponent } from "../../shared/layout/admin-layout/admin-layout.component";
import { authGuard } from "../../shared/guards/auth/auth.guard";
import { OrdersComponent } from "./pages/orders/orders.component";
import { UsersComponent } from "./pages/users/users.component";
import { OrderItemsComponent } from "./pages/order-items/order-items.component";

export const adminRoutes: Route =
{

    path: 'admin',
    canActivate: [authGuard],
    component: AdminLayoutComponent,
    children: [
        {
            path: 'products',
            component: ProductsComponent
        },
        {
            path: 'orders',
            component: OrdersComponent,
        },
        {
            path: 'orders/:orderId',
            component: OrderItemsComponent,
        },
        {
            path: 'users',
            component: UsersComponent
        }
    ]
};
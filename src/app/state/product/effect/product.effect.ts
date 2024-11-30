import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductActions } from "../action/product.action";
import { catchError, map, of, switchMap } from "rxjs";
import { ProductService } from "../../../shared/services/api/product/product.service";

@Injectable()
export class ProductEffect {

    loadProduct$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(ProductActions.loadProduct),
            switchMap((arg) =>
                this.productService.getAllProducts(arg.pageIndex, arg.pageSize).pipe(
                    map((products) => ProductActions.loadProductSuccess({ products })),
                    catchError((error) => of(ProductActions.loadProductFailure({ error })))
                )
            )
        )
    );

    private actions$ = inject(Actions);
    private productService = inject(ProductService)

}
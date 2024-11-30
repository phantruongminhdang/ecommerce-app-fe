import { createActionGroup, props } from "@ngrx/store";
import { ProductResponseDTO } from "../../../shared/models/Product/ProductResponseDTO";
import { Pagination } from "../../../shared/models/Pagination/Pagination";

export const ProductActions = createActionGroup({
    source: 'product',
    events: {
        'Load Product': props<{ pageIndex: number, pageSize: number }>(),
        'Load Product Success': props<{ products: Pagination<ProductResponseDTO> }>(),
        'Load Product Failure': props<{ error: any }>(),
    }
})
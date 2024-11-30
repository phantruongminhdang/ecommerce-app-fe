import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductResponseDTO } from "../../../shared/models/Product/ProductResponseDTO";
import { ProductActions } from "../action/product.action";
import { AppState } from "../../app.state";
import { Pagination } from "../../../shared/models/Pagination/Pagination";

// Initial state for products
export const initialState: AppState<Pagination<ProductResponseDTO>> = {
    data: null,
    loading: false,
    error: null
}

// Reducer for products (fetched from API)
export const productFeature = createFeature(
    {
        name: 'product',
        reducer: createReducer(
            initialState,
            on(ProductActions.loadProduct, (state) => {
                return {
                    ...state,
                    loading: true
                }
            }),
            on(ProductActions.loadProductSuccess, (state, { products }) => {
                return {
                    ...state,
                    loading: false,
                    data: products
                }
            }),
            on(ProductActions.loadProductFailure, (state, { error }) => {
                return {
                    ...state,
                    loading: false,
                    error: error
                }
            })
        ),
    }
)
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductResponseDTO } from "../../../shared/models/Product/ProductResponseDTO";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { AppState } from "../../app.state";

export const selectProductState = createFeatureSelector<AppState<Pagination<ProductResponseDTO>>>('product')

export const selectProducts = createSelector(
    selectProductState,
    (state) => state.data
)

export const selectProductsLoading = createSelector(
    selectProductState,
    (state) => state.loading
)

export const selectProductsError = createSelector(
    selectProductState,
    (state) => state.error
)
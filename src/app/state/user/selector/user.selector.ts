import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { AppState } from "../../app.state";
import { UserResponseDTO } from "../../../shared/models/User/UserReponseDTO";

export const selectUserState = createFeatureSelector<AppState<Pagination<UserResponseDTO>>>('user')

export const selectUsers = createSelector(
    selectUserState,
    (state) => state.data
)

export const selectUsersLoading = createSelector(
    selectUserState,
    (state) => state.loading
)

export const selectUsersError = createSelector(
    selectUserState,
    (state) => state.error
)
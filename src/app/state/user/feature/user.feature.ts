import { createFeature, createReducer, on } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { UserResponseDTO } from "../../../shared/models/User/UserReponseDTO";
import { UserActions } from "../action/user.action";

// Initial state for products
export const initialState: AppState<Pagination<UserResponseDTO>> = {
    data: null,
    loading: false,
    error: null
}

// Reducer for products (fetched from API)
export const userFeature = createFeature(
    {
        name: 'user',
        reducer: createReducer(
            initialState,
            on(UserActions.loadUser, (state) => {
                return {
                    ...state,
                    loading: true
                }
            }),
            on(UserActions.loadUserSuccess, (state, { users }) => {
                return {
                    ...state,
                    loading: false,
                    data: users
                }
            }),
            on(UserActions.loadUserFailure, (state, { error }) => {
                return {
                    ...state,
                    loading: false,
                    error: error
                }
            })
        ),
    }
)
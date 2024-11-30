import { createActionGroup, props } from "@ngrx/store";
import { Pagination } from "../../../shared/models/Pagination/Pagination";
import { UserResponseDTO } from "../../../shared/models/User/UserReponseDTO";

export const UserActions = createActionGroup({
    source: 'user',
    events: {
        'Load User': props<{ pageIndex: number, pageSize: number }>(),
        'Load User Success': props<{ users: Pagination<UserResponseDTO> }>(),
        'Load User Failure': props<{ error: any }>(),
    }
})
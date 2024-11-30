import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../../../shared/services/api/user/user.service";
import { UserActions } from "../action/user.action";

@Injectable()
export class UserEffect {

    loadUser$ = createEffect(() =>
        inject(Actions).pipe(
            ofType(UserActions.loadUser),
            switchMap((arg) =>
                this.userService.getAllUsers(arg.pageIndex, arg.pageSize).pipe(
                    map((users) => UserActions.loadUserSuccess({ users })),
                    catchError((error) => of(UserActions.loadUserFailure({ error })))
                )
            )
        )
    );

    private actions$ = inject(Actions);
    private userService = inject(UserService)

}
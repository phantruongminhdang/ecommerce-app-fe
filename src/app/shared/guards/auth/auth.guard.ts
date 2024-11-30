import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppCookieService } from '../../services/utils/cookie/app-cookie.service';
import { JwtService } from '../../services/utils/jwt/jwt.service';
import { Store } from '@ngrx/store';
import { Profile } from '../../models/Auth/Profile';
import { ProfileActions } from '../../../state/auth/action/profile.action';

export const authGuard: CanActivateFn = (route, state) => {

  const cookie = inject(AppCookieService);
  const router = inject(Router);
  const jwt = inject(JwtService);
  const store = inject(Store);

  if (!cookie.get('token')) {
    router.navigate(['/login']);
    return false;
  } else {
    const jwtPayload = jwt.getDecodedAccessToken(cookie.get('token') as string) || {};
    const profile: Profile = {
      username: (jwtPayload as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      email: (jwtPayload as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      role: (jwtPayload as any)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }
    console.log(profile);

    store.dispatch(ProfileActions.saveProfile({ profile }));

    const isExpired: boolean = jwt.isTokenExpired(jwtPayload);
    if (isExpired == true) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
};

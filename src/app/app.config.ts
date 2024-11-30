import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './shared/interceptors/header-interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productFeature } from './state/product/feature/product.feature';
import { ProductEffect } from './state/product/effect/product.effect';
import { orderFeature } from './state/order/feature/order.feature';
import { userFeature } from './state/user/feature/user.feature';
import { OrderEffect } from './state/order/effect/order.effect';
import { UserEffect } from './state/user/effect/user.effect';
import { profileFeature } from './state/auth/feature/profile.feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr(),
    provideStore(),
    provideState(productFeature),
    provideState(orderFeature),
    provideState(userFeature),
    provideState(profileFeature),
    provideEffects([ProductEffect, OrderEffect, UserEffect])
  ]
};

import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FeatureSettingsService } from './feature-settings.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureGuardService implements CanActivate, CanActivateChild {
  private roleFeatures: any = {};

  constructor(
    private router: Router,
    private featureService: FeatureSettingsService
  ) {}

  // Check if the feature is enabled for the current user role
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkFeatureState(route);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkFeatureState(route);
  }

  private checkFeatureState(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    const feature = route.data['feature'];

    return this.loadFeatures().pipe(
      switchMap(() => {
        if (!this.roleFeatures[feature]) {
          this.router.navigate(['/']);
          return of(false);
        }
        return of(true);
      }),
      catchError((error) => {
        console.error('Error loading features', error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }

  loadFeatures(): Observable<any> {
    return this.featureService.getFeatures('premium-user', 1).pipe(
      tap((features) => {
        this.roleFeatures = features[0].features;
      })
    );
  }
}

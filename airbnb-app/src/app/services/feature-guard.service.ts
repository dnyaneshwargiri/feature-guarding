import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
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

  private checkFeatureState(route: ActivatedRouteSnapshot): boolean {
    const feature = route.data['feature'];
    if (!this.roleFeatures[feature] || !this.roleFeatures[feature].enabled) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  loadFeatures() {
    this.featureService.getFeatures('premium-user').subscribe((features) => {
      this.roleFeatures = features;
    });
  }
}

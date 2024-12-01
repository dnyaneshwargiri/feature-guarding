import { Routes } from '@angular/router';
import { FeatureSettingsComponent } from './feature-settings/feature-settings.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { FeatureGuardService } from './services/feature-guard.service';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'feature-settings', component: FeatureSettingsComponent },
  {
    path: 'advanced-search',
    component: AdvancedSearchComponent,
    canActivate: [FeatureGuardService],
    data: { feature: 'advancedSearch' },
  },
  {
    path: 'property-listing',
    component: PropertyListingComponent,
    canActivate: [FeatureGuardService],
    data: { feature: 'propertyListing' },
  },
  {
    path: 'user-reviews',
    component: UserReviewsComponent,
    canActivate: [FeatureGuardService],
    data: { feature: 'userReviews' },
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

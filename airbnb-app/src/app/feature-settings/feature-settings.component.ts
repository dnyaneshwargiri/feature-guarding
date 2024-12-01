import { Component, OnInit } from '@angular/core';
import { FeatureSettingsService } from '../services/feature-settings.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature-settings',
  templateUrl: './feature-settings.component.html',
  standalone: true,
  styleUrls: ['./feature-settings.component.scss'],
  imports: [FormsModule],
})
export class FeatureSettingsComponent implements OnInit {
  features = {
    advancedSearch: false,
    propertyListing: false,
    userReviews: false,
  };

  constructor(private featureService: FeatureSettingsService) {}
  ngOnInit(): void {}

  saveFeatures() {
    this.featureService.saveFeatures('premium-user', this.features).subscribe({
      next: (response) => {
        console.log('Features saved successfully', response);
      },
      error: (error) => {
        console.error('Error saving features', error);
      },
    });
  }
}

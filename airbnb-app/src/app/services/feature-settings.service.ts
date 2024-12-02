import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureSettingsService {
  private apiUrl = 'http://localhost:3000/features';

  constructor(private http: HttpClient) {}

  // POST request to save features for a role
  saveFeatures(role: string, enabledFeatures: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      id: 1,
      role,
      features: enabledFeatures,
    });
  }

  // GET request to get features for a specific role
  getFeatures(role: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?role=${role}&id=${id}`);
  }
}

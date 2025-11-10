import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientHistoryService {
  getPatientHistory(patientId?: string, filters?: any): Observable<any> {
    return of({ history: [] }).pipe(delay(500));
  }
}
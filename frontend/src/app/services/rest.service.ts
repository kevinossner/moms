import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

export interface Mama {
  id: number;
  first_name: string;
  last_name: string;
  payment_status: boolean;
}

export interface CreateUpdateMama {
  first_name: string;
  last_name: string;
  payment_status: boolean;
}

export interface Appointment {
  id: number;
  name: string;
  date: string;
  registrations: Registration[]
}

export interface CreateAppointment {
  name: string;
  date: string;
}

export interface Registration {
  id: number;
  appointment_id: number;
  mom_id: number;
  mom: Mama;
  attended: boolean;
}

export interface CreateRegistration {
  appointment_id: number;
  mom_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  mainUrl = environment.backendUrl

  getMamas(): Observable<Mama[]> {
    return this.http.get<Mama[]>(`${this.mainUrl}/moms/`);
  }

  getMama(id: number): Observable<Mama> {
    return this.http.get<Mama>(`${this.mainUrl}/moms/${id}`);
  }

  postMama(mama: CreateUpdateMama): Observable<Mama> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Mama>(`${this.mainUrl}/moms/`, mama, httpOptions);
  }

  putMama(id: number, mama: CreateUpdateMama): Observable<Mama> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Mama>(`${this.mainUrl}/moms/${id}`, mama, httpOptions);
  }

  deleteMama(id: number): Observable<Mama> {
    return this.http.delete<Mama>(`${this.mainUrl}/moms/${id}`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.mainUrl}/appointments/`);
  }

  getAppointmentsByDate(date: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.mainUrl}/appointments/${date}`);
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.mainUrl}/appointments/${id}`);
  }

  postAppointment(appointment: CreateAppointment): Observable<Appointment> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Appointment>(`${this.mainUrl}/appointments/`, appointment, httpOptions);
  }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.mainUrl}/registrations/`);
  }

  postRegistration(registration: CreateRegistration): Observable<Registration> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Registration>(`${this.mainUrl}/registrations/`, registration, httpOptions);
  }

  putRegistration(id: number, attended: boolean): Observable<Registration> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Registration>(`${this.mainUrl}/attendance/${id}?attended=${attended}`, httpOptions);
  }

  deleteRegistration(id: number): Observable<Registration> {
    return this.http.delete<Registration>(`${this.mainUrl}/registrations/${id}`);
  }
}

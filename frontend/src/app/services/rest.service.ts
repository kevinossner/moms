import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

export interface Mama {
  id: number;
  first_name: string;
  last_name: string;
}

export interface CreateMama {
  first_name: string;
  last_name: string;
}

export interface Appointment {
  id: number;
  name: string;
  date: string;
}

export interface CreateAppointment {
  name: string;
  date: string;
}


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  mainUrl = environment.backendUrl

  getMamas(): Observable<Mama[]> {
    return this.http.get<Mama[]>(`${this.mainUrl}/mamas/`);
  }

  getMama(id: number): Observable<Mama> {
    return this.http.get<Mama>(`${this.mainUrl}/mamas/${id}`);
  }

  postMama(mama: CreateMama): Observable<Mama> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Mama>(`${this.mainUrl}/mamas/`, mama, httpOptions);
  }

  putMama(id: number, mama: CreateMama): Observable<Mama> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Mama>(`${this.mainUrl}/mamas/${id}`, mama, httpOptions);
  }

  deleteMama(id: number): Observable<Mama> {
    return this.http.delete<Mama>(`${this.mainUrl}/mamas/${id}`);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.mainUrl}/appointments/`);
  }

  postAppointment(appointment: CreateAppointment): Observable<Appointment> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Appointment>(`${this.mainUrl}/appointments/`, appointment, httpOptions);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Pet, PetAction, Species } from '../models/pet';

@Injectable({ providedIn: 'root' })
export class PetService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/pets';

  findAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  findById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/${id}`);
  }

  adopt(name: string, species: Species): Observable<Pet> {
    return this.http.post<Pet>(this.baseUrl, { name, species });
  }

  act(id: number, action: PetAction): Observable<Pet> {
    return this.http.post<Pet>(`${this.baseUrl}/${id}/${action}`, null);
  }

  release(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

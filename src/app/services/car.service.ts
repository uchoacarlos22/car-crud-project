import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({ providedIn: 'root' })
export class CarService {

  // Usa o proxy configurado em proxy.config.json (/api → localhost:3000)
  private url = '/api/cars';

  // inject() substitui injeção via construtor — padrão moderno Angular 14+
  private http = inject(HttpClient);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Retorna todos os carros */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /** Retorna um carro pelo ID */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.url}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /** Cria um novo carro (POST) */
  saveCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url, JSON.stringify(car), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /** Atualiza um carro existente (PUT) */
  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.url}/${car.id}`, JSON.stringify(car), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /** Remove um carro (DELETE) */
  deleteCar(car: Car): Observable<Car> {
    return this.http.delete<Car>(`${this.url}/${car.id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /** Manipulação centralizada de erros HTTP */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro no cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.error('[CarService] Erro:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

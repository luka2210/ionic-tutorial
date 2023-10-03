import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) { }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.httpClient.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  getMovieDetails(id: string) {
    return this.httpClient.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }
}

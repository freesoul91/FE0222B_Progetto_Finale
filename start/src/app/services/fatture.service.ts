import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FattureService {
  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  GetAll(p: number) {
    return this.http.get<any>(
      this.pathApi + '/api/fatture?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  GetById(ID: number) {
    return this.http.get<any>(this.pathApi + '/api/fatture/' + ID);
  }

  GetByCliente(ID: number, p: number) {
    return this.http.get<any>(
      this.pathApi +
        '/api/fatture/cliente/' +
        ID +
        '?page=' +
        p +
        '&size=20&sort=id,ASC'
    );
  }

  Save(id: number, item: any) {
    if (id === 0) {
      return this.http.post<any>(this.pathApi + '/api/fatture', item);
    } else {
      return this.http.put<any>(this.pathApi + '/api/fatture/' + id, item);
    }
  }
  Delete(id: number) {
    return this.http.delete<boolean>(this.pathApi + '/api/fatture/' + id);
  }
}

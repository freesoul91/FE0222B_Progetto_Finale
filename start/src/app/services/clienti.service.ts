import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientiService {
  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  GetAll(p: number) {
    return this.http.get<any>(
      this.pathApi + '/api/clienti?page=' + p + '&size=20&sort=id,ASC'
    );
  }

  GetById(ID: number) {
    return this.http.get<any>(this.pathApi + '/api/clienti/' + ID);
  }

  Save(id: number, item: any) {
    if (!id) {
      return this.http.post<any>(this.pathApi + '/api/clienti', item);
    } else {
      return this.http.put<any>(this.pathApi + '/api/clienti/' + id, item);
    }
  }
  Delete(id: number) {
    return this.http.delete<boolean>(this.pathApi + '/api/clienti/' + id);
  }
  GetTipiClienti() {
    return this.http.get<any>(this.pathApi + '/api/clienti/tipicliente');
  }
}

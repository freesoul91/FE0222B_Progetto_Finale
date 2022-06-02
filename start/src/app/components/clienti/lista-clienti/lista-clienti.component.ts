import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClientiService } from 'src/app/services/clienti.service';
import { Cliente } from 'src/app/models/Cliente';
import { Router } from '@angular/router';
import { FattureService } from '../../../services/fatture.service';

@Component({
  selector: 'app-lista-clienti',
  templateUrl: './lista-clienti.component.html',
  styleUrls: ['./lista-clienti.component.scss'],
})
export class ListaClientiComponent implements OnInit {
  form!: FormGroup;
  page!: number;
  pageSize!: number;
  response: any;
  clienti!: Cliente[];

  constructor(
    private clientiService: ClientiService,
    private fb: FormBuilder,
    private router: Router,
    private fatSrv: FattureService
  ) {}

  ngOnInit() {
    this.Carica();
    this.InizForm();
  }

  Carica() {
    this.clientiService.GetAll(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.clienti = c.content;
    });
  }

  InizForm() {
    this.form = this.fb.group({
      Cerca: new FormControl(),
    });
  }

  CambiaPagina(p: number) {
    this.clientiService.GetAll(p).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.clienti = c.content;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  confirmDelete(name: string, id: number, i: number) {
    if (confirm('Sei sicuro/a di voler eliminare il cliente ' + name + '?')) {
      console.log('Implement delete functionality here');
      this.clientiService.Delete(id).subscribe((c) => {
        console.log(c);
        this.clienti.splice(i, 1);
      });
    }
  }

  fatturC(id: number) {
    this.fatSrv.GetById(id).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.clienti = c.content;
    });
  }
}

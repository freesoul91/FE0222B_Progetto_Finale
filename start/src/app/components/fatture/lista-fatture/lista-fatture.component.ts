import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fattura } from 'src/app/models/Fattura';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-lista-fatture',
  templateUrl: './lista-fatture.component.html',
  styleUrls: ['./lista-fatture.component.scss'],
})
export class ListaFattureComponent implements OnInit {
  idCliente!: number;
  page!: number;
  pageSize!: number;
  response: any;
  fatture!: Fattura[];

  constructor(
    private fattureService: FattureService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idCliente = +params['id'];
      console.log(this.idCliente);
      this.Carica();
    });
  }
  Carica() {
    if (this.idCliente) {
      this.fattureService.GetByCliente(this.idCliente, 0).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.fattureService.GetAll(0).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }

  CambiaPagina(p: number) {
    if (this.idCliente) {
      this.fattureService.GetByCliente(this.idCliente, p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    } else {
      this.fattureService.GetAll(p).subscribe((c) => {
        console.log(c);
        this.response = c;
        this.fatture = c.content;
      });
    }
  }
  counter(i: number) {
    return new Array(i);
  }

  confirmDelete(name: number, id: number, i: number) {
    if (confirm('Sei sicuro/a di voler eliminare la fattura ' + name + '?')) {
      console.log('Implement delete functionality here');
      this.fattureService.Delete(id).subscribe((c) => {
        console.log(c);
        this.fatture.splice(i, 1);
      });
    }
  }
}

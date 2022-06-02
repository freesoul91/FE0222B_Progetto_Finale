import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/Cliente';
import { ClientiService } from '../../../services/clienti.service';
import { Comune } from '../../../models/Comune';
import { ComuniService } from '../../../services/comuni.service';
import { Provincia } from '../../../models/Provincia';
import { ProvinceService } from '../../../services/province.service';

@Component({
  selector: 'app-dettaglio-clienti',
  templateUrl: './dettaglio-clienti.component.html',
  styleUrls: ['./dettaglio-clienti.component.scss'],
})
export class DettaglioClientiComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  cliente!: Cliente;
  province!: Provincia[];
  comuni!: Comune[];
  tipiclienti!: any[];

  constructor(
    private fb: FormBuilder,
    private clientiService: ClientiService,
    private comuniService: ComuniService,
    private provinceService: ProvinceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  cSalva(DatiForm: { value: { indirizzoSedeOperativa: { comune: Comune } } }) {
    console.log(0);
    console.log(DatiForm.value);

    this.comuni.forEach((item) => {
      if (item.id == DatiForm.value.indirizzoSedeOperativa.comune.id) {
        DatiForm.value.indirizzoSedeOperativa.comune = item;
      }
    });
    console.log(DatiForm.value);

    this.clientiService.Save(this.id, DatiForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/clienti']);
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.InizForm();
      this.Carica();
    });
  }

  InizForm() {
    this.form = this.fb.group({
      ragioneSociale: new FormControl('', [Validators.required]),
      partitaIva: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tipoCliente: new FormControl('', [Validators.required]),
      pec: new FormControl(''),
      telefono: new FormControl(''),
      nomeContatto: new FormControl(''),
      cognomeContatto: new FormControl(''),
      telefonoContatto: new FormControl(''),
      emailContatto: new FormControl('', [Validators.required]),
      indirizzoSedeOperativa: this.fb.group({
        via: new FormControl(''),
        civico: new FormControl(''),
        cap: new FormControl(''),
        localita: new FormControl(''),
        comune: this.fb.group({
          id: new FormControl('', Validators.required),
          nome: '',
          provincia: {},
        }),
      }),
    });
  }

  Carica() {
    if (this.id !== 0) {
      this.clientiService.GetById(this.id).subscribe((data) => {
        console.log(data);
        this.cliente = data;
        this.form.patchValue({
          ragioneSociale: this.cliente.ragioneSociale,
          partitaIva: this.cliente.partitaIva,
          email: this.cliente.email,
          tipoCliente: this.cliente.tipoCliente,
          pec: this.cliente.pec,
          telefono: this.cliente.telefono,
          nomeContatto: this.cliente.nomeContatto,
          cognomeContatto: this.cliente.cognomeContatto,
          telefonoContatto: this.cliente.telefonoContatto,
          emailContatto: this.cliente.emailContatto,
          indirizzoSedeOperativa: {
            via: this.cliente.indirizzoSedeOperativa.via,
            civico: this.cliente.indirizzoSedeOperativa.civico,
            cap: this.cliente.indirizzoSedeOperativa.cap,
            localita: this.cliente.indirizzoSedeOperativa.localita,
          },
        });
      });
    }
    this.provinceService
      .GetAll(0)
      .subscribe((res) => (this.province = res.content));
    this.comuniService
      .GetAll(0)
      .subscribe((res) => (this.comuni = res.content));
    this.clientiService
      .GetTipiClienti()
      .subscribe((res) => (this.tipiclienti = res));
  }
}

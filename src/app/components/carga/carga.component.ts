import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];
  listaDocumentos = [
    "Identificacion Oficial Vigente",
    "Comprobante de Domicilio Vigente",
    "Copia de la Cédula Vigente",
    "RFC",
    "Acta Constitutiva (Persona Moral)",
    "Poderes de Representante Legal (Persona Moral)"
  ]

  constructor(private _cargaImagenes: CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes(): void {
    this._cargaImagenes.cargarImagenFirebase( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }


}

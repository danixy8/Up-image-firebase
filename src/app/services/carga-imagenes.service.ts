import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private fb: AngularFirestore, private storage: AngularFireStorage) { }

  cargarImagenFirebase( imagenes: FileItem[] ) {
    console.log( imagenes );

    for (const item of imagenes) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const file = item.archivo;
      const filePath = `${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`;
      const fileRef = this.storage.ref( filePath );
      const uploadTask = this.storage.upload(filePath, file)

      uploadTask.percentageChanges().subscribe(res => item.progreso = res || 0);
      uploadTask.snapshotChanges().pipe(
        finalize(
          () => fileRef.getDownloadURL().subscribe( url => {
            console.log('Imagen cargada con exito');
            item.url = url;
            item.estaSubiendo = false;
            this.guardarImagen ({
              nombre: item.nombreArchivo,
              url: item.url
            });
          })
        )
      ).subscribe();

    }

  }

  private guardarImagen( imagen: { nombre: string, url: string } ){

    this.fb.collection(`/${this.CARPETA_IMAGENES}`)
      .add( imagen );

  }

}

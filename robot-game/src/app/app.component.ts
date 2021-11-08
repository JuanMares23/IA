import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'robot-game';
  //tablero
  tablero:Casillas[];
  paredes:number[];
  //posiciones
  posicionInicial: number;
  posicionMeta: number;

  nodosAbiertos: number[] = [];
  nodosCerrados: number[] = [];

  resultTime: String[] = ["0","0","0","0"]; 
  speed:number = 0;

  constructor() { 
    this.posicionInicial = 0;
    this.posicionMeta  = 99;
    this.tablero = []
    this.paredes = [11,21,31,41,51,18,28,38,48,24,25,44,63,64,65,67,77,87,97];
  }

  ngOnInit(): void {
    this.generaTablero();
    console.log(this.tablero);
  }

   sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async Profundidad(){
    this.nodosAbiertos = [];
    this.nodosCerrados = [];
    let auxPosition = this.posicionInicial;
    let aux: number = 0;
    let count = 0;

    this.nodosAbiertos.push(this.posicionInicial);

    while(this.nodosAbiertos[0] != this.posicionMeta){

      await this.sleep(this.speed);
      count = 0;
      aux = this.dafaulValue( this.nodosAbiertos.shift());

      this.tablero[aux].casillasEnlazadas.forEach(e => {
        if(!this.nodosCerrados.includes(e) && !this.nodosAbiertos.includes(e)){
          count++;
          this.nodosAbiertos.unshift(e);
        }
      });

      this.nodosCerrados.push(aux);
      
      if(count === 0){
        await this.calculaDistancia(this.nodosAbiertos[0]);
      }

      this.posicionInicial = this.nodosAbiertos[0];
    }
    this.posicionInicial = auxPosition;
  }

  async amplitud(){
    this.nodosAbiertos = [];
    this.nodosCerrados = [];
    let auxPosition = this.posicionInicial;
    let aux:number = 0;

    //Almacenan el inicial
    this.nodosAbiertos.push(this.posicionInicial);
    //Si el primer elemento en diferente al meta
    while(this.nodosAbiertos[0] != this.posicionMeta){
      
      await this.sleep(this.speed);
      //Se almancen los hijos al final del array
      this.tablero[this.nodosAbiertos[0]].casillasEnlazadas.forEach(e => {
        if(!this.nodosCerrados.includes(e) && !this.nodosAbiertos.includes(e)){
          this.nodosAbiertos.push(e);
        }
      });
      //Se agrega a nodos cerrados el primero elemento en nodos abiertos y es removido
      aux = this.dafaulValue(this.nodosAbiertos.shift());
      this.nodosCerrados.push(aux);

      await this.calculaDistancia(auxPosition);
      await this.calculaDistancia(this.nodosAbiertos[0]);

      //posicion inicial toma el valor del primero hijo 
      this.posicionInicial = this.nodosAbiertos[0];
    }
    this.posicionInicial = auxPosition;
  }

  async primeroMejor(){
    this.nodosAbiertos = [];
    this.nodosCerrados = [];
    let auxPosition = this.posicionInicial;

    //Obtiene enlaces de posicion inicial
    this.tablero[this.posicionInicial].casillasEnlazadas.map(e => this.nodosAbiertos.push(e));

    while(this.posicionInicial != this.posicionMeta){

      await this.sleep(this.speed);
      this.nodosCerrados.push( this.posicionInicial);

      this.nodosAbiertos.forEach(e => {
        if(this.nodosCerrados.includes(e)){
          let index = this.nodosAbiertos.indexOf(e);
          this.nodosAbiertos.splice(index,1);
        }
        });

      
      //Determina la hueristica de los enlaces
      let heuristica: number = 200;
      this.restaValores(this.tablero[this.posicionInicial].casillasEnlazadas).map(e => {
        if(!this.nodosCerrados.includes(e.indice)){
          if( heuristica === 200)
            heuristica =  e.indice;
          this.nodosAbiertos.push(e.indice);
        }
        
      });

       if(heuristica === 200){
         heuristica = this.dafaulValue(this.nodosAbiertos.shift());
       }

      this.posicionInicial = heuristica;
    }
    this.posicionInicial = auxPosition;

  }

   async Aasterisco(objetivo: number){
    let distanciaH = this.tablero[objetivo].filaH - this.tablero[this.posicionInicial].filaH;
    let distanciaV =  this.tablero[objetivo].filaV - this.tablero[this.posicionInicial].filaV;

    while(this.posicionInicial != objetivo){

      distanciaH = this.tablero[objetivo].filaH - this.tablero[this.posicionInicial].filaH;
      distanciaV =  this.tablero[objetivo].filaV - this.tablero[this.posicionInicial].filaV

      if(distanciaV != 0){
        if(this.tablero[this.posicionInicial + (distanciaV/ Math.abs(distanciaV))].isPared){
          await this.calculaDistancia(this.posicionInicial -10);
        }else{
          this.posicionInicial += (distanciaV/ Math.abs(distanciaV));
        }
      }else{
        if(distanciaH != 0){
          if(this.tablero[this.posicionInicial +(distanciaH*10)  / Math.abs(distanciaH)].isPared){
            if(!this.tablero[objetivo-1].isPared){
              await this.calculaDistancia(objetivo-1);
            }else if(!this.tablero[objetivo+1].isPared){
              await this.calculaDistancia(objetivo+1);
            }
          }else{
            this.posicionInicial += (distanciaH*10)  / Math.abs(distanciaH);
          }
        }
      } 

      await this.sleep(20);
    }
      
  }

  restaValores(indiceEnlaces: number[]):indiceValor[]{
    let nuevosEnlaces:indiceValor[] = [];
    indiceEnlaces.forEach(e => nuevosEnlaces.push( { indice:e,valor:Math.abs(e-this.posicionMeta)}));
    return nuevosEnlaces.sort((a,b) => a.valor-b.valor);
  }

  async todos(){
    let dateInicial;
    let dateFinal;

    dateInicial = Date.now();
    await this.amplitud();
    dateFinal = Date.now();
    this.ingresaDate(dateInicial, dateFinal, 0);
    dateInicial = Date.now();
    await this.Profundidad();
    dateFinal = Date.now();
    this.ingresaDate(dateInicial, dateFinal, 1);
    dateInicial = Date.now();
    await this.primeroMejor();
    dateFinal= Date.now();
    this.ingresaDate(dateInicial, dateFinal, 2);
    dateInicial = Date.now();
    await this.Aasterisco(this.posicionMeta);
    dateFinal = Date.now();
    this.ingresaDate(dateInicial, dateFinal, 3);
  }

  ingresaDate(inicial: number, final: number, position: number){
    let time = final - inicial;
    this.resultTime[position] = time.toString();
  }

  async calculaDistancia(objetivo: number){
    let distanciaH = this.tablero[objetivo].filaH - this.tablero[this.posicionInicial].filaH;
    let distanciaV =  this.tablero[objetivo].filaV - this.tablero[this.posicionInicial].filaV;
    let orientaH: boolean = false;

    while(this.posicionInicial != objetivo){

      distanciaH = this.tablero[objetivo].filaH - this.tablero[this.posicionInicial].filaH;
      distanciaV =  this.tablero[objetivo].filaV - this.tablero[this.posicionInicial].filaV

      if(distanciaV != 0){
        if(this.tablero[this.posicionInicial + (distanciaV/ Math.abs(distanciaV))].isPared){
          await this.calculaDistancia(this.posicionInicial +  (distanciaH  *10));
        }else{
          this.posicionInicial += (distanciaV/ Math.abs(distanciaV));
        }
      }else{
        if(distanciaH != 0){
          if(this.tablero[this.posicionInicial +(distanciaH*10)  / Math.abs(distanciaH)].isPared){
            if(!this.tablero[objetivo-1].isPared){
              await this.calculaDistancia(objetivo-1);
            }else if(!this.tablero[objetivo+1].isPared){
              await this.calculaDistancia(objetivo+1);
            }
          }else{
            this.posicionInicial += (distanciaH*10)  / Math.abs(distanciaH);
          }
        }
      } 

      await this.sleep(50);
    }
      
  }

  dafaulValue(cantidad: number | undefined) :number{
    if(cantidad)
      return cantidad;
    return 0;
  }

  generaTablero() {
  //GENERO CASILLAS
  for(let i = 0 ; i <100; i++){
    this.tablero.push(new Casillas());
  }

  let filaV = 0;
  let filaH = 0;
  //ASIGNO VALORES TODO EL TABLERO
  for(let i = 0 ; i <100; i++){
    this.tablero[i].indice = i;
    this.tablero[i].isPared = this.paredes.includes(i);
    this.tablero[i].filaV = filaV;
    this.tablero[i].filaH = filaH;
    if(filaV === 9){
      filaV = 0;
      filaH++;
    }else{
    filaV++;
    }
  }
  //ASIGNO ENLACES VETICALES
  let corte = 0;
  for(let i = 0 ; i <100; i++){

    if(i === 99)
      break;;

    if(corte === 9){
      corte = 0;
      continue;
    }
    corte++;
    
    if(this.tablero[i+1].isPared || this.tablero[i].isPared)
    continue;
    
    this.tablero[i].addEnlace(i+1);
    this.tablero[i+1].addEnlace(i);
  }
  //GENERA ENLACES HORIZONTALES
  for (let i = 0; i <90; i++) {

    if(this.tablero[i+10].isPared || this.tablero[i].isPared)
      continue;
    
    this.tablero[i].addEnlace(i+10);
    this.tablero[i+10].addEnlace(i);
  }

}

}

class Casillas{

  indice: number = 0; 
  casillasEnlazadas:number[] = [];
  isPared: boolean = false;
  filaH: number = 0;
  filaV: number = 0;

  Casillas(){
    this.indice =0; 
    this.casillasEnlazadas = [];
    this.isPared = false;
    this.filaH = 0;
    this.filaV = 0;
  }

  addEnlace (indiceEnlace: number){
    this.casillasEnlazadas.push(indiceEnlace);
  }
  get casilllasEnlazadasg(): number[]{
    return this.casillasEnlazadas;
  }

}

 interface indiceValor{
  indice: number,
  valor: number
}

interface camino{
  valorHorizontal : number,
  valorVertical: number
}

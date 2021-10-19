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

  resultTime: number[] = [0,0,0,0]; 

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

    console.log(this.posicionMeta, this.posicionInicial);
    this.tablero[this.posicionInicial].casillasEnlazadas.map(e => this.nodosAbiertos.push(e));

    while(this.posicionInicial != this.posicionMeta){
      await this.sleep(1000);
      this.nodosCerrados.push( this.posicionInicial);

      console.log(this.nodosCerrados);

      this.posicionInicial = this.dafaulValue(this.nodosAbiertos.shift());
      console.log(this.posicionInicial, this.posicionMeta);

      let aux = this.tablero[this.posicionInicial].casillasEnlazadas.length;
      if(aux === 0)
        continue;
      for(let i= aux-1; i >= 0; i--){
        if( this.nodosCerrados.includes(this.tablero[this.posicionInicial].casillasEnlazadas[i]))
          continue;
        this.nodosAbiertos.unshift(this.tablero[this.posicionInicial].casillasEnlazadas[i]);
      }
      console.log(this.nodosAbiertos);
    }
    console.log('fue encontrado en '+ this.posicionInicial);
  }

  async amplitud(){
    this.nodosAbiertos = [];
    this.nodosCerrados = [];

    console.log(this.posicionMeta, this.posicionInicial);
    //Obtiene enlaces de posicion inicial
    this.tablero[this.posicionInicial].casillasEnlazadas.map(e => this.nodosAbiertos.push(e));

    while(this.posicionInicial != this.posicionMeta){

      await this.sleep(1000);
      this.nodosCerrados.push( this.posicionInicial);

      console.log(this.nodosCerrados);
      //Posicion inicial toma el valor del primer nodo abierto en la pila
      this.posicionInicial = this.dafaulValue(this.nodosAbiertos.shift());
      console.log(this.posicionInicial, this.posicionMeta);
      //Toma el valor de la cantidad de enlaces de la casilla
      let aux = this.tablero[this.posicionInicial].casillasEnlazadas.length;
      if(aux === 0)
        continue;
      for(let i= aux-1; i >= 0; i--){
        if( this.nodosCerrados.includes(this.tablero[this.posicionInicial].casillasEnlazadas[i]))
          continue;
        this.nodosAbiertos.push(this.tablero[this.posicionInicial].casillasEnlazadas[i]);
      }
      console.log(this.nodosAbiertos);
    }
    console.log('fue encontrado en '+ this.posicionInicial);

  }

  async primeroMejor(){
    this.nodosAbiertos = [];
    this.nodosCerrados = [];

    //Obtiene enlaces de posicion inicial
    this.tablero[this.posicionInicial].casillasEnlazadas.map(e => this.nodosAbiertos.push(e));

    while(this.posicionInicial != this.posicionMeta){

      await this.sleep(1000);
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
    console.log('fue encontrado en '+ this.posicionInicial);

  }

    async Aasterisco(){
    this.nodosAbiertos = [];
    this.nodosCerrados = [];
    let baderaH: Boolean = false;
    let banderaV: Boolean = false;

    //Obtiene enlaces de posicion inicial
    this.tablero[this.posicionInicial].casillasEnlazadas.map(e => this.nodosAbiertos.push(e));

    while(this.posicionInicial != this.posicionMeta){

      await this.sleep(1000);
      this.nodosCerrados.push( this.posicionInicial);

      
      //Determina la hueristica de los enlaces
      let heuristica: number = 200;
      let enlacesClean: number[] = []
      this.tablero[this.posicionInicial].casillasEnlazadas.forEach(e => {
        if(!this.nodosCerrados.includes(e))
          enlacesClean.push(e);
      })

      this.getPredictivilidad(enlacesClean).map(e => {
        if(!this.nodosCerrados.includes(e.indiceResult)){
          if( heuristica === 200 && e.indiceResult)
            heuristica =  e.indiceResult;
          this.nodosAbiertos.push(e.indiceResult);
        }
        
      });

       if(heuristica === 200){
         heuristica = this.dafaulValue(this.nodosAbiertos.shift());
       }

      this.posicionInicial = heuristica;
    }
    console.log('fue encontrado en '+ this.posicionInicial);

  }

  restaValores(indiceEnlaces: number[]):indiceValor[]{
    let nuevosEnlaces:indiceValor[] = [];
    indiceEnlaces.forEach(e => nuevosEnlaces.push( { indice:e,valor:Math.abs(e-this.posicionMeta)}));
    return nuevosEnlaces.sort((a,b) => a.valor-b.valor);
  }
  

  getPredictivilidad(enlaces:number[]){
    
    let plV: number[] = [0,5,0,1,3,2,0,4,4,0];
    let plH: number[] = [0,2,4,2,3,1,4,1,1,1];

    let positionH: number = Math.floor(this.posicionInicial / 10);
    
    let casillasAvanzar:number = Math.floor( this.posicionMeta / 10);

    let caminosPosibles : camino[] = []; 

    let v: number = 0;


      caminosPosibles.push({valorHorizontal: plH[positionH], valorVertical: plV[casillasAvanzar],indiceResult: enlaces[0], valorFinal: plH[positionH] + plV[casillasAvanzar]});
      
      
      caminosPosibles.push({valorHorizontal: plH[casillasAvanzar], valorVertical: plV[positionH],indiceResult: enlaces[1], valorFinal: plH[casillasAvanzar] + plV[positionH]});
    
    

    return caminosPosibles.sort((a,b) => a.valorFinal - b.valorFinal);

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

  //ASIGNO VALORES TODO EL TABLERO
  for(let i = 1 ; i <100; i++){

    this.tablero[i].indice = i;
    this.tablero[i].isPared = this.paredes.includes(i);
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

  Casillas(){
    this.indice =0; 
    this.casillasEnlazadas = [];
    this.isPared = false;
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
  valorVertical: number,
  indiceResult: number,
  valorFinal: number,
}

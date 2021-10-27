package proyecto.herramientas;

import proyecto.entidades.Tablero;
import java.util.ArrayList;

public class NodoA {

    private Tablero tablero;
    private ArrayList<NodoA> hijos;
    private int aptitud, jugada;

    public NodoA(Tablero tablero, int jugada) {
        this.tablero = tablero;
        this.jugada = jugada;
    }

    public void generarHijos(String jugador) {
        hijos = new ArrayList<>(3);
        Tablero tablero1, tablero2, tablero3;
        NodoA aux;
        if(!tablero.columnaLlena(0)) {
            tablero1 = tablero.clonar();
            tablero1.colocarFicha(0, jugador);
            aux = new NodoA(tablero1, 0);
            hijos.add(aux);
        }
        if(!tablero.columnaLlena(1)) {
            tablero2 = tablero.clonar();
            tablero2.colocarFicha(1, jugador);
            aux = new NodoA(tablero2, 1);
            hijos.add(aux);
        }
        if(!tablero.columnaLlena(2)) {
            tablero3 = tablero.clonar();
            tablero3.colocarFicha(2, jugador);
            aux = new NodoA(tablero3, 2);
            hijos.add(aux);
        }
    }

    public int getMin() {
        int min = 999, aux;
        for(int i = 0 ; i < hijos.size() ; i++) {
            aux = hijos.get(i).getTablero().calcularAptitud();
            min = ( aux < min) ? aux : min;
        }
        return min;
    }

    public NodoA getMax() {
        int max = -1000, aux;
        NodoA nodoAux = null;
        for(int i = 0 ; i < hijos.size() ; i++) {
            aux = hijos.get(i).getAptitud();
            if(aux > max) {
                max = aux;
                nodoAux = hijos.get(i);
            }
        }
        return nodoAux;
    }

    public void limpiarHijos() {
        hijos.clear();
    }

    public Tablero getTablero() {
        return tablero;
    }

    public void setJugada(int jugada) {
        this.jugada = jugada;
    }

    public int getJugada() {
        return jugada;
    }

    public void setAptitud(int aptitud) {
        this.aptitud = aptitud;
    }

    public int getAptitud() {
        return aptitud;
    }

    public ArrayList<NodoA> getHijos() {
        return hijos;
    }
}
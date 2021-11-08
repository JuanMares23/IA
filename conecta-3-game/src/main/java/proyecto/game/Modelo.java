package proyecto.game;

import proyecto.entidades.Tablero;
import proyecto.herramientas.NodoA;

public class Modelo {

    private NodoA nodoActual;

    public Modelo() {
        nodoActual = new NodoA(new Tablero(), -1);
    }

    public void jugar(int columna) {
        nodoActual.getTablero().colocarFicha(columna, "Blanco");
    }

    public int jugarIA() {
        if(ganador("Blanco") || nodoActual.getTablero().tableroLleno())
            return 0;
        nodoActual.generarHijos("Negro");
        NodoA aux;
        for(int i = 0 ; i < nodoActual.getHijos().size() ; i++) {
            aux = nodoActual.getHijos().get(i);
            aux.generarHijos("Blanco");
            aux.setAptitud(aux.getMin());
        }
        nodoActual = nodoActual.getMax();
        nodoActual.limpiarHijos();
        return nodoActual.getJugada();
    }

    public boolean ganador(String jugador) {
        return nodoActual.getTablero().ganador(jugador);
    }

    public boolean columnaLlena(int columna) {
        return nodoActual.getTablero().columnaLlena(columna);
    }
}

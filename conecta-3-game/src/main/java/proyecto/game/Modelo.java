package proyecto.game;

import proyecto.entidades.Tablero;
import proyecto.herramientas.NodoA;

public class Modelo {

    private NodoA nodoActual;

    public Modelo() {
        nodoActual = new NodoA(new Tablero(), -1);
    }

    public int jugar(int columna) {
        System.out.println();
        nodoActual.getTablero().colocarFicha(columna, "Blanco");
        nodoActual.generarHijos("Negro");
        for(int i = 0 ; i < nodoActual.getHijos().size() ; i++) {
            nodoActual.getHijos().get(i).generarHijos("Blanco");
            nodoActual.getHijos().get(i).setAptitud(nodoActual.getHijos().get(i).getMin());
        }
        System.out.println(nodoActual);
        System.out.println(nodoActual.getHijos());
        nodoActual = nodoActual.getMax();
        System.out.println(nodoActual);
        System.out.println(nodoActual.getTablero());
        nodoActual.limpiarHijos();

        return nodoActual.getJugada();
    }
}

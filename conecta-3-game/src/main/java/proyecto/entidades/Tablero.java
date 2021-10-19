package proyecto.entidades;

public class Tablero {

    String [][] posiciones;

    public Tablero() {
        posiciones = new String[3][3];
        for(int i = 0 ; i < posiciones.length ; i++)
            for(int j = 0 ; j < posiciones[i].length ; j++)
                posiciones[i][j] = "";
    }

    public Tablero(String [][] posiciones) {
        this.posiciones = posiciones;
    }

    public void colocarFicha(int columna, String jugador) {
        System.out.println(jugador + "-------" + columna);
        if(posiciones[2][columna] == "") {
            posiciones[2][columna] = jugador;
            System.out.println("holaaaaaaaaaaaaaaaaaaaaaaa");
            return;
        }
        if(posiciones[1][columna] == "") {
            posiciones[1][columna] = jugador;
            return;
        }
        posiciones[0][columna] = jugador;
    }

    public boolean columnaLlena(int columna) {
        return posiciones[0][columna] != "";
    }

    public boolean tableroLleno() {
        return columnaLlena(0) && columnaLlena(1) && columnaLlena(2);
    }

    public boolean renglonDisponible(int renglon, String jugador) {
        return (posiciones[renglon][0] == "" || posiciones[renglon][0].compareTo(jugador) == 0) &&
                (posiciones[renglon][1] == "" || posiciones[renglon][1].compareTo(jugador) == 0) &&
                (posiciones[renglon][2] == "" || posiciones[renglon][2].compareTo(jugador) == 0);
    }

    public boolean columnaDisponible(int columna, String jugador) {
        return (posiciones[0][columna] == "" || posiciones[0][columna].compareTo(jugador) == 0) &&
                (posiciones[1][columna] == "" || posiciones[1][columna].compareTo(jugador) == 0) &&
                (posiciones[2][columna] == "" || posiciones[2][columna].compareTo(jugador) == 0);
    }

    public boolean diagonalUnoDisponible(String jugador) {
        return (posiciones[0][0] == "" || posiciones[0][0].compareTo(jugador) == 0) &&
                (posiciones[1][1] == "" || posiciones[1][1].compareTo(jugador) == 0) &&
                (posiciones[2][2] == "" || posiciones[2][2].compareTo(jugador) == 0);
    }

    public boolean diagonalDosDisponible(String jugador) {
        return (posiciones[0][2] == "" || posiciones[0][2].compareTo(jugador) == 0) &&
                (posiciones[1][1] == "" || posiciones[1][1].compareTo(jugador) == 0) &&
                (posiciones[2][0] == "" || posiciones[2][0].compareTo(jugador) == 0);
    }

    public int calcularAptitud() {
        int aptitud = 0;
        if(ganador("Negro"))
            return 999;
        if(ganador("Blanco"))
            return -999;
        for(int i = 0 ; i < 3 ; i++){
            aptitud = columnaDisponible(i, "Negro") ? aptitud++ : aptitud;
            aptitud = renglonDisponible(i, "Negro") ? aptitud++ : aptitud;
        }
        aptitud = diagonalDosDisponible("Negro") ? aptitud++ : aptitud;
        aptitud = diagonalUnoDisponible("Negro") ? aptitud++ : aptitud;

        for(int i = 0 ; i < 3 ; i++){
            aptitud = columnaDisponible(i, "Blanco") ? aptitud-- : aptitud;
            aptitud = renglonDisponible(i, "Blanco") ? aptitud-- : aptitud;
        }
        aptitud = diagonalDosDisponible("Blanco") ? aptitud-- : aptitud;
        aptitud = diagonalUnoDisponible("Blanco") ? aptitud-- : aptitud;

        return aptitud;
    }

    public boolean ganador(String jugador){
        for(int i = 0 ; i < 3 ; i++)
            if((posiciones[i][0].compareTo(jugador) == 0 && posiciones[i][1].compareTo(jugador) == 0 && posiciones[i][2].compareTo(jugador) == 0)
                    || (posiciones[0][i].compareTo(jugador) == 0 && posiciones[1][i].compareTo(jugador) == 0 && posiciones[2][i].compareTo(jugador) == 0))
                return true;
        return ((posiciones[0][0].compareTo(jugador) == 0 && posiciones[1][1].compareTo(jugador) == 0 && posiciones[2][2].compareTo(jugador) == 0)
                || (posiciones[2][0].compareTo(jugador) == 0 && posiciones[1][1].compareTo(jugador) == 0 && posiciones[0][2].compareTo(jugador) == 0));
    }

    public Tablero clonar() {
        String [][] auxiliar = new String[3][3];
        for(int i = 0 ; i < posiciones.length ; i++)
            for(int j = 0; j < posiciones.length; j++)
                auxiliar[i][j] = posiciones[i][j] + "";
        return new Tablero(auxiliar);
    }

    @Override
    public String toString() {
        String impresion = "[";
        for(int i = 0 ; i < posiciones.length ; i++) {
            impresion += " [ ";
            for (int j = 0; j < posiciones.length; j++) {
                impresion += posiciones[i][j];
                if(j == 2)
                    break;
                impresion += ",";
            }
            impresion += " ] ";
        }
        return impresion += "]";
    }
}
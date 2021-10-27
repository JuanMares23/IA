package proyecto.game;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import proyecto.herramientas.Alertas;

public class Controller {

    @FXML
    private Button btn1;

    @FXML
    private Button btn2;

    @FXML
    private Button btn3;

    @FXML
    private Button btn4;

    @FXML
    private Button btn5;

    @FXML
    private Button btn6;

    @FXML
    private Button btn7;

    @FXML
    private Button btn8;

    @FXML
    private Button btn9;

    @FXML
    private Button btnPrimer;

    @FXML
    private Button btnMedio;

    @FXML
    private Button btnUltimo;

    private Modelo modelo;

    @FXML
    public void initialize() {
        this.modelo = new Modelo();
    }

    @FXML
    void colocarFichaColumnaPrimer(ActionEvent event) {
        botonDisponible(0, "-fx-border-color: #0377fc; -fx-background-color: #FFFFFF;");
        modelo.jugar(0);
        mensajeGanador("Blanco");
        botonDisponible(modelo.jugarIA(), "-fx-border-color: #0377fc; -fx-background-color: #000000;");
        mensajeGanador("Negro");
        columnaLlena();
    }

    @FXML
    void colocarFichaColumnaMedio(ActionEvent event) {
        botonDisponible(1, "-fx-border-color: #0377fc; -fx-background-color: #FFFFFF;");
        modelo.jugar(1);
        mensajeGanador("Blanco");
        botonDisponible(modelo.jugarIA(), "-fx-border-color: #0377fc; -fx-background-color: #000000;");
        mensajeGanador("Negro");
        columnaLlena();
    }

    @FXML
    void colocarFichaUltimaColumna(ActionEvent event) {
        botonDisponible(2, "-fx-border-color: #0377fc; -fx-background-color: #FFFFFF;");
        modelo.jugar(2);
        mensajeGanador("Blanco");
        botonDisponible(modelo.jugarIA(), "-fx-border-color: #0377fc; -fx-background-color: #000000;");
        mensajeGanador("Negro");
        columnaLlena();
    }

    public void mensajeGanador(String jugador) {
        if(!modelo.ganador(jugador))
            return;
        Alertas.creaAlerta("Ganador", "El ganador del juego es el " + (jugador.compareTo("Blanco") == 0 ? "jugador" : "agente"), Alert.AlertType.INFORMATION);
        btnPrimer.setDisable(true);
        btnMedio.setDisable(true);
        btnUltimo.setDisable(true);
    }

    public void columnaLlena() {
        if(modelo.columnaLlena(0))
            btnPrimer.setDisable(true);
        if(modelo.columnaLlena(1))
            btnMedio.setDisable(true);
        if(modelo.columnaLlena(2))
            btnUltimo.setDisable(true);
    }

    public void botonDisponible(int columna, String color) {
        switch(columna) {
            case 0:
                if(btn7.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn7.setStyle(btn7.getStyle() + color);
                else if(btn4.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn4.setStyle(btn4.getStyle() + color);
                else if(btn1.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn1.setStyle(btn1.getStyle() + color);
                break;

            case 1:
                if(btn8.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn8.setStyle(btn8.getStyle() + color);
                else if(btn5.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn5.setStyle(btn5.getStyle() + color);
                else if(btn2.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn2.setStyle(btn2.getStyle() + color);
                break;

            case 2:
                if(btn9.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn9.setStyle(btn9.getStyle() + color);
                else if(btn6.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn6.setStyle(btn6.getStyle() + color);
                else if(btn3.getStyle().compareTo("-fx-border-color: #0377fc; -fx-background-color: #CFBEA7;") == 0)
                    btn3.setStyle(btn3.getStyle() + color);
                break;
        }
    }
}
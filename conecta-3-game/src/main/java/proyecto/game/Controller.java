package proyecto.game;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

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
        botonDisponible(modelo.jugar(0), "-fx-border-color: #0377fc; -fx-background-color: #000000;");
    }

    @FXML
    void colocarFichaColumnaMedio(ActionEvent event) {
        botonDisponible(1, "-fx-border-color: #0377fc; -fx-background-color: #FFFFFF;");
        botonDisponible(modelo.jugar(1), "-fx-border-color: #0377fc; -fx-background-color: #000000;");
    }

    @FXML
    void colocarFichaUltimaColumna(ActionEvent event) {
        botonDisponible(2, "-fx-border-color: #0377fc; -fx-background-color: #FFFFFF;");
        botonDisponible(modelo.jugar(2), "-fx-border-color: #0377fc; -fx-background-color: #000000;");
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
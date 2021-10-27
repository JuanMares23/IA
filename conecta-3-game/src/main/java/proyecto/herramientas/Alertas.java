package proyecto.herramientas;

import javafx.scene.control.Alert;

public class Alertas {
    public static void creaAlerta(String Title, String content, Alert.AlertType alertType) {
        Alert a=new Alert(alertType);
        a.setHeaderText(null);
        a.setContentText(content);
        a.setTitle(Title);
        a.showAndWait();
    }
}
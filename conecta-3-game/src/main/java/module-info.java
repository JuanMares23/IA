module proyecto.game {
    requires javafx.controls;
    requires javafx.fxml;


    opens proyecto.game to javafx.fxml;
    exports proyecto.game;
}
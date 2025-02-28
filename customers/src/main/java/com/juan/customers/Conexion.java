package com.juan.customers;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Conexion {

    private static Conexion instance;

    private String username;
    private String password;


    private Conexion() {}

    public static Conexion getInstance() {
        if (instance == null) {
            instance = new Conexion();
        }
        return instance;
    }
}

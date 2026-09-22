package com.official.portfolio;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String URL =
            "jdbc:mysql://centerbeam.proxy.rlwy.net:38257/railway?useSSL=true&serverTimezone=UTC";

    private static final String USER = "root";

    private static final String PASSWORD =
            "DB-PASSWORD";

    public static Connection getConnection() throws SQLException {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException(
                    "MySQL JDBC Driver not found. Check mysql-connector-j-8.4.0.jar",
                    e
            );
        }

        return DriverManager.getConnection(
                URL,
                USER,
                PASSWORD
        );
    }
}
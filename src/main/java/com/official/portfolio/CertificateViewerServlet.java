package com.official.portfolio;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet("/save-certificate-viewer")
public class CertificateViewerServlet extends HttpServlet {

    private static final String SQL =
            "INSERT INTO certificate_viewer (name, gender) VALUES (?, ?)";

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String name = request.getParameter("name");
        String gender = request.getParameter("gender");

        if (name == null || name.trim().isEmpty()
                || gender == null || gender.trim().isEmpty()) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Name and gender are required.");
            return;
        }

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement statement =
                     connection.prepareStatement(SQL)) {

            statement.setString(1, name.trim());
            statement.setString(2, gender.trim());

            statement.executeUpdate();

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("SUCCESS");

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            response.getWriter().write(
                    "Database error: " + e.getMessage()
            );
        }
    }
}
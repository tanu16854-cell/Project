import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String fullname = request.getParameter("fullname");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            // Load JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to DB
            Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/Online_Examination_System", "root", "mysql");

            // Check if username exists
            String checkQuery = "SELECT * FROM users WHERE username = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkQuery);
            checkStmt.setString(1, username);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next()) {
                // Username already exists
                out.println("<html><head><title>Registration</title>");
                out.println("<meta http-equiv='refresh' content='3; URL=register.html'>");
                out.println("<link rel='stylesheet' href='css/styles.css'>");
                out.println("</head><body>");
                out.println(
                        "<h3 style='color: red;'>Username already exists! Redirecting back to Registration Page...</h3>");
                out.println("</body></html>");
            } else {
                // Insert user
                String query = "INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)";
                PreparedStatement stmt = conn.prepareStatement(query);
                stmt.setString(1, username);
                stmt.setString(2, password);
                stmt.setString(3, fullname);

                int rowsInserted = stmt.executeUpdate();
                if (rowsInserted > 0) {
                    out.println("<html><head><title>Registration</title>");
                    out.println("<meta http-equiv='refresh' content='3; URL=login.html'>");
                    out.println("<link rel='stylesheet' href='css/styles.css'>");
                    out.println("</head><body>");
                    out.println("<h3 style='color: green;'>Registration Successful! Redirecting to Login Page...</h3>");
                    out.println("</body></html>");
                }
            }

            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<html><body>");
            out.println("<h3 style='color: red;'>Error: " + e.getMessage() + "</h3>");
            out.println("</body></html>");
        }
    }
}

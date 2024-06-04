import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String senha = request.getParameter("senha");

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3307/user", "root", "p@$$w0rd");
            String sql = "SELECT * FROM user WHERE email = ? AND senha = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, senha);
            rs = stmt.executeQuery();
            
            if (rs.next()) {
                String nome = rs.getString("nome");
                email = rs.getString("email");
                String dataNascimento = rs.getString("data_nascimento");
                String genero = rs.getString("genero");
                String nacionalidade = rs.getString("nacionalidade");

                HttpSession session = request.getSession();
                session.setAttribute("nome", nome);
                session.setAttribute("email", email);
                session.setAttribute("dataNascimento", dataNascimento);
                session.setAttribute("genero", genero);
                session.setAttribute("nacionalidade", nacionalidade);

                response.sendRedirect("perfil.html");
                
            } else {
                request.setAttribute("mensagem", "Email ou senha incorretos");
                request.getRequestDispatcher("login.html").forward(request, response);
            }
        } catch (SQLException | ClassNotFoundException e) {
            response.getWriter().println("Erro ao validar o login: " + e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                response.getWriter().println("Erro ao fechar conexão: " + e.getMessage());
            }
        }
    }
}

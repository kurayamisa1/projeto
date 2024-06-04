import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/perfil-info")
public class PerfilInfoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        String nome = (String) session.getAttribute("nome");
        String email = (String) session.getAttribute("email");
       
        String dataNascimento = (String) session.getAttribute("dataNascimento");
        String genero = (String) session.getAttribute("genero");
        String nacionalidade = (String) session.getAttribute("nacionalidade");

        String userInfo = "{\"nome\":\"" + nome + "\",\"email\":\"" + email + "\",\"dataNascimento\":\"" + dataNascimento + "\",\"genero\":\"" + genero + "\",\"nacionalidade\":\"" + nacionalidade + "\"}";

        response.setContentType("application/json");
        response.getWriter().write(userInfo);
    }
}

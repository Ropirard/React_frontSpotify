import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/Ui/CustomInput";
import ErrorMessage from "../../components/Ui/ErrorMessage";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_ROOT } from "../../constants/apiConstant";

const Login = () => {
  // On déclare nos state pour les valeurs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // On récupère le hook de navigation
  const navigate = useNavigate();
  // On récupère la méthode signIn du AuthContext
  const { signIn } = useAuthContext();

  useEffect(() => {
    // Si j'ai un utilisateur en session, alors on le redirige sur "/" du router online
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Méthode qui réceptionne les données du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // On empêche le comportement naturel du formulaire
    setIsLoading(true); // On passe isLoading à true pour afficher le loader
    setErrorMessage(""); // On vide les messages d'erreur

    
    try {
      // On vérifie que les champs sont bien rempli
      if (email == "" || password == "") {
        setErrorMessage("Tous les champs doivent être remplis");
        return;
      }

      // On execute la requête sur l'API
      const response = await axios.post(`${API_ROOT}/login`, {
        email,
        password,
      });

      if (response.data.success === false) {
        setErrorMessage(response.data.message);
      } else {
        // On reconstruit un objet user
        const loggedInUser = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname,
        };

        // On appelle la méthode signIn de authContext pour enregistrer l'utilisateur
        await signIn(loggedInUser);
        setUser(loggedInUser);
      }
    } catch (error) {
      console.log(`Erreur lors de la connexion : ${error}`);
      setErrorMessage("Email et/ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4 sm:px-6 py-8">
      <div className="w-full max-w-md animate-slideup2">
        <div className="text-center mb-8">
          <h1 className="title-h1">Connectez-vous</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Accédez à votre bibliothèque musicale
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2 shadow-black_05"
        >
          <div className="space-y-1">
            <CustomInput
              label={"Email"}
              type={"email"}
              placeholder="votre@email.com" // Propriété optionnelle
              state={email}
              callable={(event) => setEmail(event.target.value)}
            />
            <CustomInput
              label={"Mot de passe"}
              type={"password"}
              placeholder="********" // Propriété optionnelle
              state={password}
              callable={(event) => setPassword(event.target.value)}
            />
          </div>

          {errorMessage && <ErrorMessage message={errorMessage} />}

          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center">
                <ButtonLoader />
              </div>
            ) : (
              <button className="main-button" type="submit">
                Se connecter
              </button>
            )}
          </div>
          <p className="mt-6 text-center text-gray-300 text-sm">
            Pas encore de compte ?{" "}
            <Link
              to={"/register"}
              className="text-green font-semibold hover:text-green_top underline underline-offset-2 transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

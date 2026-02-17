import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/Ui/CustomInput";
import ErrorMessage from "../../components/Ui/ErrorMessage";
import ButtonLoader from "../../components/Loader/ButtonLoader";

const Register = () => {
  // On déclare nos state pour les valeurs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // On récupère le hook de navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Si j'ai un utilisateur en session, alors on le redirige sur "/" du router online
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Méthode qui réceptionne les données du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // On empêche le comportement naturel du formulaire
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4 sm:px-6 py-8">
      <div className="w-full max-w-md animate-slideup2">
        <div className="text-center mb-8">
          <h1 className="title-h1">Inscrivez-vous</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Rejoignez la plateforme en quelques secondes
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2 shadow-black_05"
        >
          <div className="space-y-1">
            <CustomInput
              label={"Pseudo"}
              type={"text"}
              placeholder="Xx_DarkNoob_xX"
              state={pseudo}
              callable={(event) => setPseudo(event.target.value)}
            />
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
            <CustomInput
              label={"Confirmer le mot de passe"}
              type={"password"}
              placeholder="********" // Propriété optionnelle
              state={confirmPassword}
              callable={(event) => setConfirmPassword(event.target.value)}
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
                S'inscrire
              </button>
            )}
          </div>
          <p className="mt-6 text-center text-gray-300 text-sm">
            Vous avez déjà un compte ?{" "}
            <Link
              to={"/"}
              className="text-green font-semibold hover:text-green_top underline underline-offset-2 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

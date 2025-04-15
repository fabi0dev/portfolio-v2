import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6 text-center">
        Ah não! <br />
        Você parou em um lugar que não existe.
      </p>
      <Link
        to="/"
        className="text-green-500 hover:underline text-sm transition duration-300"
      >
        Volte para casa
      </Link>
    </div>
  );
};

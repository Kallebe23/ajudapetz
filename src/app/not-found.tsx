import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col p-8 items-center justify-center">
      <h2 className="text-lg font-bold text-center">Página não encontrada</h2>
      <p className="text-md font-semi text-center">
        Não encontramos o recurso solicitado
      </p>
      <Link className="text-center" href="/">
        Retornar a home
      </Link>
    </div>
  );
}

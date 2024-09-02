import DonationCard from "@/components/DonationCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listDonations } from "@/lib/data/donations";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { donations, metadata } = await listDonations(searchParams);

  const queryString = searchParams
    ? Object.keys(searchParams)
        ?.filter((key) => key !== "page")
        .map((key) => `${key}=${searchParams[key]}`)
        .join("&")
    : "";

  const page = Number(searchParams?.page) || 0;
  const pageSize = 30;
  const totalPages = Math.ceil(metadata.total / pageSize);

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Encontre Seu Novo <span className="text-primary">Melhor Amigo</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Está à procura de um pet para adotar ou tem um amigo peludo precisando
          de um novo lar?
          <br /> Nosso site conecta amantes de gatos e cachorros com aqueles que
          querem oferecer um lar cheio de amor e carinho.
        </p>
      </div>
      <form className="p-2 w-full flex-wrap mb-4 flex gap-2 justify-end">
        <Select
          defaultValue={searchParams?.["species"] || undefined}
          name="species"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CAT">Gato</SelectItem>
            <SelectItem value="DOG">Cachorro</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={searchParams?.["sex"] || undefined} name="sex">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Macho</SelectItem>
            <SelectItem value="FEMALE">Femea</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={searchParams?.["age"] || undefined} name="age">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Idade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUPPY">Filhote</SelectItem>
            <SelectItem value="ADULT">Adulto</SelectItem>
            <SelectItem value="SENIOR">Idoso</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button type="submit">Filtrar</Button>
          {searchParams && !!Object.keys(searchParams).length && (
            <Button variant="outline" asChild>
              <a href="/">Limpar filtros</a>
            </Button>
          )}
        </div>
      </form>
      <section className="flex gap-8 flex-wrap justify-center ">
        {!donations.length && (
          <h1 className="text-lg">Nenhum pet encontrado :(</h1>
        )}
        {!!donations.length &&
          donations.map((donation) => (
            <DonationCard donation={donation} key={donation.id} />
          ))}
      </section>
      <section className="flex gap-2 mt-8">
        <Button
          type="submit"
          disabled={page === 0}
          variant="outline"
          size="icon"
          asChild
        >
          <Link
            href={page === 0 ? "" : `/?${queryString}&page=${page - 1}`}
            target="_self"
          >
            <MdChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={page >= totalPages - 1}
          variant="outline"
          size="icon"
          asChild
        >
          <Link
            href={
              page >= totalPages - 1 ? "" : `/?${queryString}&page=${page + 1}`
            }
            target="_self"
          >
            <MdChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}

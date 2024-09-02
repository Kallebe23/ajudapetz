import { findDonation } from "@/lib/data/donations";
import { getUser } from "@/lib/data/user";
import PublishForm from "./Form";

export default async function PublishPage({
  searchParams,
}: {
  searchParams?: { donationId?: string };
}) {
  const donationId = searchParams?.donationId;
  const user = await getUser();
  const donation = await findDonation(Number(donationId));

  return (
    <main className="max-w-screen-2xl	m-auto p-4">
      <h1 className="text-lg font-semi mb-8">Publicar animal para adoção</h1>
      <PublishForm donation={donation} user={user} />
    </main>
  );
}

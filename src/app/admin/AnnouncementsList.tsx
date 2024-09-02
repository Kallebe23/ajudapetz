import { listPendingApprovalDonations } from "@/lib/data/donations";
import UserAnnouncementCard from "./Card";

export default async function AnnouncementsList() {
  const donations = await listPendingApprovalDonations();

  return (
    <section className="flex gap-8 flex-wrap justify-center ">
      {!donations.length && (
        <h1 className="text-lg">Não há anúncios pendentes de aprovação</h1>
      )}
      {!!donations.length &&
        donations.map((donation) => (
          <UserAnnouncementCard donation={donation} key={donation.id} />
        ))}
    </section>
  );
}

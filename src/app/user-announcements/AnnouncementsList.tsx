import { listUserDonations } from "@/lib/data/donations";
import UserAnnouncementCard from "./Card";

export default async function AnnouncementsList() {
  const donations = await listUserDonations();

  return (
    <>
      {!donations.length && (
        <h1 className="text-lg">Você ainda não possui nenhum anúncio</h1>
      )}
      {!!donations.length &&
        donations.map((donation) => (
          <UserAnnouncementCard donation={donation} key={donation.id} />
        ))}
    </>
  );
}

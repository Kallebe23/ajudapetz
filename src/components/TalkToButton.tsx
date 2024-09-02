import { findDonationChat } from "@/lib/data/chat";
import { DonationInfo } from "./DonationCard";
import { Button } from "./ui/button";

interface Props {
  donation: DonationInfo;
}

export default async function TalkToButton({ donation }: Props) {
  const { chat, userId } = await findDonationChat(donation.id);

  if (donation.userId === userId) {
    return <></>;
  }

  return (
    <Button asChild>
      <a href={`/chats/${chat.id}`}>Falar com doador</a>
    </Button>
  );
}

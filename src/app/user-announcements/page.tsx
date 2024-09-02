import AnnouncementsList from "./AnnouncementsList";

export default async function UserAnnouncementsPage() {
  return (
    <main className="flex flex-col items-center justify-center max-w-screen-2xl m-auto p-8">
      <h1 className="text-lg font-bold mb-8">Meus anúncios</h1>
      <section className="flex gap-8 flex-wrap justify-center ">
        <AnnouncementsList />
      </section>
    </main>
  );
}

import { signIn } from "@/auth";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <form
        className="p-4 flex max-w-72 border flex-col gap-4 rounded-lg min-w-80"
        action={async (formData) => {
          "use server";
          const email = formData.get("email");
          await signIn("resend", { email, redirectTo: "/" });
        }}
      >
        <h1 className="text-center text-lg font-bold">Entrar</h1>
        <Input
          spellCheck={false}
          type="email"
          name="email"
          required
          placeholder="Digite seu email"
        />
        <SubmitButton>Login</SubmitButton>
        <p className="text-sm">
          Ao entrar você concorda com as
          <br />
          <a href="/legal" className="underline">
            políticas de uso e privacidade
          </a>
        </p>
      </form>
    </div>
  );
}

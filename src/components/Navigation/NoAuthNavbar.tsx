import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function NoAuthNavbarComponent() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/auth/login");
  };

  const goToRegister = () => {
    router.push("/auth/register");
  };

  return (
    <>
      <Button variant="ghost" className="rounded-full bg-red-100 text-red-700" onClick={goToRegister}>
        Daftar
      </Button>
      <Button variant="ghost" className="rounded-full bg-orange-100 text-orange-700" onClick={goToLogin}>
        Masuk
      </Button>
    </>
  );
}

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
      <Button variant="ghost" className="rounded-full bg-[#D94B6B] text-white hover:bg-[#C75C71]" onClick={goToRegister}>
        Daftar
      </Button>
      <Button variant="ghost" className="rounded-full bg-[#FFA500] text-black hover:bg-[#FF8C00]" onClick={goToLogin}>
        Masuk
      </Button>
    </>
  );
}

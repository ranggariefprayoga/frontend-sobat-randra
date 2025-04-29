import { Button } from "../ui/button";

export default function NoAuthNavbarComponent() {
  return (
    <>
      <Button variant="ghost" className="rounded-full bg-[#D94B6B] text-white hover:bg-[#C75C71]">
        Daftar
      </Button>
      <Button variant="ghost" className="rounded-full bg-[#FFA500] text-black hover:bg-[#FF8C00]">
        Masuk
      </Button>
    </>
  );
}

import { Card, CardContent } from "../ui/card";

export default function CardPilihanPaket() {
  return (
    <>
      <Card
        className="relative overflow-hidden text-white shadow-lg p-6 bg-gradient-to-r from-sky-500 to-blue-600"
        style={{
          backgroundImage: "url('/images/bg-pattern-cpns.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
      >
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-4 z-10 relative">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Paket SKD Mandiri</h3>
            <p className="text-sm mt-2">Belajar secara mandiri dengan mengakses tryout, latihan soal, materi dan video series. Tidak ada jadwal kelas bersama pengajar.</p>
          </div>
          <img src="/images/skd-mandiri-icon.png" alt="Paket SKD Mandiri" className="w-24 h-24 object-contain" />
        </CardContent>
      </Card>
    </>
  );
}

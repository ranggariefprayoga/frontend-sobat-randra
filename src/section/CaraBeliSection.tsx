import { DialogInfo } from "@/components/Dialog/DialogInfo";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { caraBeliData } from "@/data/cara-beli.data";
import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import LayoutContent from "@/layout/LayoutContent";

export default function CaraBeliSection() {
  return (
    <LayoutBackgroundWhite>
      <TitleComponent title="FAQ" subTitle="Pertanyaan yang sering dijawab" />
      <LayoutContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
          {caraBeliData.map((item, index) => (
            <DialogInfo key={index} triggerText={item.trigger} title={item.title} description={item.description} details={item.details} />
          ))}
        </div>
      </LayoutContent>
    </LayoutBackgroundWhite>
  );
}

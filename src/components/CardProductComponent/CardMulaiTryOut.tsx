import { TryOutProductModel } from "@/model/product.model";
import AccessButtonWithModal from "../AccessProductButton/AccessProductButton";
import { ProductAccessTryOutDummy } from "@/data/dummy/productAccess.try-out";
import { QuizSessionDataDummy } from "@/data/dummy/quiz-session.dummy";
import { QuizSessionModel } from "@/model/quiz-session.model";
import { TryOutProductAccessModel } from "@/model/productAccess.model";

interface ProductCardProps {
  product: TryOutProductModel;
  userEmail: string;
  userId: number;
}

export default function CardMulaiTryOut({ product, userEmail, userId }: ProductCardProps) {
  // backend-api cari data quiz session dengan user_id dengan for_product_free = true
  const isFreeAvailable =
    QuizSessionDataDummy === null || QuizSessionDataDummy?.length === 0
      ? true
      : QuizSessionDataDummy.some((session: QuizSessionModel) => {
          const hasValidSession = session.product_id === product.id && session.user_id === userId && session.for_product_free === true;

          if (hasValidSession) {
            return session.is_completed === false && session.is_active === true && session.token !== null && new Date(session.expired_at) > new Date();
          }

          return true;
        });

  // backend-api cari data quiz session dengan user_id dengan for_product_free = false
  const isPremiumAvailable = ProductAccessTryOutDummy?.some((access: TryOutProductAccessModel) => access.product_id === product.id && access.user_email === userEmail && access.get_access === true);

  return (
    <div className={`relative shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${!product.is_active ? "bg-gray-100 text-gray-500" : "bg-white text-gray-900"}`}>
      <img src={product.banner_image || "/no-image.png"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex items-center gap-2 text-sm mb-2">
          {isFreeAvailable && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Gratis</span>}
          {isPremiumAvailable && <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📘 Premium</span>}
          {!isFreeAvailable && !isPremiumAvailable && <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">📕 Beli Akses Premium untuk mulai Try Out</span>}
        </div>
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm mt-1 truncate overflow-hidden whitespace-nowrap" title={product.description}>
          {product.description}
        </p>
        <AccessButtonWithModal product={product} isPremiumAvailable={isPremiumAvailable} isFreeAvailable={isFreeAvailable} />
      </div>
    </div>
  );
}

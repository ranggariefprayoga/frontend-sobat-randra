import { SoalPayload } from "@/model/soalFree.model";
import { WebResponse } from "@/model/web-reponse.model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";

export const useGetPremiumQuestion = (productTryOutId: number, question_id: number) => {
  return useQuery<WebResponse<SoalPayload>, Error>({
    queryKey: ["soal", "premium", productTryOutId, question_id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/soal/products/${productTryOutId}/question/premium/${question_id}`, { withCredentials: true });
      return response.data;
    },
    enabled: Boolean(productTryOutId && question_id),
  });
};

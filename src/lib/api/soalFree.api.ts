import { SoalPayload } from "@/model/soalFree.model";
import { WebResponse } from "@/model/web-reponse.model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl";

export const useGetFreeQuestion = (productTryOutId: number, numberOfQuestion: number) => {
  return useQuery<WebResponse<SoalPayload>, Error>({
    queryKey: ["soal", "free", productTryOutId, numberOfQuestion],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/api/soal/products/${productTryOutId}/question/free/${numberOfQuestion}`, { withCredentials: true });
      return response.data;
    },
    enabled: Boolean(productTryOutId && numberOfQuestion),
  });
};

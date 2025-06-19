import { useEffect, useState } from "react";
import { getAxios } from "@/api/axiosInstance";
import { storage } from "@/api/storage";
import { useRouter } from "next/router";

export const useLoadTestQuestions = (itemId?: number) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAxios(window.location.hostname)
      .post(`/tests/questions/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${storage.get("token") || ""}` },
      })
      .then((resp: any) => setQuestions(resp.data))
      .catch((err: any) => {
        if (err.response?.status === 401 && err.response.data.error === "Invalid token") {
          storage.clearTokenInfo();
          window.location.href = ("/login");
        }
      });
  }, [itemId]);

  return { questions, setQuestions };
};

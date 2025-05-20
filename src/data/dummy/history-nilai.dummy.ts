import { HistoryNilaiModel } from "@/model/history-nilai.model";

export const historyNilaiDataDummy: HistoryNilaiModel[] = [
  {
    id: 1,
    session_id: 101,
    user_id: 1,
    product_try_out_id: 1,
    total_score: 450,
    is_free: false,
    details: [
      {
        category: "Tes Wawasan Kebangsaan",
        total_questions: 30,
        correct_answers: 22,
        wrong_answers: 8,
        score: 110,
      },
      {
        category: "Tes Intelegensi Umum",
        total_questions: 35,
        correct_answers: 28,
        wrong_answers: 7,
        score: 140,
      },
      {
        category: "Tes Karakteristik Pribadi",
        total_questions: 45,
        correct_answers: 32,
        wrong_answers: 13,
        score: 200,
      },
    ],
  },
  {
    id: 2,
    session_id: 102,
    user_id: 2,
    product_try_out_id: 2,
    total_score: 380,
    is_free: false,
    details: [
      {
        category: "Tes Wawasan Kebangsaan",
        total_questions: 30,
        correct_answers: 18,
        wrong_answers: 12,
        score: 90,
      },
      {
        category: "Tes Intelegensi Umum",
        total_questions: 35,
        correct_answers: 25,
        wrong_answers: 10,
        score: 120,
      },
      {
        category: "Tes Karakteristik Pribadi",
        total_questions: 45,
        correct_answers: 28,
        wrong_answers: 17,
        score: 170,
      },
    ],
  },
  {
    id: 3,
    session_id: 103,
    user_id: 3,
    product_try_out_id: 3,
    total_score: 500,
    is_free: false,
    details: [
      {
        category: "Tes Wawasan Kebangsaan",
        total_questions: 30,
        correct_answers: 25,
        wrong_answers: 5,
        score: 120,
      },
      {
        category: "Tes Intelegensi Umum",
        total_questions: 35,
        correct_answers: 30,
        wrong_answers: 5,
        score: 150,
      },
      {
        category: "Tes Karakteristik Pribadi",
        total_questions: 45,
        correct_answers: 40,
        wrong_answers: 5,
        score: 230,
      },
    ],
  },
];

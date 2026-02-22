import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { API_BASE } from "@/config";

const PredictionResponseSchema = z.object({
  tb_probability: z.number(),
  label: z.string(),
  notes: z.string(),
  heatmap_url: z.string(),
});

export type PredictionResponse = z.infer<typeof PredictionResponseSchema>;

export interface FullPredictionInput {
  image: File;
  age: number;
  sex: string;
  coughDuration: number;
  hasFever: boolean;
  hasWeightLoss: boolean;
  hasNightSweats: boolean;
}

export interface CxrPredictionInput {
  image: File;
}

// TODO: Replace this mock function with real backend API calls.
//
// ── CXR-only ──
//   POST ${API_BASE}/predict/cxr
//   Body: FormData
//     - image (File)
//
// ── Full prediction ──
//   POST ${API_BASE}/predict/full
//   Body: FormData
//     - image (File)
//     - fields (JSON string): { "age": 45, "sex": "Male", "cough_days": 14, "fever": true, "weight_loss": false, "night_sweats": true }
//
// Example (Full):
//   const formData = new FormData();
//   formData.append("image", data.image);
//   formData.append("fields", JSON.stringify({
//     age: data.age,
//     sex: data.sex,
//     cough_days: data.coughDuration,
//     fever: data.hasFever,
//     weight_loss: data.hasWeightLoss,
//     night_sweats: data.hasNightSweats,
//   }));
//   const res = await fetch(`${API_BASE}/predict/full`, { method: "POST", body: formData });
//   return await res.json();
//
// Example (CXR-only):
//   const formData = new FormData();
//   formData.append("image", data.image);
//   const res = await fetch(`${API_BASE}/predict/cxr`, { method: "POST", body: formData });
//   return await res.json();
//
// Expected response JSON:
//   { "tb_probability": 0.84, "label": "TB-likely", "notes": "...", "heatmap_url": "" }
const mockPredict = async (type: 'full' | 'cxr'): Promise<PredictionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseProb = type === 'full' ? 0.84 : 0.78;
      const randomVar = (Math.random() * 0.1) - 0.05;
      const prob = Math.min(0.99, Math.max(0.01, baseProb + randomVar));

      resolve({
        tb_probability: prob,
        label: prob > 0.5 ? "TB-likely" : "TB-unlikely",
        notes: "Research prototype only — not for clinical diagnosis.",
        heatmap_url: "",
      });
    }, 1000);
  });
};

export function useFullPrediction() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: FullPredictionInput) => {
      if (!data.image) throw new Error("Image is required");
      return await mockPredict('full');
    },
    onError: (error) => {
      toast({
        title: "Prediction Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

export function useCxrPrediction() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CxrPredictionInput) => {
      if (!data.image) throw new Error("Image is required");
      return await mockPredict('cxr');
    },
    onError: (error) => {
      toast({
        title: "Prediction Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

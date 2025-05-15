import { LoaderCircle } from "lucide-react";

type LoadingComponentProps = {
  color?: string;
};

export default function LoadingComponent({ color = "#ffffff" }: LoadingComponentProps) {
  return <LoaderCircle color={color} className="animate-spin" strokeWidth={3} />;
}

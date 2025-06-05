type LoadingComponentProps = {
  color?: string;
};

export default function LoadingComponent({ color = "#ad0a1f" }: LoadingComponentProps) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className={`animate-spin rounded-full h-12 w-12 border-t-4`} style={{ borderTopColor: color, borderColor: `${color} transparent transparent transparent` }}></div>
    </div>
  );
}

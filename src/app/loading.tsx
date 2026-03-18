export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-grey-200 border-t-fg rounded-full animate-spin"></div>
        <p className="text-sm text-grey-600 font-mono">Loading...</p>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="fixed h-screen w-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
    </div>
  );
}

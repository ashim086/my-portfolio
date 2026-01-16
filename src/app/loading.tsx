export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white/85">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 object-contain"
      >
        <source src="/loading.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

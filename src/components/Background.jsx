// Decorative animated gradient blobs + subtle grid, rendered behind page content.
const Background = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="blob -top-32 -left-32 h-96 w-96 bg-indigo-400" />
      <div
        className="blob top-1/3 -right-24 h-[28rem] w-[28rem] bg-fuchsia-300"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="blob -bottom-40 left-1/3 h-96 w-96 bg-sky-300"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(148 163 184 / 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.15) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
};

export default Background;

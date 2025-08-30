import hero from "../assets/hero.jpg";

export default function AuthLayout({ title, children }:{title:string; children:React.ReactNode}) {
  // Two-column layout (form + image) on md+, stacked on mobile
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-brand-600"></div>
              <div className="font-semibold">HD</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to enjoy the features of HD</p>
          <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm border">{children}</div>
        </div>
      </div>

      <div className="hidden md:block p-10">
        <img src={hero} className="h-full w-full object-cover rounded-2xl shadow-md" alt="hero" />
      </div>
    </div>
  );
}

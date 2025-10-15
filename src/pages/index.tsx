export default function Home() {
  return (
    <main className="bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="text-center lg:text-left">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Admin Panel with a P/L Forecaster Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Assignment: TAO BIN P/L Forecaster
          </p>
        </header>
        <div className="grid flex-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Admin Panel (Machine Management)
            </h2>
            <div className="mt-4">
              <button></button>
            </div>
            <div className="mt-6 space-y-2 pl-6 text-sm text-slate-500">
              <table></table>
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Forecaster Dashboard (Forecasting)
            </h2>
            <div className="mt-4 text-slate-600">
              <div className="card"></div>
            </div>
            <div className="mt-6 space-y-2 pl-6 text-sm text-slate-500">
              <table></table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

import { MachineTable } from "@/components/machines/MachineTable"; // นำเข้าตารางจัดการเครื่องที่สร้างด้วย TanStack Table

export default function Home() {
  return (
    <main className="bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="text-center lg:text-left">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            TAO BIN Forecaster Dashboard
          </h1>
          <p className="mt-2 text-slate-600">TAO BIN Forecaster Dashboard</p>
        </header>
        <div className="grid flex-1 gap-6 lg:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Admin Panel
            </h2>

            <div className="mt-6">
              <MachineTable />
            </div>
          </section>
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Forecast Dashboard
            </h2>
          </section>
        </div>
      </div>
    </main>
  );
}

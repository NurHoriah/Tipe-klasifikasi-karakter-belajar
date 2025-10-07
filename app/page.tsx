import { AnalyzerClient } from "@/components/analyzer-client"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b bg-accent">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo SD Insan Kamil"
              width={48}
              height={48}
              className="h-12 w-12 rounded-sm"
            />
            <div>
              <h1 className="text-pretty text-3xl font-bold tracking-tight text-foreground">
                Sistem Klasifikasi Tipe Karakter Belajar Siswa SD Insan Kamil
              </h1>
              <p className="mt-1 text-muted-foreground">
                Analisis awal berdasarkan nilai akademik dan non-akademik.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pt-4">
        <div className="overflow-hidden rounded-xl border bg-card">
          <img
            src="/inka.jpg"
            alt="Banner edukasi: siswa SD belajar dengan suasana ceria"
            className="h-64 w-full object-cover md:h-80"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <AnalyzerClient />
      </section>

      <footer className="mt-8 border-t">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
          Catatan: Hasil saat ini menggunakan analisis awal di sisi klien. Versi final akan memanfaatkan model SVM
          (Scikit-learn) dari backend Python.
        </div>
      </footer>
    </main>
  )
}

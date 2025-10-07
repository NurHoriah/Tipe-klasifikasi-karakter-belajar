"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getProfile, type LearningTypeId, LEARNING_TYPES } from "@/lib/learning-profiles"
import { cn } from "@/lib/utils"

type FormData = {
  // Akademik (0-100)
  indo: number
  matematika: number
  ipa: number
  ips: number
  // Non-akademik / preferensi (1-5)
  olahraga: number
  musik: number
  sukaMembaca: number
  sukaPraktik: number
  ingatSuara: number
  ingatGambar: number
}

type PredResult = {
  topType: LearningTypeId
  confidence: number // 0..1
  scores: Record<LearningTypeId, number>
}

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)))
  return (
    <div className="h-2 w-full rounded-md bg-muted">
      <div
        className="h-2 rounded-md bg-primary transition-all"
        style={{ width: `${pct}%` }}
        aria-label="Confidence"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        role="progressbar"
      />
    </div>
  )
}

function mockPredict(data: FormData): PredResult {
  // Skor awal per tipe
  let visual = 0
  let auditori = 0
  let kinestetik = 0
  let readwrite = 0

  // Preferensi non-akademik (lebih dominan menentukan gaya belajar)
  visual += data.ingatGambar * 2 + data.sukaMembaca * 0.5
  auditori += data.ingatSuara * 2 + data.musik * 1.2
  kinestetik += data.sukaPraktik * 2 + data.olahraga * 1.2
  readwrite += data.sukaMembaca * 2 + data.indo * 0.02

  // Sinyal kecil dari nilai akademik tertentu
  // Matematika dan IPA bisa mendukung visual/logical; IPS dan Indo mendukung read/write
  visual += data.matematika * 0.01 + data.ipa * 0.008
  readwrite += data.ips * 0.008 + data.indo * 0.01
  // Auditori sedikit dari musik/ekspresi lisan (pakai indo sebagai proxy kecil)
  auditori += data.indo * 0.004

  const raw: Record<LearningTypeId, number> = {
    visual,
    auditori,
    kinestetik,
    readwrite,
  }

  const values = Object.values(raw)
  const max = Math.max(...values)
  const sum = values.reduce((a, b) => a + b, 0) || 1
  const top = (Object.keys(raw) as LearningTypeId[]).reduce((acc, k) => (raw[k] > raw[acc] ? k : acc), "visual")

  return {
    topType: top,
    confidence: max / sum,
    scores: raw,
  }
}

const defaultForm: FormData = {
  indo: 80,
  matematika: 80,
  ipa: 80,
  ips: 80,
  olahraga: 3,
  musik: 3,
  sukaMembaca: 3,
  sukaPraktik: 3,
  ingatSuara: 3,
  ingatGambar: 3,
}

export function AnalyzerClient() {
  const [form, setForm] = useState<FormData>(defaultForm)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<PredResult | null>(null)

  function handleNumber(name: keyof FormData, min: number, max: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value)
      if (Number.isNaN(v)) return
      setForm((prev) => ({ ...prev, [name]: Math.max(min, Math.min(max, v)) }))
    }
  }

  return (
    <div className="relative z-10 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Input Data Siswa</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">Nilai Akademik (0-100)</h3>
              <p className="text-sm text-muted-foreground">Masukkan nilai terakhir siswa pada mata pelajaran inti.</p>
            </div>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="indo">Bahasa Indonesia</Label>
                <Input
                  id="indo"
                  type="number"
                  min={0}
                  max={100}
                  value={form.indo}
                  onChange={handleNumber("indo", 0, 100)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="matematika">Matematika</Label>
                <Input
                  id="matematika"
                  type="number"
                  min={0}
                  max={100}
                  value={form.matematika}
                  onChange={handleNumber("matematika", 0, 100)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ipa">IPA</Label>
                <Input
                  id="ipa"
                  type="number"
                  min={0}
                  max={100}
                  value={form.ipa}
                  onChange={handleNumber("ipa", 0, 100)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ips">IPS</Label>
                <Input
                  id="ips"
                  type="number"
                  min={0}
                  max={100}
                  value={form.ips}
                  onChange={handleNumber("ips", 0, 100)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">Non-Akademik & Preferensi (1-5)</h3>
              <p className="text-sm text-muted-foreground">1 = sangat rendah, 5 = sangat tinggi.</p>
            </div>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="ingatGambar">Daya Visual/Gambar</Label>
                <Input
                  id="ingatGambar"
                  type="number"
                  min={1}
                  max={5}
                  value={form.ingatGambar}
                  onChange={handleNumber("ingatGambar", 1, 5)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ingatSuara">Mengingat Lewat Suara</Label>
                <Input
                  id="ingatSuara"
                  type="number"
                  min={1}
                  max={5}
                  value={form.ingatSuara}
                  onChange={handleNumber("ingatSuara", 1, 5)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sukaPraktik">Suka Praktik/Hands-on</Label>
                <Input
                  id="sukaPraktik"
                  type="number"
                  min={1}
                  max={5}
                  value={form.sukaPraktik}
                  onChange={handleNumber("sukaPraktik", 1, 5)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sukaMembaca">Suka Membaca/Mencatat</Label>
                <Input
                  id="sukaMembaca"
                  type="number"
                  min={1}
                  max={5}
                  value={form.sukaMembaca}
                  onChange={handleNumber("sukaMembaca", 1, 5)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="olahraga">Ekskul: Olahraga/Kegiatan Motorik</Label>
                <Input
                  id="olahraga"
                  type="number"
                  min={1}
                  max={5}
                  value={form.olahraga}
                  onChange={handleNumber("olahraga", 1, 5)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="musik">Ekskul: Musik/Paduan Suara</Label>
                <Input
                  id="musik"
                  type="number"
                  min={1}
                  max={5}
                  value={form.musik}
                  onChange={handleNumber("musik", 1, 5)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              onClick={() => {
                console.log("[v0] Analyze clicked with form:", form)
                const r = mockPredict(form)
                console.log("[v0] Analyze result:", r)
                setResult(r)
                setSubmitted(true)
              }}
              className="pointer-events-auto bg-primary text-primary-foreground"
            >
              Analisis Tipe Karakter
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="pointer-events-auto"
              onClick={() => {
                console.log("[v0] Reset clicked")
                setForm(defaultForm)
                setResult(null)
                setSubmitted(false)
              }}
            >
              Reset Hasil
            </Button>
          </div>
          <Alert>
            <AlertTitle>Catatan</AlertTitle>
            <AlertDescription>
              Analisis ini bersifat indikatif. Versi final akan memanggil model SVM (Scikit-learn) di backend Python.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className={cn("border-primary/20", submitted && result ? "ring-2 ring-primary/20" : "")}>
        <CardHeader>
          <CardTitle className="text-pretty">Hasil Analisis</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          {!submitted || !result ? (
            <>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="text-lg font-semibold">Belum dianalisis</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Silakan isi data siswa, kemudian klik tombol <strong>Analisis Tipe Karakter</strong>.
                </p>
              </div>
            </>
          ) : (
            <>
              {(() => {
                const profile = getProfile(result.topType)
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-primary-foreground">{profile.short}</Badge>
                        <span className="text-muted-foreground">Tipe dominan</span>
                      </div>
                      <div className="min-w-24 text-right text-sm tabular-nums">
                        {(result.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                    <ConfidenceBar value={result.confidence} />

                    <div className="rounded-lg border bg-card p-4">
                      <h3 className="text-lg font-semibold">{profile.name}</h3>
                      <p className="mt-2 text-pretty text-sm text-muted-foreground">{profile.description}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-accent p-4">
                        <h4 className="font-semibold">Kekuatan</h4>
                        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                          {profile.strengths.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-accent p-4">
                        <h4 className="font-semibold">Potensi Kelemahan</h4>
                        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                          {profile.weaknesses.map((w) => (
                            <li key={w}>{w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-card p-4">
                      <h4 className="font-semibold">Strategi Mengatasi Kelemahan</h4>
                      <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                        {profile.tips.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-3">
                      <h4 className="font-semibold">Skor Tipe (perbandingan)</h4>
                      <div className="grid gap-2">
                        {(Object.keys(result.scores) as LearningTypeId[]).map((k) => {
                          const v = result.scores[k]
                          const max = Math.max(...Object.values(result.scores))
                          const pct = max ? Math.round((v / max) * 100) : 0
                          const label = LEARNING_TYPES.find((t) => t.id === k)?.short ?? k
                          return (
                            <div key={k} className="grid gap-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{label}</span>
                                <span className="tabular-nums">{pct}%</span>
                              </div>
                              <div className="h-1.5 w-full rounded bg-muted">
                                <div className="h-1.5 rounded bg-primary/70" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </>
                )
              })()}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export type LearningTypeId = "visual" | "auditori" | "kinestetik" | "readwrite"

export const LEARNING_TYPES: Array<{
  id: LearningTypeId
  short: string
  name: string
  description: string
  strengths: string[]
  weaknesses: string[]
  tips: string[]
}> = [
  {
    id: "visual",
    short: "Visual",
    name: "Visual (Penglihat)",
    description:
      "Siswa lebih mudah memahami informasi melalui gambar, warna, diagram, dan tata letak. Catatan yang rapi dan peta konsep sangat membantu.",
    strengths: [
      "Cepat menangkap pola, diagram, dan peta konsep",
      "Mudah mengingat dengan warna/ikon",
      "Tertarik pada tata letak dan struktur visual",
    ],
    weaknesses: ["Kurang fokus saat pembelajaran murni lisan", "Dapat kesulitan jika materi tidak dilengkapi visual"],
    tips: [
      "Gunakan highlight/warna saat mencatat",
      "Ubah materi menjadi mind map atau sketsa",
      "Minta guru menyertakan diagram atau infografis",
    ],
  },
  {
    id: "auditori",
    short: "Auditori",
    name: "Auditori (Pendengar)",
    description:
      "Siswa memahami materi dengan baik lewat penjelasan verbal, diskusi, dan rekaman suara. Mengulang dengan cara menceritakan kembali membantu.",
    strengths: [
      "Tangguh dalam diskusi dan tanya-jawab",
      "Mudah mengingat instruksi lisan",
      "Suka belajar dengan musik/ritme",
    ],
    weaknesses: [
      "Bosan jika terlalu banyak membaca tanpa penjelasan",
      "Terganggu oleh kebisingan yang tidak terkontrol",
    ],
    tips: [
      "Gunakan teknik mengajar teman sebaya (teach back)",
      "Rekam ringkasan materi dalam audio",
      "Gunakan ritme/lagu untuk menghafal",
    ],
  },
  {
    id: "kinestetik",
    short: "Kinestetik",
    name: "Kinestetik (Pelaku/Praktik)",
    description:
      "Siswa belajar terbaik dengan bergerak, praktik langsung, eksperimen, dan simulasi. Aktivitas fisik memperkuat pemahaman.",
    strengths: [
      "Belajar cepat melalui praktik langsung",
      "Kuat dalam proyek dan eksperimen",
      "Antusias pada permainan edukatif",
    ],
    weaknesses: ["Sulit duduk lama tanpa aktivitas", "Kurang optimal jika hanya membaca/menyimak"],
    tips: [
      "Gunakan alat peraga dan eksperimen sederhana",
      "Buat jeda aktivitas fisik saat belajar",
      "Terapkan project-based learning",
    ],
  },
  {
    id: "readwrite",
    short: "Read/Write",
    name: "Read/Write (Membaca-Menulis)",
    description:
      "Siswa nyaman menyerap informasi melalui bacaan dan mengekspresikan pemahaman lewat tulisan. Struktur ringkas dan daftar poin membantu.",
    strengths: ["Teliti saat membaca materi tertulis", "Mampu merangkum menjadi poin-poin", "Disiplin membuat catatan"],
    weaknesses: [
      "Kurang tertarik pada demontrasi tanpa penjelasan teks",
      "Lambat jika harus memproses visual/ceramah cepat",
    ],
    tips: [
      "Buat ringkasan dan kartu-kartu istilah",
      "Gunakan outline/kerangka sebelum menulis",
      "Kombinasikan bacaan dengan latihan soal",
    ],
  },
]

export function getProfile(id: LearningTypeId) {
  const found = LEARNING_TYPES.find((t) => t.id === id)
  if (!found) {
    return LEARNING_TYPES[0]
  }
  return found
}

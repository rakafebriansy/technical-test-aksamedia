# Front End - Web Developer Intern Test

Tes masuk magang Frontend Developer di PT Aksamedia Mulia Digital dirancang untuk mengevaluasi pemahaman dan kemampuan Anda dalam membuat tampilan website yang bagus, responsive, dan interaktif. Tes ini juga akan mengevaluasi pemahaman Anda terhadap css khususnya tailwind dan keterampilan Anda dalam membuat website yang interaktif.

## Requirement
- Html
- Css
- Tailwind
- Vue js / React js (nilai plus)

## Tugas 1
- fitur login / auth tanpa API.
- hanya ada fitur login tanpa ada fitur register.
- nama user yg login harus ditampilkan di navbar (pojok kanan atas)
ada fitur logout.
- tidak boleh pakai library UI seperti chakra UI, material UI, dll. Harus murni tailwind.
- tombol logout ditaruh di dropdown di navbar pojok kanan atas, dropdown harus bikin sendiri tanpa library.
- ketika aplikasi direfresh, user tetap ter-authentikasi sampai di-logout manual.
- CRUD tanpa API (local storage atau indexed db)
- CRUD harus memiliki fitur search / filter dan fitur paginasi. Paginasi tidak boleh menggunakan library pihak ketiga.
- Halaman index CRUD harus bisa mempertahankan state nya ketika halaman direfresh. Misal posisi sedang berada di halaman ke 3 dan dengan keyword "Agus", ketika halaman direfresh user tetap berada di halaman ke 3 dan dengan keyword "Agus". Fitur ini harus menggunakan query string.
- Semua halaman kecuali halaman login harus tidak bisa diakses jika user belum melakukan autentikasi.
- Dark mode / light mode. Ada 3 pilihan: .dark, light, atau mengikuti OS. Pilihan defaultnya mengikuti settingan OS. Jika mode dark / light diganti dari sisi OS, aplikasi otomatis mengikuti.
- ada halaman untuk mengedit data user yg login (nama lengkap). Ketika data ini diedit, data yg ada di navbar otomatis berubah.
- ketika aplikasi direfresh data yg baru tetap tersimpan.
- semua fitur di atas dilakukan via lokal tanpa API (bisa pakai local storage mau pun indexed db).

Untuk credential Auth: username + password ditentukan statis.

## Aturan Pengerjaan
- Diperbolehkan menggunakan CDN
- Data yang tampil semuanya statis, tidak perlu hit API
- Wajib responsive (desktop, tablet, hp)
- Wajib menggunakan tailwind
- Penggunaan vue atau react merupakan nilai lebih
- Deploy hasil karya kalian dan kumpulkan link git beserta link hasil deploy

## Kriteria Penilaian
- Kesesuaian hasil dengan soal
- Kerapian hasil kodingan
- Pemanfaatan fitur-fitur tailwind
- Baik hati, suka menolong, tidak sombong, bukan LGBT dan rajin menabung
# Back End - Web Developer Intern Test

Tes masuk magang Backend Developer di PT Aksamedia Mulia Digital dirancang untuk mengevaluasi pemahaman dan kemampuan Anda dalam membuat api serta mengukur pemahaman anda terhadap sql. Tes ini juga akan mengevaluasi kemampuan logika anda dalam menyelesaikan masalah.

## Requirement
- Laravel
- Mysql/MariaDB
- PhpMyAdmin / Adminer / HeidiSQL
- Postman

## Tugas 1
### Membuat Api Login
- Endpoint `/login`
- Method: `POST`
- Expected Request Format
```json
{
    "username": "admin",
    "password": "pastibisa",
}
```
- Expected Response Format
```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
    "data": {
        "token": "token untuk autentikasi",
        "admin": {
            "id": "uuid admin",
            "name": "nama admin",
            "username": "username admin",
            "phone": "no telepon admin",
            "email": "email admin",
        },
    }
}
```

## Tugas 2
### Membuat Api Get All Data Divisi
- Endpoint /divisions
- Method: GET
- Bisa difilter berdasarkan nama
- Siapkan data dummy menggunakan seeder
- Isi data dummy (Mobile Apps, QA, Full Stack, Backend, Frontend, UI/UX Designer)
- Expected Request Format
```json
{
    "name": "pencarian nama",
}
```
- Expected Response Format
```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
    "data": {
        "divisions": [
            {
                "id": "uuid divisi",
                "name": "nama divisi",
            },
            {
                "id": "uuid divisi",
                "name": "nama divisi",
            }
        ],
    },
    "pagination": {
        "berisikan attribute pagination laravel":"..."
    },
}
```

## Tugas 3
### Membuat Api Get All Data Karyawan
- Endpoint /employees
- Method: GET
- Bisa difilter berdasarkan nama
- Bisa difilter berdasarkan divisi
- Expected Request Format
```json
{
    "name": "pencarian nama",
    "division_id": "filter berdasarkan divisi",
}
```
- Expected Response Format
```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
    "data": {
        "employees": [
            {
                "id": "uuid pegawai",
                "image": "url foto pegawai",
                "name": "nama pegawai",
                "phone": "no telepon pegawai",
                "division": {
                    "id": "uuid divisi",
                    "name": "nama divisi"
                },
                "position": "jabatan pegawai",
            },
            {
                "id": "uuid pegawai",
                "image": "url foto pegawai",
                "name": "nama pegawai",
                "phone": "no telepon pegawai",
                "division": {
                    "id": "uuid divisi",
                    "name": "nama divisi"
                },
                "position": "jabatan pegawai",
            }
        ],
    },
    "pagination": {
        "berisikan attribute pagination laravel":"..."
    },
}
```
​
## Tugas 4
### Membuat Api Create Data Karyawan
- Endpoint /employees
- Method: POST
- Expected Request Format

```json
{
    "image": "file foto pegawai",
    "name": "nama pegawai",
    "phone": "no telepon pegawai",
    "division": "uuid divisi",
    "position": "jabatan pegawai",
}
```
- Expected Response Format
```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
}
```
​
## Tugas 5
### Membuat Api Update Data Karyawan
- Endpoint /employees/{uuid pegawai}
- Method: PUT
- Expected Request Format
```json
{
    "image": "file foto pegawai",
    "name": "nama pegawai",
    "phone": "no telepon pegawai",
    "division": "uuid divisi",
    "position": "jabatan pegawai",
}
```
- Expected Response Format
```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
}
```

## Tugas 6
### Membuat Api Delete Data Karyawan
- Endpoint `/employees/{uuid pegawai}`
- Method: `DELETE`
- Expected Response Format

```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
}

```

## Tugas 7
### Membuat Api Logout
- Endpoint `/logout`
- Method: `POST`
- Expected Response Format
```json
{
    "status": "success / error",
    "message": "pesan sukses / error",
}

```

## Aturan Pengerjaan
- Api `tugas 1` hanya bisa diakses ketika belum login atau tanpa auth, ketika ada auth maka tolak
- Api `tugas 2 sampai 7` hanya bisa diakses ketika sudah login, ketika belum login atau tanpa auth maka tolak
- Manfaatkan fitur laravel dengan sebaik-baiknya seperti penggunaan `request validation`, `eloquent`, dan yang lainnya.
- Deploy hasil karya kalian dan kumpulkan link git beserta link hasil deploy

## Kriteria Penilaian
- Kesesuaian hasil dengan soal
- Kerapian hasil kodingan
- Pemanfaatan fitur-fitur laravel
- Baik hati, suka menolong, tidak sombong, bukan LGBT dan rajin menabung

# TES BACKEND (SQL) -> BONUS NILAI
Tes ini dirancang untuk mengevaluasi pemahaman anda dalam sql.

## Requirement
- Laravel
- Mysql/MariaDB
- phpMyAdmin / Adminer / HeidiSQL

## Tugas
- Buatkan code dengan endpoint /nilaiRT untuk:
https://drive.google.com/file/d/1AFll_ln1EEgdyHwAOYADDpEHDZ2DbAmb/view?usp=sharing

- Buatkan code dengan endpoint /nilaiST untuk:
https://drive.google.com/file/d/17_5VIg_Q7chsI8hadOUgRgN184NYIUg7/view?usp=drive_link

## Aturan
- Perhitungan **wajib** menggunakan sql, penggunaan collection hanya diperbolehkan untuk melakukan pengolahan data terakhir (grouping)
https://drive.google.com/file/d/12Gko6YBvLzzSUYeHqO4FqgNxek64lzhs/view?usp=drive_link

## Petunjuk
- Untuk nilai RT menggunakan *materi_uji_id 7*, tetapi tidak mengikutkan *pelajaran_khusus*
- Untuk nilai ST menggunakan *materi_uji_id 4*
    - untuk *pelajaran_id 44 dikali 41.67*
    - untuk *pelajaran_id 45 dikali 29.67*
    - untuk *pelajaran_id 46 dikali 100*
    - untuk *pelajaran_id 47 dikali 23.81*
    - hasil akhir harus diurutkan dari total nilai terbesar

## Penilaian
- Sesuai dengan output gambar
- Penamaan variabel yang memanusiakan manusia
- Baik hati, suka menolong, tidak sombong, bukan LGBT dan rajin menabung
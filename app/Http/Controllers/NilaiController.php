<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NilaiController extends Controller
{
    public function getNilaiRT(Request $request): JsonResponse
    {
        $nilaiRTs = DB::table('nilai')
        ->select('nama', 'nisn')
        ->selectRaw("
            JSON_OBJECT(
                'realistic', SUM(CASE WHEN nama_pelajaran = 'realistic' THEN skor ELSE 0 END),
                'investigative', SUM(CASE WHEN nama_pelajaran = 'investigative' THEN skor ELSE 0 END),
                'artistic', SUM(CASE WHEN nama_pelajaran = 'artistic' THEN skor ELSE 0 END),
                'social', SUM(CASE WHEN nama_pelajaran = 'social' THEN skor ELSE 0 END),
                'enterprising', SUM(CASE WHEN nama_pelajaran = 'enterprising' THEN skor ELSE 0 END),
                'conventional', SUM(CASE WHEN nama_pelajaran = 'conventional' THEN skor ELSE 0 END)
            ) AS nilaiRt
        ")
        ->groupBy('nama', 'nisn')
        ->havingRaw("JSON_LENGTH(nilaiRt) > 0")
        ->get();
        
        // cast hasil query
        $nilaiRTs = $nilaiRTs->map(function ($item) {
            $item->nilaiRt = json_decode($item->nilaiRt, true);
            return $item;
        });

        return response()->json($nilaiRTs);
    }
    public function getNilaiST(Request $request): JsonResponse
    {
        $nilaiSTs = DB::table('nilai')
        ->select('nama', 'nisn')
        ->selectRaw("
            JSON_OBJECT(
            'verbal', SUM(CASE WHEN pelajaran_id = 44 THEN skor * 41.67 ELSE 0 END),
            'kuantitatif', SUM(CASE WHEN pelajaran_id = 45 THEN skor * 29.67 ELSE 0 END),
            'penalaran', SUM(CASE WHEN pelajaran_id = 46 THEN skor * 100 ELSE 0 END),
            'figural', SUM(CASE WHEN pelajaran_id = 47 THEN skor * 23.81 ELSE 0 END)
        ) as listNilai
        ")
        ->selectRaw("
            SUM(
                CASE WHEN pelajaran_id = 44 THEN skor * 41.67 ELSE 0 END +
                CASE WHEN pelajaran_id = 45 THEN skor * 29.67 ELSE 0 END +
                CASE WHEN pelajaran_id = 46 THEN skor * 100 ELSE 0 END +
                CASE WHEN pelajaran_id = 47 THEN skor * 23.81 ELSE 0 END
            ) as total
        ")
        ->groupBy('nama', 'nisn')
        ->havingRaw("JSON_LENGTH(listNilai) > 0")
        ->get();
        
        // cast hasil query
        $nilaiSTs = $nilaiSTs->map(function ($item) {
            $item->listNilai = json_decode($item->listNilai, true);
            $item->total = (float)$item->total;
            return $item;
        });

        return response()->json($nilaiSTs);
    }
}

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
        
        $nilaiRTs = $nilaiRTs->map(function ($item) {
            $item->nilaiRt = json_decode($item->nilaiRt, true);
            return $item;
        });

        return response()->json($nilaiRTs);
    }
}

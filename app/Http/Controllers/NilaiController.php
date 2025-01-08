<?php

namespace App\Http\Controllers;

use App\Http\Resources\NilaiRTResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\DB;

class NilaiController extends Controller
{
    public function getNilaiRT(Request $request): ResourceCollection
    {
        $nilaiRTs = DB::table('nilai')
        ->select('nama', 'nisn',
            DB::raw("SUM(CASE WHEN nama_pelajaran = 'realistic' THEN skor ELSE 0 END) as realistic"),
            DB::raw("SUM(CASE WHEN nama_pelajaran = 'investigative' THEN skor ELSE 0 END) as investigative"),
            DB::raw("SUM(CASE WHEN nama_pelajaran = 'artistic' THEN skor ELSE 0 END) as artistic"),
            DB::raw("SUM(CASE WHEN nama_pelajaran = 'social' THEN skor ELSE 0 END) as social"),
            DB::raw("SUM(CASE WHEN nama_pelajaran = 'enterprising' THEN skor ELSE 0 END) as enterprising"),
            DB::raw("SUM(CASE WHEN nama_pelajaran = 'conventional' THEN skor ELSE 0 END) as conventional"),
        )
        ->groupBy('nama', 'nisn')
        ->get();

        return NilaiRTResource::collection($nilaiRTs);
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

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DivisionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $divisionsQuery = Division::query();
            $per_page = $request->per_page ?? 10;
            $page = $request->page ?? 1;
    
            if(isset($request->name)) {
                $divisionsQuery->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->name) . '%']);
            }
    
            $divisions = $divisionsQuery->paginate(perPage: $per_page, page: $page);
            return response()->json([
                "status" => "success",
                "message" => count($divisions->items()) > 0 ? "Berhasil mendapatkan data divisi." : "Data divisi tidak ditemukan.",
                "data" => [
                    "divisions" => $divisions->items(),
                ],
                "pagination" => [
                    "current_page" => $divisions->currentPage(),
                    "last_page" => $divisions->lastPage(),
                    "per_page" => $divisions->perPage(),
                    "total" => $divisions->total(),
                    "from" => $divisions->firstItem(),
                    "to" => $divisions->lastItem(),
                ],
            ], 200);
        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function all(): JsonResponse 
    {
        try {
            $divisions = Division::all();
            return response()->json([
                "status" => "success",
                "message" => count($divisions) > 0 ? "Berhasil mendapatkan seluruh data divisi." : "Data divisi tidak ditemukan.",
                "data" => $divisions
            ], 200);
        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}

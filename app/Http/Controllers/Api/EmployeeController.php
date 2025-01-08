<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
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
                "message" => "Berhasil mendapatkan data divisi.",
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
}

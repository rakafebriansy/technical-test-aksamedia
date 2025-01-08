<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $employeesQuery = Employee::query();
            $per_page = $request->per_page ?? 10;
            $page = $request->page ?? 1;
    
            if(isset($request->division_id)) {
                $employeesQuery->where('division_id','=',$request->division_id);
            }

            if(isset($request->name)) {
                $employeesQuery->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->name) . '%']);
            }
    
            $employees = $employeesQuery->with('division')->paginate(perPage: $per_page, page: $page);
            return response()->json([
                "status" => "success",
                "message" => count($employees->items()) > 0 ? "Berhasil mendapatkan data karyawan." : "Data karyawan tidak ditemukan.",
                "data" => [
                    "employees" => $employees->items(),
                ],
                "pagination" => [
                    "current_page" => $employees->currentPage(),
                    "last_page" => $employees->lastPage(),
                    "per_page" => $employees->perPage(),
                    "total" => $employees->total(),
                    "from" => $employees->firstItem(),
                    "to" => $employees->lastItem(),
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

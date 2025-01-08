<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

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
    
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'image' => 'required',
                'name' => 'required',
                'phone' => 'required',
                'division_id' => 'required',
                'position' => 'required',
            ]);
            
            // meng-handle jika request berupa multipart/form-data
            $image = $request->file('image') ?? null;
            if($image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('images', $filename ,'public');
                $validated['image'] = 'images/' . $filename;
            }
            
            $employee = new Employee();
            $employee->division_id = $validated['division_id'];
            $employee->fill($validated);
            $employee->id = Str::uuid();
            $employee->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil menambahkan karyawan.',
            ], 201);
        } catch (ValidationException $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $error->errors(),
            ], 422);
        }  catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function update($id,Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'image' => 'nullable',
                'name' => 'nullable',
                'phone' => 'nullable',
                'division_id' => 'nullable',
                'position' => 'nullable',
            ]);

            // meng-handle jika request berupa multipart/form-data
            $image = $request->file('image') ?? null;
            if($image) {
                $filename = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('images', $filename ,'public');
                $validated['image'] = 'images/' . $filename;
            }

            $updated = Employee::where('id','=',$id)->update($validated);

            if(!$updated) {
                throw new \Exception('Employee is not found.');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil memperbarui karyawan.',
            ], 201);
        } catch (ValidationException $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $error->errors(),
            ], 422);
        }  catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}

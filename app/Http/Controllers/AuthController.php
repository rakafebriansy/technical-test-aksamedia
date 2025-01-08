<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'username' => 'required',
                'password' => 'required'
            ]);
    
            if(Auth::attempt($validated)) {
                $user = Auth::user();
    
                $token = $user->createToken('API Token')->plainTextToken;
    
                return response()->json([
                    'status' => 'success',
                    'message' => 'Berhasil mendapatkan data admin.',
                    'data' => [
                        'token' => $token,
                        'admin' => $user,
                    ]
                ],200);
            }
    
            return response()->json([
                'status'=> 'error',
                'message'=> 'Data admin tidak ditemukan.',
                'data'=> []
            ]);
        } catch (ValidationException $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal.',
                'errors' => $error->errors(),
            ], 422);
        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}

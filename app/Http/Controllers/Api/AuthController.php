<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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

            $user = User::where('username', $validated['username'])->first();

            if (!$user || !Hash::check($validated['password'], $user->password)) {
                return response()->json(['error' => 'Kredensial Salah'], 401);
            }

            $token = $user->createToken('Technical Test Aksamedia')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil login.',
                'data' => [
                    'token' => $token,
                    'admin' => $user,
                ]
            ],200);

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
    
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil logout.',
            ],200);
        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function updateName($id,Request $request): JsonResponse
    {
        try {
            Log::info($request->all());
            $validated = $request->validate([
                'name' => 'required',
                'password' => 'required'
            ]);

            $user = User::where('id','=',$id)->first();
            if(!Hash::check($validated['password'],$user->password)) {
                throw new \Exception('Credential is invalid.');
            }
            
            $user->name = $validated['name'];
            $updated = $user->save();

            Log::info($updated);

            if(!$updated) {
                throw new \Exception('User is not found.');
            }

            return response()->json([
                'status' => 'success',
                'data' => $user,
                'message' => 'Berhasil memperbarui nama.',
            ],200);
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

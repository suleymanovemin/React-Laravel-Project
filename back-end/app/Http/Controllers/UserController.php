<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $data = [1,2,3,4,5];
        // return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            "name" => "required|min:3|max:15",
            "surname" => "required|min:3|max:15",
            "email" => "required|email|unique:users",
            "password" => "required|min:6|confirmed",
        ];
        $request->validate($rules);
        try {
            $user = new User();
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);

            if ($user->save()) {
                return response()->json(["message" => "Qeydiyyat Tamamlandı"], 200);
            } else {
                return response()->json(["message" => "Qeydiyyat zamanı xəta baş verdi! "], 500);
            }
        } catch (\Exception $e) {

            return response()->json(["message" => "Qeydiyyat zamanı xəta baş verdi! "], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|string|email|max:255",
            "password" => "required|string|min:6"
        ]);

        if (Auth::attempt(["email" => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            return response()->json(['message' => 'Giriş uğurlu oldu', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'Giriş başarısız'], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function uploadImage(Request $request)
    {
        $file = $request->file('image');
        $request->validate([
            "user_id" => "required|exists:users,id",
            "image" => 'image|mimes:jpeg,png,jpg,gif,svg|max:30000',
        ]);
        $user = User::find($request->user_id);
    
        if (!$user) {
            return response()->json(["error" => "Kullanıcı bulunamadı"], 404);
        }
    
        if ($file->isValid()) {
            $fileName = time() . '_' . $file->getClientOriginalName();
    
            $file->move(public_path('uploads/profile'), $fileName);
    
            $user->profile_image = $fileName;
            $user->save();
    
            return response()->json(["success" => "Şəkil dəyişdirildi"],200);
        }
    
        return response()->json(["error" => "Şəkil yüklənmədi"], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

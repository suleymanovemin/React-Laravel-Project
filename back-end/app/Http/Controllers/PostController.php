<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();

        return response()->json(["success"=>"Postlar alındı","posts"=>$posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function details(Post $id)
    {
        $post = Post::find($id);
    
        return response()->json(["user"=>$post]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $file = $request->file('image');

        $request->validate([
            "title"=>"required|string|min:4|max:255",
            "user_id"=>"required|exists:users,id",
            "description"=>"required|string|min:8|max:2000",
            "image"=>'image|mimes:jpeg,png,jpg,gif,svg|max:30000',
        ]);
        
        if ($file->isValid()) {
            $fileName = time() . '_' . $file->getClientOriginalName();

            $file->move(public_path('uploads'), $fileName);


            $post = new Post();
            $post->title = $request->title;
            $post->description = $request->description;
            $post->user_id = $request->user_id;
            $post->image = $fileName;

            if ($post->save()) {
                return response()->json(['success' => 'Post əlavə olundu!'], 200);
            }

        } else {
            // Dosya geçerli değilse bir hata mesajı gönderin
            return response()->json(['error' => 'Dosya geçerli değil'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}

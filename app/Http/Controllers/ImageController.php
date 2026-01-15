<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    use ApiResponse;

    public function upload(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|image|max:5120',
        ]);

        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('images', $filename, 'public');

        $image = Image::create([
            'filename' => $filename,
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ]);

        return $this->success([
            'id' => $image->id,
            'url' => asset('storage/' . $path),
            'filename' => $filename,
        ], 'Image uploaded successfully', 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $image = Image::find($id);
        
        if (!$image) {
            return $this->error('Image not found', null, 404);
        }

        \Storage::disk('public')->delete($image->path);
        $image->delete();

        return $this->success(null, 'Image deleted successfully');
    }
}

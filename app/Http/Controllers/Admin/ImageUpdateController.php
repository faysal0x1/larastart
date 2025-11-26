<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Repositories\ImageUpdateRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;

class ImageUpdateController extends Controller
{
    public function update(Request $request, string $modelName, int $id)
    {
        try {
            $request->validate([
                'image' => 'required|image|max:2048',
            ]);

            $modelClass = $this->resolveModelClass($modelName);
            $config     = $this->getModelConfig($modelName);

            $repository = new ImageUpdateRepository($modelClass, $config);

            if ($request->hasFile('image')) {
                $repository->updateImage($request->file('image'), $id);

                return success_response('Image updated successfully.');

            }

            return error_response('Image not found', 404);

        } catch (Exception $e) {

            Log::error($e->getMessage());

            return error_response($e->getMessage(), $e->getCode());
        }
    }

    protected function resolveModelClass(string $modelName): string
    {
        $models = [
            'subject'  => Subject::class,
            'brand'    => \App\Models\Brand::class,
            'category' => \App\Models\Category::class,
            'product'  => \App\Models\Product::class,
        ];

        if (! array_key_exists($modelName, $models)) {
            throw new InvalidArgumentException("Model '{$modelName}' is not supported for image updates.");
        }

        return $models[$modelName];
    }

    protected function getModelConfig(string $modelName): array
    {
        $configs = [
            'category' => [
                'storage_path' => 'images/categories',
            ],
            'product'  => [
                'storage_path' => 'images/products',
            ],
            'blog'     => [
                'storage_path' => 'images/blogs',
            ],
            'subject'  => [
                'storage_path' => 'images/subjects',
            ],
            'brand'    => [
                'storage_path' => 'images/brands',
            ],
        ];

        return $configs[$modelName] ?? [
            'storage_path' => 'images/generic',
        ];
    }
}

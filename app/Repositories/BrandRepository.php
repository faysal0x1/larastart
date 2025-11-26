<?php
namespace App\Repositories;

use App\Helpers\QueryBuilderHelper;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class BrandRepository extends BaseRepository
{

    public function __construct(Brand $model)
    {
        parent::__construct($model);
    }
    public function paginate(Request $request, array $columns = ['*']): LengthAwarePaginator
    {
        $query = $this->model->query();

        // Eager-load products count as an attribute instead of trying to eager-load a non-relation method
        $query->withCount(['products as totalProducts']);
        $params          = $request->isMethod('post') ? $request->all() : $request->query();
        $combinedRequest = new Request($params);

        $query = QueryBuilderHelper::apply(
            $combinedRequest,
            $query,
            $this->getSearchableFields(),
            $this->getSortableFields()
        );

        return QueryBuilderHelper::paginate($combinedRequest, $query);
    }
    public function create(array $data): Brand
    {
        return parent::create($data);
    }

    public function update(array $data, int $id): Model
    {
        $brand = Brand::find($id);
        if (! isset($data['image']) || empty($data['image'])) {
            unset($data['image']);
        }


        if (array_key_exists('bottom_description', $data)) {
            $data['bottom_description'] = $data['bottom_description'] === '' ? null : $data['bottom_description'];
        }

        if (array_key_exists('description', $data)) {
            $data['description'] = $data['description'] === '' ? null : $data['description'];
        }

        return parent::update($data, $id);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'slug', 'image', 'status', 'totalProducts'];
    }

    /**
     * Delete multiple brands by IDs.
     */
    public function batchDelete(array $ids): int
    {
        return $this->model->whereIn('id', $ids)->delete();
    }
}

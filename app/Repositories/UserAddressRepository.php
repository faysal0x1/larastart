<?php

// app/Repositories/UserAddressRepository.php

namespace App\Repositories;

use App\Models\UserAddress;

class UserAddressRepository extends BaseRepository
{
    public function __construct(UserAddress $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['address'];
    }

    protected function getSortableFields(): array
    {
        return ['user_id', 'first_name', 'last_name', 'post_code', 'division_id', 'district_id', 'upazilla_id', 'address'];
    }
}

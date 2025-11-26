<?php
namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Division;
use App\Models\Upazilla;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLocationController extends Controller
{
    // ------------------ User Addresses (Cart/Checkout) ------------------
    public function listUserAddresses(Request $request)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $addresses = UserAddress::where('user_id', $userId)
            ->orderByDesc('is_default')
            ->orderByDesc('id')
            ->get()
            ->map(function (UserAddress $addr) {
                $fullName    = trim(trim((string) $addr->first_name) . ' ' . trim((string) $addr->last_name));
                $displayName = $fullName ?: (trim((string) $addr->address) ?: ('Address #' . $addr->id));
                return [
                    'id'          => $addr->id,
                    'name'        => $displayName,
                    'first_name'  => $addr->first_name,
                    'last_name'   => $addr->last_name,
                    'phone'       => $addr->phone,
                    'email'       => $addr->email,
                    'address'     => $addr->address,
                    'post_code'   => $addr->post_code,
                    'division_id' => $addr->division_id,
                    'district_id' => $addr->district_id,
                    'upazilla_id' => $addr->upazilla_id,
                    'city'        => '',
                    'isDefault'   => $addr->is_default,
                ];
            });

        return response()->json(['data' => $addresses]);
    }

    public function storeUserAddress(Request $request)
    {

        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $created = UserAddress::create([
            'user_id'     => $userId,
            'first_name'  => $request->get('first_name'),
            'last_name'   => $request->get('last_name'),
            'phone'       => $request->get('phone'),
            'email'       => $request->get('email'),
            'post_code'   => $request->get('post_code'),
            'division_id' => $request->get('division_id'),
            'district_id' => $request->get('district_id'),
            'upazilla_id' => 1,
            'address'     => $request->get('address'),
            'is_default'  => false,
        ]);

        $fullName    = trim(trim((string) $created->first_name) . ' ' . trim((string) $created->last_name));
        $displayName = $fullName ?: (trim((string) $created->address) ?: ('Address #' . $created->id));
        $response    = [
            'id'          => $created->id,
            'name'        => $displayName,
            'first_name'  => $created->first_name,
            'last_name'   => $created->last_name,
            'phone'       => $created->phone,
            'email'       => $created->email,
            'address'     => $created->address,
            'post_code'   => $created->post_code,
            'division_id' => $created->division_id,
            'district_id' => $created->district_id,
            'upazilla_id' => $created->upazilla_id,
            'city'        => '',
            'isDefault'   => $created->is_default,
        ];

        // If coming from an Inertia form submission, redirect back with updated addresses
        if ($request->header('X-Inertia')) {
            $addresses = UserAddress::where('user_id', $userId)
                ->orderByDesc('is_default')
                ->orderByDesc('id')
                ->get()
                ->map(function (UserAddress $addr) {
                    $fullName    = trim(trim((string) $addr->first_name) . ' ' . trim((string) $addr->last_name));
                    $displayName = $fullName ?: (trim((string) $addr->address) ?: ('Address #' . $addr->id));
                    return [
                        'id'          => $addr->id,
                        'name'        => $displayName,
                        'first_name'  => $addr->first_name,
                        'last_name'   => $addr->last_name,
                        'phone'       => $addr->phone,
                        'email'       => $addr->email,
                        'address'     => $addr->address,
                        'post_code'   => $addr->post_code,
                        'division_id' => $addr->division_id,
                        'district_id' => $addr->district_id,
                        'upazilla_id' => $addr->upazilla_id,
                        'city'        => '',
                        'isDefault'   => $addr->is_default,
                    ];
                });

            return back()->with([
                'addresses' => $addresses,
                'success'   => 'Address added successfully',
            ]);
        }

        return response()->json(['data' => $response], 201);
    }

    public function updateUserAddress(Request $request, $id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $validated = $request->validate([
            'first_name'  => ['required', 'string', 'max:255'],
            'last_name'   => ['nullable', 'string', 'max:255'],
            'phone'       => ['required', 'string', 'max:100'],
            'email'       => ['nullable', 'email', 'max:255'],
            'post_code'   => ['nullable', 'numeric'],
            'division_id' => ['nullable', 'integer'],
            'district_id' => ['nullable', 'integer'],
            'upazilla_id' => ['nullable', 'integer'],
            'address'     => ['required', 'string', 'max:2000'],
        ]);

        $validated['post_code']   = $validated['post_code'] ?: null;
        $validated['division_id'] = $validated['division_id'] ?: null;
        $validated['district_id'] = $validated['district_id'] ?: null;
        $validated['upazilla_id'] = $validated['upazilla_id'] ?: null;

        $address->update([
            'first_name'  => $validated['first_name'],
            'last_name'   => $validated['last_name'],
            'phone'       => $validated['phone'],
            'email'       => $validated['email'],
            'post_code'   => $validated['post_code'],
            'division_id' => $validated['division_id'],
            'district_id' => $validated['district_id'],
            'upazilla_id' => $validated['upazilla_id'],
            'address'     => $validated['address'],
        ]);

        $fullName    = trim(trim((string) $address->first_name) . ' ' . trim((string) $address->last_name));
        $displayName = $fullName ?: (trim((string) $address->address) ?: ('Address #' . $address->id));
        $response    = [
            'id'          => $address->id,
            'name'        => $displayName,
            'first_name'  => $address->first_name,
            'last_name'   => $address->last_name,
            'phone'       => $address->phone,
            'email'       => $address->email,
            'address'     => $address->address,
            'post_code'   => $address->post_code,
            'division_id' => $address->division_id,
            'district_id' => $address->district_id,
            'upazilla_id' => $address->upazilla_id,
            'city'        => '',
            'isDefault'   => $address->is_default,
        ];

        return response()->json(['data' => $response]);
    }

    public function deleteUserAddress($id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $address->delete();

        return response()->json(['message' => 'Address deleted successfully']);
    }

    public function setDefaultUserAddress($id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        UserAddress::where('user_id', $userId)->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return response()->json(['message' => 'Address set as default successfully']);
    }

    public function activateUserAddress($id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        // Deactivate other addresses and activate the selected one
        UserAddress::where('user_id', $userId)->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return response()->json(['message' => 'Address activated successfully']);
    }

    // ------------------ Location lookups ------------------
    public function listDivisions()
    {
        $divisions = Division::orderBy('name')->get(['id', 'name']);
        return response()->json(['data' => $divisions]);
    }

    public function listDistricts(Request $request)
    {
        $validated = $request->validate([
            'division_id' => ['required', 'numeric'],
        ]);
        $districts = District::where('division_id', $validated['division_id'])
            ->orderBy('district_name')
            ->get(['id', 'district_name']);
        return response()->json(['data' => $districts]);
    }

    public function listUpazillas(Request $request)
    {
        $validated = $request->validate([
            'district_id' => ['required', 'numeric'],
        ]);
        $upazillas = Upazilla::where('ship_district_id', $validated['district_id'])
            ->orderBy('upazilla_name')
            ->get(['id', 'upazilla_name']);
        return response()->json(['data' => $upazillas]);
    }
}
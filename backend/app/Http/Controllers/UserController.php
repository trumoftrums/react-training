<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request) {
        $keySearch = $request->input('search');
        $itemPerPage = $request->input('item_per_page', 2);
        $listUser = User::orderBy('id', 'desc');
        if($keySearch){
            $listUser->where('name', 'like', '%'.$keySearch.'%');
        }
        $listUser = $listUser->paginate($itemPerPage);
        return response()->json($listUser);
    }
    public function store(Request $request) {
        $data = $request->input();
        $valid = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
        ])->setAttributeNames(
            [
                'name' => 'Họ Tên',
                'email' => 'Email'
            ]
        );

        if ($valid->passes()) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt('111111'),
            ]);
            return response()->json([
                'code' => 200,
                'message' => "Tạo User $user->name ($user->email) thành công",
                'user' => $user->toArray()
            ]);
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('name') ?: $data['name'] = $errors->first('name');
            !$errors->has('email') ?: $data['email'] = $errors->first('email');
            return response()->json([
                'code' => 400,
                'errors' => $data
            ]);
        }
    }
    public function show($id) {
        echo 'show';
    }
    public function edit($id) {
        echo 'edit';
    }
    public function update(Request $request, $id) {
        $data = $request->input();
        $valid = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        ])->setAttributeNames(
            [
                'name' => 'Họ Tên',
                'email' => 'Email'
            ]
        );

        if ($valid->passes()) {
            $user = User::find($id);
            if ($user != null) {
                $user->name = $data['name'];
                $user->email = $data['email'];
                $user->save();
                return response()->json([
                    'code' => 200,
                    'message' => "Cập nhật User $user->name ($user->email) thành công",
                    'user' => $user->toArray()
                ]);
            } else {
                return response()->json([
                    'code' => 400,
                    'error' => 'Xảy ra lỗi trong lúc cập nhật'
                ]);
            }
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('name') ?: $data['name'] = $errors->first('name');
            !$errors->has('email') ?: $data['email'] = $errors->first('email');
            return response()->json([
                'code' => 400,
                'errors' => $data
            ]);
        }
    }
    public function destroy($id) {
        if ($user = User::find($id)) {
            $user->delete();
            return response()->json([
                'code' => 200,
                'message' => "Đã xóa thành công User $user->name"
            ]);
        }
        return response()->json([
            'code' => 400,
            'error' => 'Xảy ra lỗi trong lúc xóa'
        ]);
    }
}

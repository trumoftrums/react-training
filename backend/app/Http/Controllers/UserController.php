<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index() {
        $listUser = User::all();
        return response()->json($listUser);
    }
    public function store(Request $request) {
        $data = $request->input();
        User::create( [
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ] );
        return response()->json([
            'message' => 'success'
        ]);
    }
    public function show($id) {
        echo 'show';
    }
    public function edit($id) {
        echo 'edit';
    }
    public function update(Request $request, $id) {
        echo 'update';
    }
    public function destroy($id) {
        echo 'destroy';
    }
}

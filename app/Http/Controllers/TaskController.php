<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Task;

class TaskController extends Controller
{
    public function index(){
        return Task::all();
    } 
    public function store(Request $req){
        return Task::create($req->all());
    }
    public function update(Request $req , $id){
        $task = Task::findOrFail($id);
        $task->update($req->all());
        return $task->save();
    }
    public function delete($id){
        $task = Task::findOrFail($id);
        $task->delete();
        return 204;
    }
}

<?php

namespace App\Http\Controllers;

class SPAController extends Controller
{
    /*
    *  Serves the index.html file for the SPA
    */
    public function index(): string
    {
        return view('index')->render();
    }
}

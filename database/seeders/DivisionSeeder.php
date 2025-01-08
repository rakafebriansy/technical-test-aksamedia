<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Division::create([
            'id' => Str::uuid(),
            'name' => 'Mobile Apps'
        ]);
        Division::create([
            'id' => Str::uuid(),
            'name' => 'QA'
        ]);
        Division::create([
            'id' => Str::uuid(),
            'name' => 'Full Stack'
        ]);
        Division::create([
            'id' => Str::uuid(),
            'name' => 'Backend'
        ]);
        Division::create([
            'id' => Str::uuid(),
            'name' => 'Frontend'
        ]);
        Division::create([
            'id' => Str::uuid(),
            'name' => 'UI/UX Designer'
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
{
    private $divisions = ['Mobile Apps','QA','Full Stack','Backend','Frontend','UI/UX Designer'];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i = 0; $i < 20; $i ++) {
            $division = Division::where('name', '=',$this->getRandomDivision())->first();
            Employee::create([
                'id' => Str::uuid(),
                'name' => fake()->name,
                'image' => 'images/pexels-thibault-trillet-44912-167478.webp',
                'phone' => fake()->phoneNumber,
                'position' => fake()->jobTitle,
                'division_id' => $division->id
            ]);
        }
    }

    private function getRandomDivision() {
        shuffle($this->divisions);
        return $this->divisions[0];
    }
}

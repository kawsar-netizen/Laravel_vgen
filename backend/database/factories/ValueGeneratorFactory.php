<?php

namespace Database\Factories;

use App\Models\ValueGenerator;
use Illuminate\Database\Eloquent\Factories\Factory;

class ValueGeneratorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ValueGenerator::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'first_name'=>$this->faker->firstName(),
            'last_name'=>$this->faker->lastName(),
            'completed_projects'=>$this->faker->randomNumber(2)
        ];
    }
}

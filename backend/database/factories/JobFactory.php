<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Job::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title'=>$this->faker->jobTitle(),
            'description'=>$this->faker->paragraph(),
            'job_type'=>$this->faker->randomElement(['hourly','constractual']),
            'work_from'=>$this->faker->boolean(),
            'min_budget'=>$this->faker->randomNumber(3),
            'max_budget'=>$this->faker->randomNumber(5),
            'duration'=>$this->faker->dateTimeThisYear(),
            'deadline'=>$this->faker->date()
            ];
    }
}

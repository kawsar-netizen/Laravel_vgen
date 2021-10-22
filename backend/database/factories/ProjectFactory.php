<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'job_id' => rand(1, 100),
            'value_generator_id' => rand(1, 10),
            'value_seeker_id' => rand(1, 10),
            'progress' => 0,
            'deadline' => now(),
            'status' => rand(0, 2),
            'amount' => rand(1, 1000),
            'total_revision' => 3,
            'Revision_completed' => 0,
            'payment_status' => rand(0, 1),

        ];
    }
}

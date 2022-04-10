<?php

use Illuminate\Support\Facades\Facade;

return [
    'icones' => [
        
    ],

    'default' => [
        'Storage plans' => [
            ['quantity' => 1,
            'price' => 75,
            'duration' => 'year'],

            ['quantity' => 2,
            'price' => 150,
            'duration' => 'year'],

            ['quantity' => 5,
            'price' => 200,
            'duration' => 'year'],

            ['quantity' => 10,
            'price' => 300,
            'duration' => 'year'],

            ['quantity' => 25,
            'price' => 400,
            'duration' => 'year'],

            ['quantity' => 50,
            'price' => 600,
            'duration' => 'year'],

            ['quantity' => 100,
            'price' => 1000,
            'duration' => 'year'],

            ['quantity' => 1,
            'price' => 8,
            'duration' => 'month'],

            ['quantity' => 2,
            'price' => 15,
            'duration' => 'month'],

            ['quantity' => 5,
            'price' => 40,
            'duration' => 'month'],

            ['quantity' => 10,
            'price' => 60,
            'duration' => 'month'],

            ['quantity' => 25,
            'price' => 80,
            'duration' => 'month'],

            ['quantity' => 50,
            'price' => 100,
            'duration' => 'month'],

            ['quantity' => 100,
            'price' => 170,
            'duration' => 'month'],

            // UL plans
            ['price' => 500,
            'duration' => 'month',
            'type' => 'unlimited'],

            ['price' => 4500,
            'duration' => 'year',
            'type' => 'unlimited'],
        ],

        'Web hosting plans' => [
            ['quantity' => 1,
            'price' => 25,
            'duration' => 'month'],

            ['quantity' => 3,
            'price' => 50,
            'duration' => 'month'],

            ['quantity' => 5,
            'price' => 75,
            'duration' => 'month'],

            ['quantity' => 10,
            'price' => 100,
            'duration' => 'month'],

            ['price' => 500,
            'duration' => 'month',
            'type' => 'unlimited',
            'discount' => 0.1],
        ],

        'Email plans' => [
            ['quantity' => 1,
            'price' => 25,
            'duration' => 'month'],

            ['quantity' => 2,
            'price' => 45,
            'duration' => 'month'],

            ['quantity' => 5,
            'price' => 90,
            'duration' => 'month'],

            ['quantity' => 10,
            'price' => 150,
            'duration' => 'month'],

            ['price' => 500,
            'duration' => 'month',
            'type' => 'unlimited'],
        ],

        'Domains' => [
            ['quantity' => 1,
            'price' => 1500,
            'duration' => 'year'],
        ],

        'Backup plans' => [
            ['backup_rate' => 'yearly',
            'price' => 50,
            'duration' => 'year'],

            ['backup_rate' => 'monthly',
            'price' => 12,
            'duration' => 'month'],

            ['backup_rate' => 'weekly',
            'price' => 20,
            'duration' => 'month'],

            ['backup_rate' => 'daily',
            'price' => 30,
            'duration' => 'month'],
        ]
    ],
];
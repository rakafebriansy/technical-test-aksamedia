<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NilaiRTResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nama' => $this->nama,
            'nisn' => $this->nisn,
            'nilai' => [
                "realistic" => $this->realistic,
                "investigative" => $this->investigative,
                "artistic" => $this->artistic,
                "social" => $this->social,
                "enterprising" => $this->enterprising,
                "conventional" => $this->conventional,
            ]
        ];
    }
}

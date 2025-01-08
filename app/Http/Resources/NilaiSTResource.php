<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NilaiSTResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'listNilai' => [
                'figural' => (float)$this->figural,
                'kuantitatif' => (float)$this->kuantitatif,
                'penalaran' => (float)$this->penalaran,
                'verbal' => (float)$this->verbal,
            ],
            'nama' => $this->nama,
            'nisn' => $this->nisn,
            'total' => (float)$this->total
        ];
    }
}

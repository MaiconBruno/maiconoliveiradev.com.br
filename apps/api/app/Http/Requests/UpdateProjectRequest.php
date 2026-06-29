<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesProjectData;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    use ValidatesProjectData;

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return $this->projectRules($this->route('project')->id);
    }
}

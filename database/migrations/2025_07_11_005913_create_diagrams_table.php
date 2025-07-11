<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diagrams', function (Blueprint $table) {
            $table->id();
            $table->text('prompt'); // Para texto largo
            $table->string('xml', 255); // Hasta 255 caracteres
            $table->softDeletes(); // Campo deleted_at para fecha de borrado

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagrams');
    }
};

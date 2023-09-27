<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // 100 adet rastgele yorum ekleyelim
        for ($i = 1; $i <= 100; $i++) {
            DB::table('comments')->insert([
                'user_id' => 1, // Kullanıcı ID'sini 1 olarak ayarlayın
                'post_id' => 2, // Post ID'sini 2 olarak ayarlayın
                'comment' => $this->getRandomComment(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function getRandomComment()
    {
        $comments = [
            'Harika bir gönderi!',
            'Bu gerçekten ilginç.',
            'Teşekkürler paylaşım için.',
            'Etkileyici!',
            'Bu konuda daha fazlasını öğrenmek istiyorum.',
            'Harika bir iş çıkarmışsınız.',
            'Sorularınız varsa sormaktan çekinmeyin.',
            'Teşekkürler!',
            'Başka neler paylaşacaksınız?',
            'Çok bilgilendirici.',
        ];

        return $comments[array_rand($comments)];
    }
}

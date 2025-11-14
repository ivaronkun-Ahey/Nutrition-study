/**
 * Загрузочная сцена - первая сцена игры
 */
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Создаем прогресс-бар загрузки
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Заголовок
        const title = this.add.text(centerX, centerY - 100, 'Nutrition Quest', {
            fontSize: '64px',
            fontFamily: 'Arial, sans-serif',
            color: '#4CAF50',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Подзаголовок
        const subtitle = this.add.text(centerX, centerY - 40, 'Путешествие в мир питания', {
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            color: '#666666'
        }).setOrigin(0.5);

        // Фон прогресс-бара
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0xcccccc, 1);
        progressBox.fillRoundedRect(centerX - 200, centerY + 20, 400, 30, 5);

        // Прогресс-бар
        const progressBar = this.add.graphics();

        // Текст загрузки
        const loadingText = this.add.text(centerX, centerY + 70, 'Загрузка...', {
            fontSize: '20px',
            fontFamily: 'Arial, sans-serif',
            color: '#555555'
        }).setOrigin(0.5);

        // Обновление прогресса
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(COLORS.success, 1);
            progressBar.fillRoundedRect(centerX - 200, centerY + 20, 400 * value, 30, 5);

            loadingText.setText(`Загрузка... ${Math.round(value * 100)}%`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.setText('Готово!');

            // Небольшая задержка перед переходом
            this.time.delayedCall(500, () => {
                this.scene.start('MenuScene');
            });
        });

        // Здесь будет загрузка ассетов (пока заглушка)
        // В будущем добавим:
        // this.load.image('background', 'assets/images/background.png');
        // this.load.audio('bgmusic', 'assets/audio/music.mp3');

        // Симулируем загрузку для демонстрации
        for (let i = 0; i < 10; i++) {
            this.load.image(`placeholder_${i}`, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        }
    }

    create() {
        console.log('BootScene: Загрузка завершена');
    }
}

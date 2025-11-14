/**
 * Главное меню игры
 */
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xf0f8ff).setOrigin(0);

        // Заголовок
        this.add.text(centerX, 100, 'NUTRITION QUEST', {
            fontSize: '72px',
            fontFamily: 'Arial, sans-serif',
            color: '#4CAF50',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Подзаголовок
        this.add.text(centerX, 180, 'Изучай питание через игру!', {
            fontSize: '28px',
            fontFamily: 'Arial, sans-serif',
            color: '#666666'
        }).setOrigin(0.5);

        // Декоративные элементы - "нутриенты"
        this.createFloatingNutrients();

        // Кнопки меню
        const buttonY = centerY + 50;
        const buttonSpacing = 90;

        // Кнопка "Начать игру"
        new Button(
            this,
            centerX,
            buttonY,
            'Начать игру',
            () => this.scene.start('LevelSelectScene'),
            {
                width: 300,
                height: 70,
                backgroundColor: COLORS.primary,
                fontSize: '32px'
            }
        );

        // Кнопка "Справочник"
        new Button(
            this,
            centerX,
            buttonY + buttonSpacing,
            'Справочник',
            () => this.scene.start('ReferenceScene'),
            {
                width: 300,
                height: 70,
                backgroundColor: COLORS.accent,
                fontSize: '32px'
            }
        );

        // Кнопка "Трекер питания"
        new Button(
            this,
            centerX,
            buttonY + buttonSpacing * 2,
            'Трекер питания',
            () => this.scene.start('TrackerScene'),
            {
                width: 300,
                height: 70,
                backgroundColor: COLORS.warning,
                fontSize: '32px'
            }
        );

        // Информация о прогрессе
        this.displayProgress();

        // Версия и копирайт
        this.add.text(10, this.scale.height - 30, 'v1.0.0', {
            fontSize: '16px',
            color: '#999999'
        });

        this.add.text(this.scale.width - 10, this.scale.height - 30,
            'Основано на данных ВОЗ, NIH, CDC', {
            fontSize: '16px',
            color: '#999999'
        }).setOrigin(1, 0);
    }

    createFloatingNutrients() {
        // Создаем плавающие иконки нутриентов
        const nutrients = [
            { x: 100, y: 150, color: COLORS.protein, size: 40 },
            { x: this.scale.width - 100, y: 200, color: COLORS.carbs, size: 50 },
            { x: 150, y: this.scale.height - 150, color: COLORS.fats, size: 45 },
            { x: this.scale.width - 150, y: this.scale.height - 100, color: COLORS.vitamins, size: 35 },
            { x: 200, y: 350, color: COLORS.success, size: 30 },
            { x: this.scale.width - 200, y: 400, color: COLORS.info, size: 38 }
        ];

        nutrients.forEach((nutrient, index) => {
            const circle = this.add.circle(nutrient.x, nutrient.y, nutrient.size, nutrient.color, 0.3);

            // Плавающая анимация
            this.tweens.add({
                targets: circle,
                y: nutrient.y + (index % 2 === 0 ? 20 : -20),
                duration: 2000 + (index * 300),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Пульсация
            this.tweens.add({
                targets: circle,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 1500 + (index * 200),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    displayProgress() {
        const progress = window.ProgressManager.getProgress();
        const completionPercent = window.ProgressManager.getCompletionPercentage();
        const totalStars = window.ProgressManager.getTotalStars();

        const infoX = this.scale.width / 2;
        const infoY = this.scale.height - 100;

        // Фон для информации
        const infoBg = this.add.graphics();
        infoBg.fillStyle(0xffffff, 0.8);
        infoBg.fillRoundedRect(infoX - 250, infoY - 40, 500, 70, 10);

        // Текст прогресса
        this.add.text(infoX, infoY - 15, `Прогресс: ${completionPercent}%`, {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(infoX, infoY + 15, `⭐ Звезд собрано: ${totalStars}/24 | Уровней пройдено: ${progress.completedLevels.length}/8`, {
            fontSize: '18px',
            color: '#666666'
        }).setOrigin(0.5);
    }
}

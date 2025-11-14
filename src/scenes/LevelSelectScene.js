/**
 * Сцена выбора уровня
 */
class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xf0f8ff).setOrigin(0);

        // Заголовок
        this.add.text(centerX, 50, 'Выбери уровень', {
            fontSize: '48px',
            fontFamily: 'Arial, sans-serif',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Кнопка назад
        new Button(
            this,
            80,
            50,
            '← Назад',
            () => this.scene.start('MenuScene'),
            {
                width: 140,
                height: 50,
                backgroundColor: COLORS.dark,
                fontSize: '20px'
            }
        );

        // Создаем карточки уровней
        this.createLevelCards();
    }

    createLevelCards() {
        const startX = 150;
        const startY = 150;
        const cardWidth = 250;
        const cardHeight = 180;
        const cols = 4;
        const spacingX = 280;
        const spacingY = 220;

        Object.keys(LEVELS).forEach((levelNum, index) => {
            const level = LEVELS[levelNum];
            const col = index % cols;
            const row = Math.floor(index / cols);

            const x = startX + (col * spacingX);
            const y = startY + (row * spacingY);

            this.createLevelCard(levelNum, level, x, y, cardWidth, cardHeight);
        });
    }

    createLevelCard(levelNum, level, x, y, width, height) {
        const isUnlocked = window.ProgressManager.isLevelUnlocked(levelNum);
        const isCompleted = window.ProgressManager.isLevelCompleted(levelNum);
        const stars = window.ProgressManager.getLevelStars(levelNum);

        // Контейнер карточки
        const card = this.add.container(x, y);

        // Фон карточки
        const bg = this.add.graphics();
        bg.fillStyle(isUnlocked ? level.color : 0xcccccc, 1);
        bg.fillRoundedRect(0, 0, width, height, 15);
        bg.lineStyle(4, isCompleted ? COLORS.success : 0x999999, 1);
        bg.strokeRoundedRect(0, 0, width, height, 15);

        // Номер уровня
        const levelNumber = this.add.text(width / 2, 30, `Уровень ${levelNum}`, {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Название уровня
        const levelName = this.add.text(width / 2, 70, level.name, {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: width - 20 }
        }).setOrigin(0.5);

        // Звезды
        if (isCompleted) {
            const starsY = 120;
            const starSpacing = 40;
            const startX = width / 2 - starSpacing;

            for (let i = 0; i < 3; i++) {
                const starX = startX + (i * starSpacing);
                const starText = this.add.text(starX, starsY, i < stars ? '⭐' : '☆', {
                    fontSize: '28px'
                }).setOrigin(0.5);
                card.add(starText);
            }
        }

        // Иконка замка для заблокированных уровней
        if (!isUnlocked) {
            const lock = this.add.text(width / 2, 120, '🔒', {
                fontSize: '48px'
            }).setOrigin(0.5);
            card.add(lock);
        }

        card.add([bg, levelNumber, levelName]);

        // Интерактивность
        if (isUnlocked) {
            bg.setInteractive(
                new Phaser.Geom.Rectangle(0, 0, width, height),
                Phaser.Geom.Rectangle.Contains
            );

            bg.on('pointerover', () => {
                this.tweens.add({
                    targets: card,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 100
                });
            });

            bg.on('pointerout', () => {
                this.tweens.add({
                    targets: card,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100
                });
            });

            bg.on('pointerdown', () => {
                this.tweens.add({
                    targets: card,
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 50,
                    yoyo: true,
                    onComplete: () => {
                        this.startLevel(levelNum, level);
                    }
                });
            });
        }

        return card;
    }

    startLevel(levelNum, level) {
        // Показываем образовательный контент перед уровнем
        const educational = window.DataManager.getEducationalContent(levelNum);

        const dialog = new Dialog(this, {
            title: educational.title,
            message: `${educational.introduction}\n\nНажмите "Начать", чтобы пройти обучение и испытание!`,
            width: 700,
            height: 350,
            buttons: [
                {
                    text: 'Отмена',
                    color: COLORS.dark,
                    callback: () => {}
                },
                {
                    text: 'Начать',
                    color: COLORS.success,
                    callback: () => {
                        this.scene.start(level.key, { levelNum: levelNum });
                    }
                }
            ]
        });
    }
}

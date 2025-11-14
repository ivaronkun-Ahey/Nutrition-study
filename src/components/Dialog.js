/**
 * Компонент диалогового окна
 */
class Dialog {
    constructor(scene, config = {}) {
        this.scene = scene;
        this.config = {
            title: config.title || 'Сообщение',
            message: config.message || '',
            width: config.width || 600,
            height: config.height || 400,
            buttons: config.buttons || [{ text: 'OK', callback: null }],
            closable: config.closable !== false,
            ...config
        };

        this.create();
    }

    create() {
        const centerX = this.scene.scale.width / 2;
        const centerY = this.scene.scale.height / 2;

        // Затемненный фон
        this.overlay = this.scene.add.graphics();
        this.overlay.fillStyle(0x000000, 0.7);
        this.overlay.fillRect(0, 0, this.scene.scale.width, this.scene.scale.height);
        this.overlay.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, this.scene.scale.width, this.scene.scale.height),
            Phaser.Geom.Rectangle.Contains
        );
        this.overlay.setDepth(1000);

        // Контейнер диалога
        this.container = this.scene.add.container(centerX, centerY);
        this.container.setDepth(1001);

        // Фон диалога
        this.background = this.scene.add.graphics();
        this.background.fillStyle(0xffffff, 1);
        this.background.fillRoundedRect(
            -this.config.width / 2,
            -this.config.height / 2,
            this.config.width,
            this.config.height,
            15
        );
        this.background.lineStyle(4, COLORS.primary, 1);
        this.background.strokeRoundedRect(
            -this.config.width / 2,
            -this.config.height / 2,
            this.config.width,
            this.config.height,
            15
        );

        // Заголовок
        this.titleText = this.scene.add.text(0, -this.config.height / 2 + 40, this.config.title, {
            fontSize: '32px',
            color: '#333333',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        // Сообщение
        this.messageText = this.scene.add.text(0, -this.config.height / 2 + 120, this.config.message, {
            fontSize: '20px',
            color: '#555555',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: this.config.width - 60 }
        }).setOrigin(0.5, 0);

        // Добавляем в контейнер
        this.container.add([this.background, this.titleText, this.messageText]);

        // Кнопка закрытия
        if (this.config.closable) {
            this.closeButton = this.scene.add.text(
                this.config.width / 2 - 30,
                -this.config.height / 2 + 20,
                '✕',
                {
                    fontSize: '32px',
                    color: '#999999',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.close());

            this.container.add(this.closeButton);
        }

        // Кнопки действий
        this.createButtons();

        // Анимация появления
        this.container.setScale(0);
        this.overlay.setAlpha(0);

        this.scene.tweens.add({
            targets: this.overlay,
            alpha: 0.7,
            duration: 200
        });

        this.scene.tweens.add({
            targets: this.container,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });

        return this.container;
    }

    createButtons() {
        const buttonY = this.config.height / 2 - 60;
        const buttonSpacing = 220;
        const totalWidth = (this.config.buttons.length - 1) * buttonSpacing;
        const startX = -totalWidth / 2;

        this.buttons = [];

        this.config.buttons.forEach((buttonConfig, index) => {
            const buttonX = startX + (index * buttonSpacing);

            const button = new Button(
                this.scene,
                buttonX,
                buttonY,
                buttonConfig.text,
                () => {
                    if (buttonConfig.callback) {
                        buttonConfig.callback();
                    }
                    this.close();
                },
                {
                    width: 180,
                    height: 50,
                    backgroundColor: buttonConfig.color || COLORS.primary
                }
            );

            this.buttons.push(button);
            this.container.add(button.container);
        });
    }

    setMessage(message) {
        this.messageText.setText(message);
    }

    close() {
        // Анимация закрытия
        this.scene.tweens.add({
            targets: this.overlay,
            alpha: 0,
            duration: 200
        });

        this.scene.tweens.add({
            targets: this.container,
            scaleX: 0,
            scaleY: 0,
            duration: 200,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.destroy();
            }
        });
    }

    destroy() {
        this.overlay.destroy();
        this.buttons.forEach(button => button.destroy());
        this.container.destroy();
    }
}

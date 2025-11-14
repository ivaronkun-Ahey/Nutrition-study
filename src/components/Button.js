/**
 * Компонент кнопки
 */
class Button {
    constructor(scene, x, y, text, onClick, style = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = text;
        this.onClick = onClick;

        // Стиль по умолчанию
        this.style = {
            width: style.width || 200,
            height: style.height || 60,
            backgroundColor: style.backgroundColor || COLORS.primary,
            hoverColor: style.hoverColor || COLORS.success,
            textColor: style.textColor || '#ffffff',
            fontSize: style.fontSize || '24px',
            borderRadius: style.borderRadius || 10,
            ...style
        };

        this.create();
    }

    create() {
        // Контейнер для кнопки
        this.container = this.scene.add.container(this.x, this.y);

        // Фон кнопки
        this.background = this.scene.add.graphics();
        this.drawBackground(this.style.backgroundColor);

        // Текст кнопки
        this.textObj = this.scene.add.text(0, 0, this.text, {
            fontSize: this.style.fontSize,
            color: this.style.textColor,
            fontStyle: 'bold',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        // Добавляем в контейнер
        this.container.add([this.background, this.textObj]);

        // Интерактивность
        this.background.setInteractive(
            new Phaser.Geom.Rectangle(
                -this.style.width / 2,
                -this.style.height / 2,
                this.style.width,
                this.style.height
            ),
            Phaser.Geom.Rectangle.Contains
        );

        // События
        this.background.on('pointerover', () => this.onHover());
        this.background.on('pointerout', () => this.onOut());
        this.background.on('pointerdown', () => this.onDown());
        this.background.on('pointerup', () => this.onUp());

        return this.container;
    }

    drawBackground(color) {
        this.background.clear();
        this.background.fillStyle(color, 1);
        this.background.fillRoundedRect(
            -this.style.width / 2,
            -this.style.height / 2,
            this.style.width,
            this.style.height,
            this.style.borderRadius
        );
    }

    onHover() {
        this.drawBackground(this.style.hoverColor);
        this.scene.tweens.add({
            targets: this.container,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 100,
            ease: 'Power2'
        });
    }

    onOut() {
        this.drawBackground(this.style.backgroundColor);
        this.scene.tweens.add({
            targets: this.container,
            scaleX: 1,
            scaleY: 1,
            duration: 100,
            ease: 'Power2'
        });
    }

    onDown() {
        this.scene.tweens.add({
            targets: this.container,
            scaleX: 0.95,
            scaleY: 0.95,
            duration: 50,
            ease: 'Power2'
        });
    }

    onUp() {
        this.scene.tweens.add({
            targets: this.container,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 50,
            ease: 'Power2',
            onComplete: () => {
                if (this.onClick) {
                    this.onClick();
                }
            }
        });
    }

    setText(newText) {
        this.text = newText;
        this.textObj.setText(newText);
    }

    setEnabled(enabled) {
        this.background.removeAllListeners();
        if (enabled) {
            this.background.on('pointerover', () => this.onHover());
            this.background.on('pointerout', () => this.onOut());
            this.background.on('pointerdown', () => this.onDown());
            this.background.on('pointerup', () => this.onUp());
            this.container.setAlpha(1);
        } else {
            this.container.setAlpha(0.5);
        }
    }

    destroy() {
        this.container.destroy();
    }
}

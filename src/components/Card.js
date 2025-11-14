/**
 * Компонент карточки продукта/нутриента
 */
class Card {
    constructor(scene, x, y, data, options = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.data = data; // Данные продукта или нутриента

        this.options = {
            width: options.width || 150,
            height: options.height || 200,
            draggable: options.draggable || false,
            onClick: options.onClick || null,
            showDetails: options.showDetails !== false,
            backgroundColor: options.backgroundColor || 0xffffff,
            ...options
        };

        this.create();
    }

    create() {
        // Контейнер карточки
        this.container = this.scene.add.container(this.x, this.y);

        // Фон карточки
        this.background = this.scene.add.graphics();
        this.background.fillStyle(this.options.backgroundColor, 1);
        this.background.fillRoundedRect(
            -this.options.width / 2,
            -this.options.height / 2,
            this.options.width,
            this.options.height,
            10
        );
        this.background.lineStyle(3, COLORS.primary, 1);
        this.background.strokeRoundedRect(
            -this.options.width / 2,
            -this.options.height / 2,
            this.options.width,
            this.options.height,
            10
        );

        // Иконка/изображение (заглушка - цветной круг)
        const iconColor = this.getIconColor();
        this.icon = this.scene.add.circle(0, -50, 35, iconColor);

        // Название
        this.title = this.scene.add.text(0, 10, this.data.name || 'Продукт', {
            fontSize: '18px',
            color: '#333333',
            fontStyle: 'bold',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: { width: this.options.width - 20 }
        }).setOrigin(0.5);

        // Детали (калории и т.д.)
        if (this.options.showDetails && this.data.calories !== undefined) {
            this.details = this.scene.add.text(0, 60, this.getDetailsText(), {
                fontSize: '14px',
                color: '#666666',
                fontFamily: 'Arial',
                align: 'center'
            }).setOrigin(0.5);
            this.container.add(this.details);
        }

        // Добавляем в контейнер
        this.container.add([this.background, this.icon, this.title]);

        // Интерактивность
        if (this.options.draggable || this.options.onClick) {
            this.container.setSize(this.options.width, this.options.height);
            this.container.setInteractive({ draggable: this.options.draggable });

            if (this.options.onClick) {
                this.container.on('pointerdown', this.options.onClick);
            }

            // Эффекты наведения
            this.container.on('pointerover', () => {
                this.scene.tweens.add({
                    targets: this.container,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 100
                });
            });

            this.container.on('pointerout', () => {
                this.scene.tweens.add({
                    targets: this.container,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100
                });
            });
        }

        // Drag & Drop
        if (this.options.draggable) {
            this.setupDragDrop();
        }

        return this.container;
    }

    getIconColor() {
        // Цвет иконки в зависимости от категории
        if (this.data.category) {
            const categoryColors = {
                'protein': COLORS.protein,
                'carbs': COLORS.carbs,
                'fats': COLORS.fats,
                'vegetables': COLORS.success,
                'fruits': COLORS.warning,
                'dairy': COLORS.info,
                'grains': COLORS.carbs,
                'vitamins': COLORS.vitamins,
                'minerals': COLORS.minerals
            };
            return categoryColors[this.data.category] || COLORS.primary;
        }
        return COLORS.primary;
    }

    getDetailsText() {
        let text = '';
        if (this.data.calories !== undefined) {
            text += `${this.data.calories} ккал\n`;
        }
        if (this.data.protein !== undefined) {
            text += `Б: ${this.data.protein}г `;
        }
        if (this.data.carbs !== undefined) {
            text += `У: ${this.data.carbs}г `;
        }
        if (this.data.fats !== undefined) {
            text += `Ж: ${this.data.fats}г`;
        }
        return text.trim();
    }

    setupDragDrop() {
        this.originalX = this.x;
        this.originalY = this.y;

        this.container.on('drag', (pointer, dragX, dragY) => {
            this.container.x = dragX;
            this.container.y = dragY;
        });

        this.container.on('dragstart', () => {
            this.scene.children.bringToTop(this.container);
            this.container.setScale(1.1);
        });

        this.container.on('dragend', () => {
            this.container.setScale(1);
        });
    }

    resetPosition() {
        this.scene.tweens.add({
            targets: this.container,
            x: this.originalX,
            y: this.originalY,
            duration: 300,
            ease: 'Back.easeOut'
        });
    }

    highlight(color = COLORS.success) {
        this.background.clear();
        this.background.fillStyle(0xffffff, 1);
        this.background.fillRoundedRect(
            -this.options.width / 2,
            -this.options.height / 2,
            this.options.width,
            this.options.height,
            10
        );
        this.background.lineStyle(5, color, 1);
        this.background.strokeRoundedRect(
            -this.options.width / 2,
            -this.options.height / 2,
            this.options.width,
            this.options.height,
            10
        );
    }

    destroy() {
        this.container.destroy();
    }
}

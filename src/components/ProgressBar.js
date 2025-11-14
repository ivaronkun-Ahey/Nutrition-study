/**
 * Компонент прогресс-бара
 */
class ProgressBar {
    constructor(scene, x, y, config = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.config = {
            width: config.width || 300,
            height: config.height || 30,
            backgroundColor: config.backgroundColor || 0xcccccc,
            fillColor: config.fillColor || COLORS.success,
            borderColor: config.borderColor || COLORS.dark,
            borderWidth: config.borderWidth || 2,
            showPercentage: config.showPercentage !== false,
            animated: config.animated !== false,
            ...config
        };

        this.value = 0;
        this.maxValue = config.maxValue || 100;

        this.create();
    }

    create() {
        this.container = this.scene.add.container(this.x, this.y);

        // Фон
        this.bgBar = this.scene.add.graphics();
        this.bgBar.fillStyle(this.config.backgroundColor, 1);
        this.bgBar.fillRoundedRect(0, 0, this.config.width, this.config.height, 5);

        // Прогресс
        this.fillBar = this.scene.add.graphics();

        // Граница
        this.border = this.scene.add.graphics();
        this.border.lineStyle(this.config.borderWidth, this.config.borderColor, 1);
        this.border.strokeRoundedRect(0, 0, this.config.width, this.config.height, 5);

        // Текст процентов
        if (this.config.showPercentage) {
            this.percentText = this.scene.add.text(
                this.config.width / 2,
                this.config.height / 2,
                '0%',
                {
                    fontSize: '18px',
                    color: '#ffffff',
                    fontStyle: 'bold',
                    fontFamily: 'Arial'
                }
            ).setOrigin(0.5);
            this.container.add(this.percentText);
        }

        this.container.add([this.bgBar, this.fillBar, this.border]);

        this.updateBar();

        return this.container;
    }

    updateBar() {
        this.fillBar.clear();

        const percent = Math.min(this.value / this.maxValue, 1);
        const fillWidth = this.config.width * percent;

        if (fillWidth > 0) {
            this.fillBar.fillStyle(this.config.fillColor, 1);
            this.fillBar.fillRoundedRect(0, 0, fillWidth, this.config.height, 5);
        }

        if (this.config.showPercentage) {
            this.percentText.setText(`${Math.round(percent * 100)}%`);
        }
    }

    setValue(value, animated = true) {
        const targetValue = Math.max(0, Math.min(value, this.maxValue));

        if (animated && this.config.animated) {
            this.scene.tweens.addCounter({
                from: this.value,
                to: targetValue,
                duration: 500,
                ease: 'Power2',
                onUpdate: (tween) => {
                    this.value = tween.getValue();
                    this.updateBar();
                }
            });
        } else {
            this.value = targetValue;
            this.updateBar();
        }
    }

    getValue() {
        return this.value;
    }

    setMaxValue(maxValue) {
        this.maxValue = maxValue;
        this.updateBar();
    }

    setFillColor(color) {
        this.config.fillColor = color;
        this.updateBar();
    }

    destroy() {
        this.container.destroy();
    }
}

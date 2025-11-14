/**
 * Главный файл запуска игры
 */

// Создаем игру
const game = new Phaser.Game(GameConfig);

// Глобальные переменные
window.gameState = {
    currentLevel: 1,
    completedLevels: [],
    score: 0,
    achievements: [],
    playerProfile: {
        age: null,
        gender: null,
        activityLevel: null
    }
};

// Утилитарные функции
window.gameUtils = {
    /**
     * Форматирование чисел с разделителями
     */
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },

    /**
     * Получение размера экрана
     */
    getScreenSize: function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile: window.innerWidth < 768,
            isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
            isDesktop: window.innerWidth >= 1024
        };
    },

    /**
     * Создание кнопки с текстом
     */
    createTextButton: function(scene, x, y, text, style, callback) {
        const button = scene.add.text(x, y, text, style)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => button.setScale(1.1))
            .on('pointerout', () => button.setScale(1))
            .on('pointerdown', callback);

        return button;
    },

    /**
     * Анимация появления
     */
    fadeIn: function(scene, object, duration = 500) {
        object.setAlpha(0);
        scene.tweens.add({
            targets: object,
            alpha: 1,
            duration: duration,
            ease: 'Power2'
        });
    },

    /**
     * Анимация исчезновения
     */
    fadeOut: function(scene, object, duration = 500, onComplete = null) {
        scene.tweens.add({
            targets: object,
            alpha: 0,
            duration: duration,
            ease: 'Power2',
            onComplete: onComplete
        });
    }
};

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    game.scale.refresh();
});

// Предотвращение случайного закрытия
window.addEventListener('beforeunload', (e) => {
    // Сохраняем прогресс
    if (window.ProgressManager) {
        window.ProgressManager.saveProgress();
    }
});

console.log('🎮 Nutrition Quest загружена!');
console.log('📱 Устройство:', window.gameUtils.getScreenSize());

/**
 * Главный файл запуска игры
 */

// Проверяем, что Phaser загружен
if (typeof Phaser === 'undefined') {
    console.error('❌ Phaser не загружен! Проверьте подключение к интернету.');
    document.body.innerHTML = '<div style="color: white; text-align: center; padding: 50px; font-family: Arial;"><h1>Ошибка загрузки</h1><p>Не удалось загрузить игровой движок Phaser. Проверьте подключение к интернету и обновите страницу.</p></div>';
    throw new Error('Phaser is not loaded');
}

// Проверяем, что все необходимые классы определены
const requiredClasses = ['BootScene', 'MenuScene', 'LevelSelectScene', 'Button', 'ProgressManager'];
const missingClasses = requiredClasses.filter(className => typeof window[className] === 'undefined' && typeof eval(className) === 'undefined');

if (missingClasses.length > 0) {
    console.error('❌ Не загружены классы:', missingClasses);
    document.body.innerHTML = '<div style="color: white; text-align: center; padding: 50px; font-family: Arial;"><h1>Ошибка загрузки</h1><p>Не загружены некоторые компоненты игры: ' + missingClasses.join(', ') + '</p></div>';
    throw new Error('Missing required classes: ' + missingClasses.join(', '));
}

console.log('✅ Все компоненты загружены успешно');
console.log('✅ Phaser версия:', Phaser.VERSION);

// Создаем игру с обработкой ошибок
let game;
try {
    game = new Phaser.Game(GameConfig);
    console.log('✅ Игра инициализирована');
} catch (error) {
    console.error('❌ Ошибка инициализации игры:', error);
    document.body.innerHTML = '<div style="color: white; text-align: center; padding: 50px; font-family: Arial;"><h1>Ошибка инициализации</h1><p>Не удалось запустить игру: ' + error.message + '</p></div>';
    throw error;
}

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

// Обновление индикатора загрузки
function updateLoadingIndicator(progress, status) {
    const loadingBar = document.getElementById('loading-bar');
    const loadingStatus = document.getElementById('loading-status');
    if (loadingBar) loadingBar.style.width = progress + '%';
    if (loadingStatus) loadingStatus.textContent = status;
}

// Скрыть индикатор загрузки когда игра готова
function hideLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.transition = 'opacity 0.5s';
        indicator.style.opacity = '0';
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 500);
    }
}

// Обновляем прогресс загрузки
updateLoadingIndicator(100, 'Запуск игры...');

// Скрываем индикатор через небольшую задержку, чтобы дать игре время инициализироваться
setTimeout(() => {
    hideLoadingIndicator();
}, 1000);

console.log('🎮 Nutrition Quest загружена!');
console.log('📱 Устройство:', window.gameUtils.getScreenSize());

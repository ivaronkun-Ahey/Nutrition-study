/**
 * Конфигурация Phaser игры
 */
const GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#f0f8ff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        min: {
            width: 320,
            height: 568
        },
        max: {
            width: 1920,
            height: 1080
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        MenuScene,
        LevelSelectScene,
        Level1_Calories,
        Level2_Proteins,
        Level3_Carbs,
        Level4_Fats,
        Level5_Vitamins,
        Level6_Balance,
        Level7_Needs,
        Level8_Digestion,
        ReferenceScene,
        TrackerScene
    ],
    // Настройки для мобильных устройств
    input: {
        activePointers: 3 // Поддержка мультитач
    },
    render: {
        pixelArt: false,
        antialias: true,
        roundPixels: true
    }
};

// Глобальные константы игры
const COLORS = {
    primary: 0x4CAF50,      // Зеленый
    secondary: 0xFF9800,    // Оранжевый
    accent: 0x2196F3,       // Синий
    danger: 0xF44336,       // Красный
    success: 0x8BC34A,      // Светло-зеленый
    warning: 0xFFC107,      // Желтый
    info: 0x00BCD4,         // Голубой
    light: 0xFFFFFF,        // Белый
    dark: 0x333333,         // Темно-серый

    // Цвета для нутриентов
    protein: 0xE91E63,      // Розовый (белки)
    carbs: 0xFFEB3B,        // Желтый (углеводы)
    fats: 0xFF5722,         // Оранжевый (жиры)
    vitamins: 0x9C27B0,     // Фиолетовый (витамины)
    minerals: 0x795548,     // Коричневый (минералы)
    water: 0x03A9F4         // Голубой (вода)
};

const FONTS = {
    title: {
        fontSize: '48px',
        fontFamily: 'Arial, sans-serif',
        color: '#333333',
        fontStyle: 'bold'
    },
    heading: {
        fontSize: '32px',
        fontFamily: 'Arial, sans-serif',
        color: '#333333',
        fontStyle: 'bold'
    },
    body: {
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#555555'
    },
    small: {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        color: '#666666'
    },
    button: {
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        fontStyle: 'bold'
    }
};

// Уровни игры
const LEVELS = {
    1: { name: 'Калории и энергия', key: 'Level1_Calories', color: COLORS.warning },
    2: { name: 'Белки', key: 'Level2_Proteins', color: COLORS.protein },
    3: { name: 'Углеводы', key: 'Level3_Carbs', color: COLORS.carbs },
    4: { name: 'Жиры', key: 'Level4_Fats', color: COLORS.fats },
    5: { name: 'Витамины и минералы', key: 'Level5_Vitamins', color: COLORS.vitamins },
    6: { name: 'Баланс питания', key: 'Level6_Balance', color: COLORS.success },
    7: { name: 'Потребности разных групп', key: 'Level7_Needs', color: COLORS.info },
    8: { name: 'Пищеварение и метаболизм', key: 'Level8_Digestion', color: COLORS.accent }
};

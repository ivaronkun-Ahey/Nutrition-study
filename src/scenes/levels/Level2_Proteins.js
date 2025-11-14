/**
 * Уровень 2: Белки
 * Использует ту же структуру что Level1
 */
class Level2_Proteins extends Level1_Calories {
    constructor() {
        super();
        this.sys.settings.key = 'Level2_Proteins';
    }

    init(data) {
        this.levelNum = data.levelNum || 2;
        this.currentPhase = 'education';
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xfff0f5).setOrigin(0);

        // Заголовок уровня
        this.titleText = this.add.text(centerX, 40, 'Уровень 2: Белки', {
            fontSize: '42px',
            color: '#E91E63',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Кнопка выхода
        new Button(
            this,
            80,
            40,
            '← Выход',
            () => this.exitLevel(),
            {
                width: 130,
                height: 45,
                backgroundColor: COLORS.dark,
                fontSize: '18px'
            }
        );

        // Прогресс бар
        this.progressBar = new ProgressBar(this, centerX - 150, 90, {
            width: 300,
            height: 20,
            maxValue: 100,
            showPercentage: false,
            fillColor: COLORS.protein
        });

        // Контейнер для контента
        this.contentContainer = this.add.container(0, 0);

        // Начинаем с образовательной части
        this.showEducation();
    }
}

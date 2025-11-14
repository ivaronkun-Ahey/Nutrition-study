/**
 * Уровень 3: Углеводы
 */
class Level3_Carbs extends Level1_Calories {
    constructor() {
        super();
        this.sys.settings.key = 'Level3_Carbs';
    }

    init(data) {
        this.levelNum = data.levelNum || 3;
        this.currentPhase = 'education';
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xfffef0).setOrigin(0);

        // Заголовок уровня
        this.titleText = this.add.text(centerX, 40, 'Уровень 3: Углеводы', {
            fontSize: '42px',
            color: '#FFEB3B',
            fontStyle: 'bold',
            stroke: '#666666',
            strokeThickness: 2
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
            fillColor: COLORS.carbs
        });

        this.contentContainer = this.add.container(0, 0);
        this.showEducation();
    }
}

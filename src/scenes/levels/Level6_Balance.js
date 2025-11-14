/**
 * Уровень 6: Баланс питания
 */
class Level6_Balance extends Level1_Calories {
    constructor() {
        super();
        this.sys.settings.key = 'Level6_Balance';
    }

    init(data) {
        this.levelNum = data.levelNum || 6;
        this.currentPhase = 'education';
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xf0fff4).setOrigin(0);

        // Заголовок уровня
        this.titleText = this.add.text(centerX, 40, 'Уровень 6: Баланс питания', {
            fontSize: '42px',
            color: '#4CAF50',
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
            fillColor: COLORS.success
        });

        this.contentContainer = this.add.container(0, 0);
        this.showEducation();
    }
}

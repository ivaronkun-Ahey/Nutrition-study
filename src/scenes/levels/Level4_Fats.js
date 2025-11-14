/**
 * Уровень 4: Жиры
 */
class Level4_Fats extends Level1_Calories {
    constructor() {
        super();
        this.sys.settings.key = 'Level4_Fats';
    }

    init(data) {
        this.levelNum = data.levelNum || 4;
        this.currentPhase = 'education';
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xfff5ee).setOrigin(0);

        // Заголовок уровня
        this.titleText = this.add.text(centerX, 40, 'Уровень 4: Жиры', {
            fontSize: '42px',
            color: '#FF5722',
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
            fillColor: COLORS.fats
        });

        this.contentContainer = this.add.container(0, 0);
        this.showEducation();
    }
}

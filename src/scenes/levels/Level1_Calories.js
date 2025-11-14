/**
 * Уровень 1: Калории и энергия
 */
class Level1_Calories extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1_Calories' });
    }

    init(data) {
        this.levelNum = data.levelNum || 1;
        this.currentPhase = 'education'; // education, quiz, result
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xfffef0).setOrigin(0);

        // Заголовок уровня
        this.titleText = this.add.text(centerX, 40, 'Уровень 1: Калории и энергия', {
            fontSize: '42px',
            color: '#FF9800',
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
            showPercentage: false
        });

        // Контейнер для контента
        this.contentContainer = this.add.container(0, 0);

        // Начинаем с образовательной части
        this.showEducation();
    }

    showEducation() {
        this.currentPhase = 'education';
        this.contentContainer.removeAll(true);

        const educational = window.DataManager.getEducationalContent(this.levelNum);
        const centerX = this.scale.width / 2;
        let currentY = 150;

        // Заголовок
        const intro = this.add.text(centerX, currentY, educational.introduction, {
            fontSize: '24px',
            color: '#333333',
            align: 'center',
            wordWrap: { width: 1000 }
        }).setOrigin(0.5);

        currentY += 60;

        // Показываем секции
        educational.sections.forEach((section, index) => {
            // Заголовок секции
            const sectionTitle = this.add.text(100, currentY, `📚 ${section.title}`, {
                fontSize: '28px',
                color: '#FF9800',
                fontStyle: 'bold'
            });

            currentY += 40;

            // Контент секции
            const sectionContent = this.add.text(120, currentY, section.content, {
                fontSize: '18px',
                color: '#555555',
                lineSpacing: 8,
                wordWrap: { width: 1000 }
            });

            currentY += sectionContent.height + 20;

            // Источник
            if (section.source) {
                const source = this.add.text(120, currentY, `Источник: ${section.source}`, {
                    fontSize: '14px',
                    color: '#999999',
                    fontStyle: 'italic'
                });
                currentY += 30;
            }

            this.contentContainer.add([sectionTitle, sectionContent]);

            // Анимация появления
            sectionTitle.setAlpha(0);
            sectionContent.setAlpha(0);

            this.tweens.add({
                targets: [sectionTitle, sectionContent],
                alpha: 1,
                duration: 500,
                delay: index * 100
            });
        });

        this.contentContainer.add(intro);

        // Кнопка продолжить
        const continueBtn = new Button(
            this,
            centerX,
            this.scale.height - 80,
            'Начать испытание →',
            () => this.startQuiz(),
            {
                width: 300,
                height: 60,
                backgroundColor: COLORS.success,
                fontSize: '24px'
            }
        );

        this.progressBar.setValue(33);
    }

    startQuiz() {
        this.currentPhase = 'quiz';
        this.contentContainer.removeAll(true);

        this.questions = window.DataManager.getQuestionsForLevel(this.levelNum);
        this.currentQuestionIndex = 0;
        this.totalQuestions = this.questions.length;

        this.progressBar.setValue(66);
        this.showQuestion();
    }

    showQuestion() {
        this.contentContainer.removeAll(true);

        const question = this.questions[this.currentQuestionIndex];
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Номер вопроса
        const questionNum = this.add.text(centerX, 150,
            `Вопрос ${this.currentQuestionIndex + 1} из ${this.totalQuestions}`, {
            fontSize: '24px',
            color: '#666666'
        }).setOrigin(0.5);

        // Текст вопроса
        const questionText = this.add.text(centerX, 220, question.question, {
            fontSize: '32px',
            color: '#333333',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 1000 }
        }).setOrigin(0.5);

        this.contentContainer.add([questionNum, questionText]);

        // Варианты ответов
        const startY = 320;
        const spacing = 80;

        question.answers.forEach((answer, index) => {
            const y = startY + index * spacing;

            const answerBtn = new Button(
                this,
                centerX,
                y,
                answer.text,
                () => this.checkAnswer(answer, question),
                {
                    width: 700,
                    height: 65,
                    backgroundColor: COLORS.primary,
                    fontSize: '22px'
                }
            );

            this.contentContainer.add(answerBtn.container);
        });
    }

    checkAnswer(answer, question) {
        this.contentContainer.removeAll(true);

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const isCorrect = answer.correct;

        if (isCorrect) {
            this.correctAnswers++;
            this.score += 100;
        }

        // Результат ответа
        const resultColor = isCorrect ? COLORS.success : COLORS.danger;
        const resultText = isCorrect ? '✓ Правильно!' : '✗ Неправильно';
        const resultEmoji = isCorrect ? '🎉' : '😞';

        const result = this.add.text(centerX, centerY - 100, `${resultEmoji} ${resultText}`, {
            fontSize: '48px',
            color: resultColor,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Объяснение
        const explanation = this.add.text(centerX, centerY, question.explanation, {
            fontSize: '24px',
            color: '#555555',
            align: 'center',
            wordWrap: { width: 900 }
        }).setOrigin(0.5);

        this.contentContainer.add([result, explanation]);

        // Кнопка продолжить
        const btnText = this.currentQuestionIndex < this.totalQuestions - 1 ?
            'Следующий вопрос →' : 'Завершить уровень';

        const nextBtn = new Button(
            this,
            centerX,
            this.scale.height - 100,
            btnText,
            () => {
                if (this.currentQuestionIndex < this.totalQuestions - 1) {
                    this.currentQuestionIndex++;
                    this.showQuestion();
                } else {
                    this.showResult();
                }
            },
            {
                width: 300,
                height: 60,
                backgroundColor: COLORS.primary,
                fontSize: '24px'
            }
        );

        // Анимация результата
        result.setScale(0);
        this.tweens.add({
            targets: result,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });
    }

    showResult() {
        this.currentPhase = 'result';
        this.contentContainer.removeAll(true);
        this.progressBar.setValue(100);

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        let stars = 0;
        let message = '';

        if (percentage >= 80) {
            stars = 3;
            message = 'Превосходно! Вы отлично разбираетесь в калориях!';
        } else if (percentage >= 60) {
            stars = 2;
            message = 'Хорошо! Но есть куда расти.';
        } else if (percentage >= 40) {
            stars = 1;
            message = 'Неплохо для начала. Повторите материал!';
        } else {
            stars = 0;
            message = 'Стоит повторить уровень. Вы справитесь!';
        }

        // Сохраняем прогресс
        window.ProgressManager.completeLevel(this.levelNum, stars, this.score);

        // Заголовок
        const title = this.add.text(centerX, centerY - 200, 'Уровень завершен!', {
            fontSize: '56px',
            color: '#4CAF50',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Звезды
        const starsText = this.add.text(centerX, centerY - 100, '⭐'.repeat(stars) + '☆'.repeat(3 - stars), {
            fontSize: '72px'
        }).setOrigin(0.5);

        // Статистика
        const stats = this.add.text(centerX, centerY,
            `Правильных ответов: ${this.correctAnswers} из ${this.totalQuestions}\nОчков: ${this.score}`, {
            fontSize: '28px',
            color: '#333333',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Сообщение
        const messageText = this.add.text(centerX, centerY + 100, message, {
            fontSize: '24px',
            color: '#666666',
            align: 'center'
        }).setOrigin(0.5);

        this.contentContainer.add([title, starsText, stats, messageText]);

        // Кнопки
        new Button(
            this,
            centerX - 160,
            this.scale.height - 100,
            'Повторить',
            () => this.scene.restart({ levelNum: this.levelNum }),
            {
                width: 200,
                height: 60,
                backgroundColor: COLORS.warning,
                fontSize: '22px'
            }
        );

        new Button(
            this,
            centerX + 160,
            this.scale.height - 100,
            'Продолжить',
            () => this.scene.start('LevelSelectScene'),
            {
                width: 200,
                height: 60,
                backgroundColor: COLORS.success,
                fontSize: '22px'
            }
        );

        // Анимация звезд
        starsText.setScale(0);
        this.tweens.add({
            targets: starsText,
            scaleX: 1,
            scaleY: 1,
            duration: 600,
            ease: 'Back.easeOut'
        });
    }

    exitLevel() {
        const dialog = new Dialog(this, {
            title: 'Выйти из уровня?',
            message: 'Ваш прогресс не будет сохранен.',
            buttons: [
                {
                    text: 'Отмена',
                    color: COLORS.dark
                },
                {
                    text: 'Выйти',
                    color: COLORS.danger,
                    callback: () => this.scene.start('LevelSelectScene')
                }
            ]
        });
    }
}

/**
 * Трекер питания - дневник питания
 */
class TrackerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TrackerScene' });
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xf0f8ff).setOrigin(0);

        // Заголовок
        this.add.text(centerX, 50, 'Трекер питания', {
            fontSize: '48px',
            fontFamily: 'Arial, sans-serif',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Кнопка назад
        new Button(
            this,
            80,
            50,
            '← Назад',
            () => this.scene.start('MenuScene'),
            {
                width: 140,
                height: 50,
                backgroundColor: COLORS.dark,
                fontSize: '20px'
            }
        );

        // Текущая дата
        this.currentDate = new Date().toISOString().split('T')[0];
        this.createDateSelector();

        // Приемы пищи
        this.mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
        this.createMealSections();

        // Итоги дня
        this.createDailySummary();
    }

    createDateSelector() {
        const centerX = this.scale.width / 2;
        const y = 120;

        // Кнопка предыдущий день
        new Button(
            this,
            centerX - 200,
            y,
            '◄',
            () => this.changeDate(-1),
            {
                width: 50,
                height: 50,
                backgroundColor: COLORS.accent,
                fontSize: '24px'
            }
        );

        // Текущая дата
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = new Date(this.currentDate).toLocaleDateString('ru-RU', dateOptions);

        this.dateText = this.add.text(centerX, y, dateStr, {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Кнопка следующий день
        new Button(
            this,
            centerX + 200,
            y,
            '►',
            () => this.changeDate(1),
            {
                width: 50,
                height: 50,
                backgroundColor: COLORS.accent,
                fontSize: '24px'
            }
        );

        // Кнопка "Сегодня"
        new Button(
            this,
            centerX + 300,
            y,
            'Сегодня',
            () => {
                this.currentDate = new Date().toISOString().split('T')[0];
                this.updateDisplay();
            },
            {
                width: 120,
                height: 50,
                backgroundColor: COLORS.success,
                fontSize: '18px'
            }
        );
    }

    changeDate(days) {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + days);
        this.currentDate = date.toISOString().split('T')[0];
        this.updateDisplay();
    }

    updateDisplay() {
        // Обновляем отображение даты
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = new Date(this.currentDate).toLocaleDateString('ru-RU', dateOptions);
        this.dateText.setText(dateStr);

        // Обновляем приемы пищи
        // TODO: загрузить данные за выбранную дату
    }

    createMealSections() {
        const meals = [
            { type: 'breakfast', name: 'Завтрак', color: COLORS.warning, y: 200 },
            { type: 'lunch', name: 'Обед', color: COLORS.success, y: 300 },
            { type: 'dinner', name: 'Ужин', color: COLORS.info, y: 400 },
            { type: 'snacks', name: 'Перекусы', color: COLORS.accent, y: 500 }
        ];

        meals.forEach(meal => {
            this.createMealSection(meal);
        });
    }

    createMealSection(meal) {
        const x = 50;
        const width = this.scale.width - 100;

        // Фон секции
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(x, meal.y, width, 80, 10);
        bg.lineStyle(2, meal.color, 1);
        bg.strokeRoundedRect(x, meal.y, width, 80, 10);

        // Иконка приема пищи
        const icon = this.add.circle(x + 40, meal.y + 40, 20, meal.color);

        // Название приема пищи
        const name = this.add.text(x + 80, meal.y + 20, meal.name, {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        });

        // Калории
        const calories = this.add.text(x + 80, meal.y + 50, '0 ккал', {
            fontSize: '18px',
            color: '#666666'
        });

        // Кнопка добавить продукт
        new Button(
            this,
            x + width - 120,
            meal.y + 40,
            '+ Добавить',
            () => this.showFoodSelector(meal.type),
            {
                width: 150,
                height: 50,
                backgroundColor: meal.color,
                fontSize: '18px'
            }
        );
    }

    showFoodSelector(mealType) {
        const categories = Object.keys(window.FOOD_CATEGORIES);

        let message = 'Выберите категорию продукта:\n\n';

        // Создаем упрощенный селектор (в реальной версии это будет интерактивное меню)
        const dialog = new Dialog(this, {
            title: 'Добавить продукт',
            message: 'Функция добавления продуктов будет доступна в полной версии.\n\nВы сможете:\n• Выбирать продукты из базы\n• Указывать порции\n• Автоматически подсчитывать калории и БЖУ\n• Отслеживать прогресс по дням',
            width: 600,
            height: 400,
            buttons: [
                {
                    text: 'Понятно',
                    color: COLORS.primary
                }
            ]
        });
    }

    createDailySummary() {
        const x = this.scale.width - 350;
        const y = 200;
        const width = 300;

        // Фон панели итогов
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 0.95);
        bg.fillRoundedRect(x, y, width, 380, 15);
        bg.lineStyle(3, COLORS.primary, 1);
        bg.strokeRoundedRect(x, y, width, 380, 15);

        // Заголовок
        this.add.text(x + width / 2, y + 25, 'Итоги дня', {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Калории
        this.add.text(x + 20, y + 70, 'Калории:', {
            fontSize: '20px',
            color: '#333333',
            fontStyle: 'bold'
        });

        const caloriesBar = new ProgressBar(this, x + 20, y + 100, {
            width: width - 40,
            height: 30,
            maxValue: 2000,
            fillColor: COLORS.warning
        });
        caloriesBar.setValue(0);

        // Белки
        this.add.text(x + 20, y + 150, 'Белки:', {
            fontSize: '18px',
            color: '#333333'
        });

        const proteinBar = new ProgressBar(this, x + 20, y + 175, {
            width: width - 40,
            height: 25,
            maxValue: 56,
            fillColor: COLORS.protein
        });
        proteinBar.setValue(0);

        // Углеводы
        this.add.text(x + 20, y + 220, 'Углеводы:', {
            fontSize: '18px',
            color: '#333333'
        });

        const carbsBar = new ProgressBar(this, x + 20, y + 245, {
            width: width - 40,
            height: 25,
            maxValue: 250,
            fillColor: COLORS.carbs
        });
        carbsBar.setValue(0);

        // Жиры
        this.add.text(x + 20, y + 290, 'Жиры:', {
            fontSize: '18px',
            color: '#333333'
        });

        const fatsBar = new ProgressBar(this, x + 20, y + 315, {
            width: width - 40,
            height: 25,
            maxValue: 67,
            fillColor: COLORS.fats
        });
        fatsBar.setValue(0);
    }
}

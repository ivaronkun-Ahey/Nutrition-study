/**
 * Интерактивный справочник по питанию
 */
class ReferenceScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ReferenceScene' });
    }

    create() {
        const centerX = this.scale.width / 2;

        // Фон
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xf0f8ff).setOrigin(0);

        // Заголовок
        this.add.text(centerX, 50, 'Справочник по питанию', {
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

        // Вкладки
        this.currentTab = 'nutrients';
        this.createTabs();

        // Область контента
        this.contentArea = this.add.container(0, 180);
        this.updateContent();
    }

    createTabs() {
        const tabs = [
            { key: 'nutrients', label: 'Нутриенты', color: COLORS.primary },
            { key: 'foods', label: 'Продукты', color: COLORS.warning },
            { key: 'recommendations', label: 'Рекомендации', color: COLORS.info }
        ];

        const tabWidth = 200;
        const startX = (this.scale.width - (tabs.length * tabWidth + (tabs.length - 1) * 20)) / 2;
        const tabY = 120;

        tabs.forEach((tab, index) => {
            const x = startX + index * (tabWidth + 20);
            const isActive = this.currentTab === tab.key;

            const button = new Button(
                this,
                x,
                tabY,
                tab.label,
                () => {
                    this.currentTab = tab.key;
                    this.updateContent();
                },
                {
                    width: tabWidth,
                    height: 50,
                    backgroundColor: isActive ? tab.color : 0xcccccc,
                    fontSize: '20px'
                }
            );
        });
    }

    updateContent() {
        // Очищаем предыдущий контент
        this.contentArea.removeAll(true);

        switch (this.currentTab) {
            case 'nutrients':
                this.showNutrients();
                break;
            case 'foods':
                this.showFoods();
                break;
            case 'recommendations':
                this.showRecommendations();
                break;
        }
    }

    showNutrients() {
        const nutrients = Object.values(window.NUTRIENTS_DATA);
        const startY = 0;
        const cardHeight = 100;
        const cardSpacing = 110;

        // Создаем прокручиваемый список
        nutrients.forEach((nutrient, index) => {
            const y = startY + index * cardSpacing;
            this.createNutrientCard(nutrient, 50, y);
        });
    }

    createNutrientCard(nutrient, x, y) {
        const width = this.scale.width - 100;
        const height = 90;

        // Фон карточки
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(x, y, width, height, 10);
        bg.lineStyle(3, nutrient.color || COLORS.primary, 1);
        bg.strokeRoundedRect(x, y, width, height, 10);

        // Цветной индикатор
        const indicator = this.add.circle(x + 30, y + height / 2, 15, nutrient.color || COLORS.primary);

        // Название
        const name = this.add.text(x + 60, y + 15, nutrient.name, {
            fontSize: '28px',
            color: '#333333',
            fontStyle: 'bold'
        });

        // Описание
        const description = this.add.text(x + 60, y + 50, nutrient.description, {
            fontSize: '16px',
            color: '#666666',
            wordWrap: { width: width - 300 }
        });

        // Кнопка "Подробнее"
        const detailBtn = new Button(
            this,
            x + width - 100,
            y + height / 2,
            'Подробнее',
            () => this.showNutrientDetails(nutrient),
            {
                width: 150,
                height: 40,
                fontSize: '16px',
                backgroundColor: COLORS.accent
            }
        );

        this.contentArea.add([bg, indicator, name, description, detailBtn.container]);
    }

    showNutrientDetails(nutrient) {
        let message = `${nutrient.description}\n\n`;

        if (nutrient.functions) {
            message += `Функции:\n`;
            nutrient.functions.forEach(func => {
                message += `• ${func}\n`;
            });
            message += '\n';
        }

        if (nutrient.sources) {
            message += `Источники:\n`;
            nutrient.sources.forEach(source => {
                message += `• ${source}\n`;
            });
            message += '\n';
        }

        if (nutrient.dailyNeed) {
            message += `Суточная потребность:\n`;
            if (typeof nutrient.dailyNeed === 'object') {
                Object.entries(nutrient.dailyNeed).forEach(([key, value]) => {
                    message += `• ${key}: ${value}\n`;
                });
            } else {
                message += `• ${nutrient.dailyNeed}\n`;
            }
        }

        if (nutrient.references) {
            message += `\nИсточник: ${nutrient.references}`;
        }

        new Dialog(this, {
            title: nutrient.name,
            message: message,
            width: 700,
            height: 500,
            buttons: [{ text: 'Закрыть', color: COLORS.primary }]
        });
    }

    showFoods() {
        const categories = Object.keys(window.FOOD_CATEGORIES);
        const startY = 0;

        categories.forEach((categoryKey, index) => {
            const y = startY + index * 60;
            const category = window.FOOD_CATEGORIES[categoryKey];

            const btn = new Button(
                this,
                this.scale.width / 2,
                y,
                category.name,
                () => this.showCategoryFoods(categoryKey, category),
                {
                    width: 400,
                    height: 50,
                    backgroundColor: category.color,
                    fontSize: '22px'
                }
            );

            this.contentArea.add(btn.container);
        });
    }

    showCategoryFoods(categoryKey, category) {
        const foods = window.DataManager.getFoodsByCategory(categoryKey);

        let message = `Продукты категории "${category.name}":\n\n`;

        foods.forEach(food => {
            message += `🍽️ ${food.name}\n`;
            message += `   ${food.calories} ккал | Б: ${food.protein}г У: ${food.carbs}г Ж: ${food.fats}г\n\n`;
        });

        new Dialog(this, {
            title: category.name,
            message: message,
            width: 700,
            height: 500,
            buttons: [{ text: 'Закрыть', color: category.color }]
        });
    }

    showRecommendations() {
        const recommendations = [
            {
                title: 'ВОЗ: Здоровое питание',
                points: [
                    'Ешьте минимум 400г (5 порций) овощей и фруктов в день',
                    'Ограничьте свободные сахара до <10% калорий',
                    'Ограничьте соль до <5г в день',
                    'Жиры <30% калорий, насыщенные <10%, транс-жиры <1%',
                    'Замените насыщенные жиры ненасыщенными'
                ],
                source: 'WHO Healthy Diet Factsheet'
            },
            {
                title: 'Суточные нормы калорий',
                points: [
                    'Женщины: 1600-2400 ккал/день',
                    'Мужчины: 2000-3000 ккал/день',
                    'Зависит от возраста, веса и уровня активности',
                    'Дети: относительно больше на кг массы тела'
                ],
                source: 'CDC, Atlantic Health'
            },
            {
                title: 'Баланс макронутриентов',
                points: [
                    'Углеводы: 45-65% калорий (предпочтительно сложные)',
                    'Белки: 10-35% калорий (~0.8-1.0г/кг веса)',
                    'Жиры: 20-35% калорий (преимущественно ненасыщенные)',
                    'Клетчатка: 25-30г в день'
                ],
                source: 'NIH Dietary Guidelines'
            }
        ];

        const startY = 0;
        recommendations.forEach((rec, index) => {
            const y = startY + index * 200;
            this.createRecommendationCard(rec, 50, y);
        });
    }

    createRecommendationCard(rec, x, y) {
        const width = this.scale.width - 100;

        // Заголовок
        const title = this.add.text(x, y, rec.title, {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        });

        // Пункты
        let pointsText = '';
        rec.points.forEach(point => {
            pointsText += `✓ ${point}\n`;
        });

        const points = this.add.text(x + 20, y + 35, pointsText, {
            fontSize: '18px',
            color: '#555555',
            lineSpacing: 8,
            wordWrap: { width: width - 40 }
        });

        // Источник
        const source = this.add.text(x, y + 35 + points.height + 10, `Источник: ${rec.source}`, {
            fontSize: '14px',
            color: '#999999',
            fontStyle: 'italic'
        });

        this.contentArea.add([title, points, source]);
    }
}

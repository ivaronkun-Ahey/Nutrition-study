/**
 * Менеджер данных - управление всеми игровыми данными
 */
class DataManager {
    constructor() {
        this.foods = window.FOODS_DATA || {};
        this.nutrients = window.NUTRIENTS_DATA || {};
        this.questions = window.QUESTIONS_DATA || {};
        this.educational = window.EDUCATIONAL_DATA || {};
    }

    /**
     * Получить данные о продукте
     */
    getFood(foodId) {
        return this.foods[foodId];
    }

    /**
     * Получить все продукты по категории
     */
    getFoodsByCategory(category) {
        return Object.values(this.foods).filter(food => food.category === category);
    }

    /**
     * Получить данные о нутриенте
     */
    getNutrient(nutrientId) {
        return this.nutrients[nutrientId];
    }

    /**
     * Получить вопросы для уровня
     */
    getQuestionsForLevel(levelId) {
        return this.questions[levelId] || [];
    }

    /**
     * Получить образовательный контент для уровня
     */
    getEducationalContent(levelId) {
        return this.educational[levelId] || {};
    }

    /**
     * Рассчитать калории из БЖУ
     */
    calculateCalories(protein, carbs, fats) {
        return (protein * 4) + (carbs * 4) + (fats * 9);
    }

    /**
     * Рассчитать рекомендуемую калорийность
     */
    calculateDailyCalories(gender, age, weight, height, activityLevel) {
        // Используем уравнение Миффлина-Сан Жеора
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Коэффициенты активности
        const activityMultipliers = {
            sedentary: 1.2,      // Малоподвижный
            light: 1.375,        // Легкая активность
            moderate: 1.55,      // Умеренная активность
            active: 1.725,       // Высокая активность
            veryActive: 1.9      // Очень высокая активность
        };

        return Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
    }

    /**
     * Получить рекомендации по БЖУ
     */
    getMacroRecommendations(totalCalories) {
        return {
            protein: {
                grams: Math.round(totalCalories * 0.30 / 4),
                calories: Math.round(totalCalories * 0.30),
                percentage: 30
            },
            carbs: {
                grams: Math.round(totalCalories * 0.50 / 4),
                calories: Math.round(totalCalories * 0.50),
                percentage: 50
            },
            fats: {
                grams: Math.round(totalCalories * 0.20 / 9),
                calories: Math.round(totalCalories * 0.20),
                percentage: 20
            }
        };
    }

    /**
     * Оценить баланс питания
     */
    evaluateMealBalance(foods) {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;
        const categories = new Set();

        foods.forEach(foodId => {
            const food = this.getFood(foodId);
            if (food) {
                totalCalories += food.calories;
                totalProtein += food.protein;
                totalCarbs += food.carbs;
                totalFats += food.fats;
                categories.add(food.category);
            }
        });

        const proteinPercent = (totalProtein * 4 / totalCalories * 100) || 0;
        const carbsPercent = (totalCarbs * 4 / totalCalories * 100) || 0;
        const fatsPercent = (totalFats * 9 / totalCalories * 100) || 0;

        // Оценка баланса
        let score = 100;
        let feedback = [];

        // Проверка БЖУ баланса
        if (proteinPercent < 20 || proteinPercent > 40) {
            score -= 15;
            feedback.push(proteinPercent < 20 ? 'Недостаточно белка' : 'Слишком много белка');
        }
        if (carbsPercent < 40 || carbsPercent > 60) {
            score -= 15;
            feedback.push(carbsPercent < 40 ? 'Недостаточно углеводов' : 'Слишком много углеводов');
        }
        if (fatsPercent < 15 || fatsPercent > 35) {
            score -= 15;
            feedback.push(fatsPercent < 15 ? 'Недостаточно жиров' : 'Слишком много жиров');
        }

        // Проверка разнообразия (должно быть минимум 3 категории)
        if (categories.size < 3) {
            score -= 20;
            feedback.push('Недостаточное разнообразие продуктов');
        }

        return {
            score: Math.max(0, score),
            totalCalories,
            macros: {
                protein: { grams: totalProtein, percent: proteinPercent },
                carbs: { grams: totalCarbs, percent: carbsPercent },
                fats: { grams: totalFats, percent: fatsPercent }
            },
            categories: Array.from(categories),
            feedback,
            rating: score >= 80 ? 'Отлично!' : score >= 60 ? 'Хорошо' : score >= 40 ? 'Удовлетворительно' : 'Нужно улучшить'
        };
    }
}

// Создаем глобальный экземпляр
window.DataManager = new DataManager();

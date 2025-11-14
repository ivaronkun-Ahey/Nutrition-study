/**
 * База данных продуктов питания
 * Значения приведены на 100г продукта
 * Источники: USDA FoodData Central, nutritional databases
 */

window.FOODS_DATA = {
    // === БЕЛКОВЫЕ ПРОДУКТЫ ===
    chicken_breast: {
        id: 'chicken_breast',
        name: 'Куриная грудка',
        category: 'protein',
        calories: 165,
        protein: 31,
        carbs: 0,
        fats: 3.6,
        fiber: 0,
        vitamins: ['B6', 'B12'],
        minerals: ['selenium', 'phosphorus']
    },

    salmon: {
        id: 'salmon',
        name: 'Лосось',
        category: 'protein',
        calories: 208,
        protein: 20,
        carbs: 0,
        fats: 13,
        fiber: 0,
        vitamins: ['D', 'B12'],
        minerals: ['selenium'],
        special: 'Омега-3 жирные кислоты'
    },

    eggs: {
        id: 'eggs',
        name: 'Яйца',
        category: 'protein',
        calories: 155,
        protein: 13,
        carbs: 1.1,
        fats: 11,
        fiber: 0,
        vitamins: ['A', 'D', 'B12'],
        minerals: ['selenium', 'iron']
    },

    beef: {
        id: 'beef',
        name: 'Говядина',
        category: 'protein',
        calories: 250,
        protein: 26,
        carbs: 0,
        fats: 15,
        fiber: 0,
        vitamins: ['B12', 'B6'],
        minerals: ['iron', 'zinc']
    },

    tofu: {
        id: 'tofu',
        name: 'Тофу',
        category: 'protein',
        calories: 76,
        protein: 8,
        carbs: 1.9,
        fats: 4.8,
        fiber: 0.3,
        minerals: ['calcium', 'iron'],
        special: 'Растительный белок'
    },

    lentils: {
        id: 'lentils',
        name: 'Чечевица',
        category: 'protein',
        calories: 116,
        protein: 9,
        carbs: 20,
        fats: 0.4,
        fiber: 8,
        vitamins: ['B9'],
        minerals: ['iron', 'potassium']
    },

    // === МОЛОЧНЫЕ ПРОДУКТЫ ===
    milk: {
        id: 'milk',
        name: 'Молоко',
        category: 'dairy',
        calories: 61,
        protein: 3.2,
        carbs: 4.8,
        fats: 3.3,
        fiber: 0,
        vitamins: ['D', 'B12'],
        minerals: ['calcium', 'phosphorus']
    },

    yogurt: {
        id: 'yogurt',
        name: 'Йогурт',
        category: 'dairy',
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fats: 0.4,
        fiber: 0,
        vitamins: ['B12'],
        minerals: ['calcium'],
        special: 'Пробиотики'
    },

    cheese: {
        id: 'cheese',
        name: 'Сыр',
        category: 'dairy',
        calories: 402,
        protein: 25,
        carbs: 1.3,
        fats: 33,
        fiber: 0,
        vitamins: ['A', 'B12'],
        minerals: ['calcium', 'phosphorus']
    },

    // === ЗЛАКИ И ЗЕРНОВЫЕ ===
    oatmeal: {
        id: 'oatmeal',
        name: 'Овсянка',
        category: 'grains',
        calories: 389,
        protein: 17,
        carbs: 66,
        fats: 7,
        fiber: 11,
        vitamins: ['B1', 'B5'],
        minerals: ['iron', 'magnesium']
    },

    brown_rice: {
        id: 'brown_rice',
        name: 'Бурый рис',
        category: 'grains',
        calories: 370,
        protein: 7.9,
        carbs: 77,
        fats: 2.9,
        fiber: 3.5,
        vitamins: ['B6'],
        minerals: ['magnesium', 'phosphorus']
    },

    whole_wheat_bread: {
        id: 'whole_wheat_bread',
        name: 'Цельнозерновой хлеб',
        category: 'grains',
        calories: 247,
        protein: 13,
        carbs: 41,
        fats: 3.4,
        fiber: 7,
        vitamins: ['B1', 'B3'],
        minerals: ['iron', 'magnesium']
    },

    white_bread: {
        id: 'white_bread',
        name: 'Белый хлеб',
        category: 'grains',
        calories: 265,
        protein: 9,
        carbs: 49,
        fats: 3.2,
        fiber: 2.7,
        vitamins: ['B1'],
        minerals: ['iron'],
        warning: 'Меньше питательных веществ'
    },

    pasta: {
        id: 'pasta',
        name: 'Макароны',
        category: 'grains',
        calories: 371,
        protein: 13,
        carbs: 75,
        fats: 1.5,
        fiber: 3.2,
        vitamins: ['B1', 'B3'],
        minerals: ['iron']
    },

    // === ФРУКТЫ ===
    apple: {
        id: 'apple',
        name: 'Яблоко',
        category: 'fruits',
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fats: 0.2,
        fiber: 2.4,
        vitamins: ['C'],
        minerals: ['potassium']
    },

    banana: {
        id: 'banana',
        name: 'Банан',
        category: 'fruits',
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fats: 0.3,
        fiber: 2.6,
        vitamins: ['B6', 'C'],
        minerals: ['potassium', 'magnesium']
    },

    orange: {
        id: 'orange',
        name: 'Апельсин',
        category: 'fruits',
        calories: 47,
        protein: 0.9,
        carbs: 12,
        fats: 0.1,
        fiber: 2.4,
        vitamins: ['C'],
        minerals: ['potassium']
    },

    strawberry: {
        id: 'strawberry',
        name: 'Клубника',
        category: 'fruits',
        calories: 32,
        protein: 0.7,
        carbs: 7.7,
        fats: 0.3,
        fiber: 2,
        vitamins: ['C'],
        minerals: ['manganese']
    },

    avocado: {
        id: 'avocado',
        name: 'Авокадо',
        category: 'fruits',
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fats: 15,
        fiber: 6.7,
        vitamins: ['K', 'C', 'E'],
        minerals: ['potassium'],
        special: 'Полезные жиры'
    },

    // === ОВОЩИ ===
    broccoli: {
        id: 'broccoli',
        name: 'Брокколи',
        category: 'vegetables',
        calories: 34,
        protein: 2.8,
        carbs: 7,
        fats: 0.4,
        fiber: 2.6,
        vitamins: ['C', 'K'],
        minerals: ['calcium', 'iron']
    },

    carrot: {
        id: 'carrot',
        name: 'Морковь',
        category: 'vegetables',
        calories: 41,
        protein: 0.9,
        carbs: 10,
        fats: 0.2,
        fiber: 2.8,
        vitamins: ['A'],
        minerals: ['potassium']
    },

    spinach: {
        id: 'spinach',
        name: 'Шпинат',
        category: 'vegetables',
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fats: 0.4,
        fiber: 2.2,
        vitamins: ['A', 'C', 'K'],
        minerals: ['iron', 'calcium']
    },

    tomato: {
        id: 'tomato',
        name: 'Помидор',
        category: 'vegetables',
        calories: 18,
        protein: 0.9,
        carbs: 3.9,
        fats: 0.2,
        fiber: 1.2,
        vitamins: ['C', 'K'],
        minerals: ['potassium']
    },

    sweet_potato: {
        id: 'sweet_potato',
        name: 'Батат',
        category: 'vegetables',
        calories: 86,
        protein: 1.6,
        carbs: 20,
        fats: 0.1,
        fiber: 3,
        vitamins: ['A', 'C'],
        minerals: ['potassium', 'manganese']
    },

    // === ОРЕХИ И СЕМЕНА ===
    almonds: {
        id: 'almonds',
        name: 'Миндаль',
        category: 'nuts',
        calories: 579,
        protein: 21,
        carbs: 22,
        fats: 50,
        fiber: 12.5,
        vitamins: ['E'],
        minerals: ['magnesium', 'calcium'],
        special: 'Полезные жиры'
    },

    walnuts: {
        id: 'walnuts',
        name: 'Грецкие орехи',
        category: 'nuts',
        calories: 654,
        protein: 15,
        carbs: 14,
        fats: 65,
        fiber: 6.7,
        vitamins: ['B6'],
        minerals: ['magnesium'],
        special: 'Омега-3'
    },

    // === НЕЗДОРОВЫЕ ПРОДУКТЫ (для обучения) ===
    soda: {
        id: 'soda',
        name: 'Газировка',
        category: 'junk',
        calories: 41,
        protein: 0,
        carbs: 10.6,
        fats: 0,
        fiber: 0,
        vitamins: [],
        minerals: [],
        warning: 'Пустые калории, избыток сахара'
    },

    chips: {
        id: 'chips',
        name: 'Чипсы',
        category: 'junk',
        calories: 536,
        protein: 6.6,
        carbs: 53,
        fats: 35,
        fiber: 4.8,
        vitamins: [],
        minerals: ['sodium'],
        warning: 'Много соли и вредных жиров'
    },

    candy: {
        id: 'candy',
        name: 'Конфеты',
        category: 'junk',
        calories: 394,
        protein: 0,
        carbs: 98,
        fats: 0.2,
        fiber: 0,
        vitamins: [],
        minerals: [],
        warning: 'Простые углеводы, избыток сахара'
    },

    burger: {
        id: 'burger',
        name: 'Бургер',
        category: 'junk',
        calories: 295,
        protein: 17,
        carbs: 24,
        fats: 14,
        fiber: 1.5,
        vitamins: [],
        minerals: ['sodium'],
        warning: 'Много калорий, насыщенных жиров и соли'
    }
};

// Категории продуктов для удобной фильтрации
window.FOOD_CATEGORIES = {
    protein: { name: 'Белковые продукты', color: COLORS.protein },
    dairy: { name: 'Молочные продукты', color: COLORS.info },
    grains: { name: 'Злаки и зерновые', color: COLORS.carbs },
    fruits: { name: 'Фрукты', color: COLORS.warning },
    vegetables: { name: 'Овощи', color: COLORS.success },
    nuts: { name: 'Орехи и семена', color: COLORS.fats },
    junk: { name: 'Нездоровая пища', color: COLORS.danger }
};

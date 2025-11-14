/**
 * Менеджер прогресса - сохранение и загрузка прогресса игрока
 */
class ProgressManager {
    constructor() {
        this.storageKey = 'nutritionQuestProgress';
        this.progress = this.loadProgress();
    }

    /**
     * Загрузить прогресс из localStorage
     */
    loadProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Ошибка загрузки прогресса:', error);
        }

        // Начальный прогресс
        return {
            currentLevel: 1,
            completedLevels: [],
            levelStars: {}, // Звезды за каждый уровень (1-3)
            totalScore: 0,
            achievements: [],
            playerProfile: {
                name: '',
                age: null,
                gender: null,
                weight: null,
                height: null,
                activityLevel: 'moderate'
            },
            statistics: {
                totalPlayTime: 0,
                questionsAnswered: 0,
                correctAnswers: 0,
                mealsCreated: 0,
                lastPlayed: Date.now()
            },
            trackerData: {
                dailyLogs: {} // Данные трекера питания по датам
            }
        };
    }

    /**
     * Сохранить прогресс в localStorage
     */
    saveProgress() {
        try {
            this.progress.statistics.lastPlayed = Date.now();
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
            return true;
        } catch (error) {
            console.error('Ошибка сохранения прогресса:', error);
            return false;
        }
    }

    /**
     * Получить текущий прогресс
     */
    getProgress() {
        return this.progress;
    }

    /**
     * Завершить уровень
     */
    completeLevel(levelNumber, stars = 1, score = 0) {
        if (!this.progress.completedLevels.includes(levelNumber)) {
            this.progress.completedLevels.push(levelNumber);
        }

        // Обновить звезды (сохраняем лучший результат)
        const currentStars = this.progress.levelStars[levelNumber] || 0;
        this.progress.levelStars[levelNumber] = Math.max(currentStars, stars);

        // Обновить общий счет
        this.progress.totalScore += score;

        // Открыть следующий уровень
        if (levelNumber === this.progress.currentLevel) {
            this.progress.currentLevel = Math.min(levelNumber + 1, 8);
        }

        this.saveProgress();
    }

    /**
     * Проверить, открыт ли уровень
     */
    isLevelUnlocked(levelNumber) {
        return levelNumber <= this.progress.currentLevel;
    }

    /**
     * Проверить, пройден ли уровень
     */
    isLevelCompleted(levelNumber) {
        return this.progress.completedLevels.includes(levelNumber);
    }

    /**
     * Получить звезды уровня
     */
    getLevelStars(levelNumber) {
        return this.progress.levelStars[levelNumber] || 0;
    }

    /**
     * Добавить достижение
     */
    addAchievement(achievementId) {
        if (!this.progress.achievements.includes(achievementId)) {
            this.progress.achievements.push(achievementId);
            this.saveProgress();
            return true;
        }
        return false;
    }

    /**
     * Обновить профиль игрока
     */
    updateProfile(profileData) {
        this.progress.playerProfile = {
            ...this.progress.playerProfile,
            ...profileData
        };
        this.saveProgress();
    }

    /**
     * Обновить статистику
     */
    updateStatistics(stats) {
        this.progress.statistics = {
            ...this.progress.statistics,
            ...stats
        };
        this.saveProgress();
    }

    /**
     * Добавить запись в трекер питания
     */
    addFoodLog(date, mealType, foods) {
        if (!this.progress.trackerData.dailyLogs[date]) {
            this.progress.trackerData.dailyLogs[date] = {};
        }
        this.progress.trackerData.dailyLogs[date][mealType] = foods;
        this.progress.statistics.mealsCreated++;
        this.saveProgress();
    }

    /**
     * Получить записи трекера за дату
     */
    getFoodLog(date) {
        return this.progress.trackerData.dailyLogs[date] || {};
    }

    /**
     * Сбросить прогресс (для отладки или начала заново)
     */
    resetProgress() {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
            localStorage.removeItem(this.storageKey);
            this.progress = this.loadProgress();
            return true;
        }
        return false;
    }

    /**
     * Экспорт прогресса (для резервной копии)
     */
    exportProgress() {
        const dataStr = JSON.stringify(this.progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'nutrition-quest-progress.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Импорт прогресса (из резервной копии)
     */
    importProgress(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.progress = imported;
            this.saveProgress();
            return true;
        } catch (error) {
            console.error('Ошибка импорта прогресса:', error);
            return false;
        }
    }

    /**
     * Получить процент завершения игры
     */
    getCompletionPercentage() {
        const totalLevels = 8;
        return Math.round((this.progress.completedLevels.length / totalLevels) * 100);
    }

    /**
     * Получить общее количество звезд
     */
    getTotalStars() {
        return Object.values(this.progress.levelStars).reduce((sum, stars) => sum + stars, 0);
    }
}

// Создаем глобальный экземпляр
window.ProgressManager = new ProgressManager();

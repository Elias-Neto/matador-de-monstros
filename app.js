new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife === 0 || this.monsterLife === 0
        }
    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        attack(especial) {
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            if (this.monsterLife > 0) {
                this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            }
        },
        heal(min, max) {
            const healValue = this.getRandomNumber(min, max)
            this.playerLife = Math.min(this.playerLife + healValue, 100)
            this.registerLog(`Jogador ganhou ${healValue} de vida`, 'player')
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandomNumber(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        getRandomNumber(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})
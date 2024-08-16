const app = Vue.createApp({
    data() {
        return {
            getRandomFact: '',
            city: 'London',
            temperature: '',
            wind: '',
            description: '', 
            word: '',
            phonetic: '',
            partOfSpeech: '',
            definition: ''
        };
    },

    methods: {
        //method to fetch random fact from link
        fetchRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.getRandomFact = data.text;
                });
        },
        //method to fetch data from weather link
        fetchWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => {
                    this.temperature = data.temperature;
                    this.wind = data.wind;
                    this.description = data.description;
                });
        },
        //method to fetch data from dictionary
        fetchDictionary() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
              .then(response => response.json())
              .then(data => {
                const words = data[0];
                this.word = words.word;
                this.phonetic = words.phonetic;
                this.partOfSpeech = words.meanings[0].partOfSpeech;
                this.definition = words.meanings[0].definitions[0].definition;
              
              });
          }
    },
    mounted() {
        this.fetchRandomFact() ;
        this.fetchWeather() ;
        this.fetchDictionary();
    }
});
app.mount('#app');

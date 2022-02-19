const API_URL = `http://184.153.71.210:8080/search`

Vue.createApp({
    data: () => ({
        query: 'Python',
        min_rating: 4.5,
        min_review_count: 20,
        min_date: "2021-01-01",
        courses: null,
        show_loader: false
    }),
    created() {
        // set max date
        console.log(this.$refs)
    },
    methods: {
        async fetchData(params) {
            const url = new URL(API_URL)
            url.search = new URLSearchParams(params).toString()
            console.log(url)
            const response = await (await fetch(url)).json()
            this.courses = response['data']
            this.show_loader = false
        },
        search() {
            this.show_loader = true
            this.courses = null
            if (this.query) {
                console.log(`Searching for courses on ${this.query}`)
                params = {
                    'search_query': this.query,
                    'min_rating': this.min_rating,
                    'min_review_count': this.min_review_count,
                    'min_date': this.min_date
                }
                this.fetchData(params)
            }

        }
    }
}).mount('#app')